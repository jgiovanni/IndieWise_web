export class MessagesController {
    static $inject = ['$rootScope', '$scope', 'Conversations', 'DataService', '$window', '$modal', 'UserActions', '$timeout', '$q', '_'];
    constructor($rootScope, $scope, Conversations, DataService, $window, $modal, UserActions, $filter, $q, _) {
        $rootScope.metadata.title = 'Messages';
        let self = this;
        self.selectedConvo = null;
        self.newConvo = null;
        self.conversations = Conversations.data.conversations;
        self.newMode = false;
        self.newConversation = newConversation;
        self.fetchConvos = fetchConvos;
        self.querySearch = querySearch;
        self.leaveConvo = leaveConvo;
        self.doSendOnEnter = doSendOnEnter;
        self.postReply = postReply;
        self.selectConvo = selectConvo;
        self.getParticipantById = getParticipantById;
        self.myReply = null;
        self.sendOnEnter = $window.localStorage.sendOnEnter ? JSON.parse($window.localStorage.sendOnEnter) : true;
        self.inboxConvos = {};
        self.convoMessages = {};
        self.selectedConvoLoaded = false;
        self.viewportHeight = {height: 500 + 'px'};

        function selectConvo(convo) {
            self.newMode = false;
            self.selectedConvoLoaded = false;
            self.selectedConvo = convo;
            self.currentParticipants = convo.participants;
            DataService.item('messages', convo.id).then(function (msgs) {
                // console.log('Messages: ', msgs.data);
                self.messages = msgs.data.conversation.messages;

                self.convoMessages = {
                    first: 1,
                    data: [],
                    meta: {
                        pagination: {
                            current_page: 1
                        }
                    },
                    get: function (index, count, success) {
                        console.log('index = ' + index + '; count = ' + count);
                        let start = index;
                        let end = Math.min(index + count - 1, this.first);
                        if (this.meta.pagination.total_pages >= this.meta.pagination.current_page) {
                            this.meta.pagination.current_page++;
                        }
                        DataService.collection('messages/' + self.selectedConvo.id + '/messages', {
                            per_page: count,
                            page: this.meta.pagination.current_page
                        })
                            .then((response) => {
                                self.convoMessages.data = _.union(self.convoMessages.data, response.body.data);
                                angular.extend(self.convoMessages.meta, response.body.meta);
                            })
                            .then(() => {
                                console.log(self.convoMessages);
                                // reverse logic
                                let result = [];
                                if (start <= end) {
                                    for (let i = start; i <= end; i++) {
                                        let serverDataIndex = /*(self.convoMessages.meta.pagination.current_page > 1) ? 0 :*/ (-1) * i + self.convoMessages.first;
                                        let item = self.convoMessages.data[serverDataIndex];
                                        if (item) {
                                            result.push(item);
                                        }
                                    }
                                }

                                success(result);
                            });
                    }
                };
                self.selectedConvoLoaded = true;
            });
        }

        function doSendOnEnter() {
            if (self.sendOnEnter && self.myReply) {
                self.newMode ? self.postNewMsg() : self.postReply();
            }
        }

        function postReply() {
            if (self.myReply) {
                if (self.newMode) {
                    return self.postNewMsg();
                }

                UserActions.checkAuth().then(function (res) {
                    if (res) {
                        let reply = self.myReply;
                        self.myReply = null;
                        DataService.update('messages', self.selectedConvo.id, {message: reply})
                            .then((result) => {
                                // self.adapter.append([result.data.message]);
                                self.convoMessages.data.push(result.data.message);
                                $scope.adapter.append([result.data.message]);
                                // update convos
                                self.messages.push(result.data.message);
                                self.fetchConvos();

                            }, function (response) {
                                self.reply = reply;
                            })
                            .then(() => {
                                // scroll to bottom of viewport
                                let viewport = angular.element('.viewport.main-comment');
                                viewport.scrollTop(viewport.prop("scrollHeight"));
                            });
                    }
                }, function (err) {
                    UserActions.loginModal();
                });
            }
        }

        function newConversation() {
            self.newMode = true;
            self.selectedConvo = {
                participants: [],
                body: ''
            };

            self.postNewMsg = postNewMsg;

            function postNewMsg() {
                DataService.save('messages', {
                    subject: _.pluck(self.selectedConvo.participants, 'fullName').toString() + ', ' + $rootScope.AppData.User.fullName,
                    message: self.myReply,
                    recipients: _.pluck(self.selectedConvo.participants, 'id')
                }).then((response) => {
                    self.myReply = null;
                    $rootScope.toastMessage('Message sent!');
                    fetchConvos().then(function (conversations) {
                        selectConvo(_.findWhere(conversations, {id: response.body.id}));
                    });
                });
            }
        }

        /**
         * Search for contacts.
         */
        function querySearch(query) {
            return DataService.collection('users', {
                search: query,
                notUsers: $rootScope.AppData.User.id
            }).then((response) => {
                return response.body.data;
            });
        }

        function fetchConvos() {
            return DataService.collection('messages').then((result) => {
                return self.conversations = result.data.conversations;
            });
        }

        function leaveConvo() {
            // TODO replacve confirm dialog
            let confirm = $modal.confirm()
                .title('Leave Conversation?')
                //.textContent('Are you sure you want to delete this conversation?')
                //.ariaLabel('Lucky day')
                //.targetEvent(ev)
                .ok('Yes')
                .cancel('No');
            $modal.show(confirm).then(() => {
                let me = $rootScope.AppData.User.id;
                let message = new Parse.Object('Message');
                message.set('body', me.first_name + ' ' + me.last_name + ' left the conversation...');
                message.set('parent', {
                    __type: 'Pointer',
                    className: 'Conversation',
                    objectId: self.selectedConvo.id
                });
                message.set('from', $rootScope.AppData.User.id);
                message.save().then((result) => {
                    let relParticipants = self.selectedConvo.relation('participants');
                    relParticipants.remove(me);

                    self.selectedConvo.set('updatedAt', moment().toDate());
                    self.selectedConvo.save().then(() => {
                        self.myReply = null;
                        self.messages = [];
                        self.newMode = false;
                        self.selectedConvo = null;
                        self.currentParticipants = null;

                        // Refresh List
                        fetchConvos()
                    });
                });
            }, function () {
            });
        }

        function getParticipantById(convo, userId) {
            return _.findWhere(convo.participants, {user_id: userId});
        }
    }
}

angular.module('IndieWise.auth')
    .component('messages', {
        templateUrl: 'auth/messages.html',
        controller: MessagesController,
        controllerAs: 'Msgs',
        bindings: { conversations: '<'}
    });