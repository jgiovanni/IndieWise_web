import {IUserActionsService} from "../services/userActions.service";
import {IDataService} from "../services/dataService.service";
import {IRootScopeService} from "angular";
export interface IUser {
    user: Object;
    userStats: Object;

    // showMessageDialog: () =>void;
}
export class UserController implements IUser{
    user: Object;
    userStats: Object;

    static $inject = ['$rootScope', 'DataService', 'UserActions', '$modal', '_'];
    constructor(private $rootScope: IRootScopeService, private DataService: IDataService, private UserActions: IUserActionsService, private $modal: any, private _: any) {}

    $onInit = function() {
        this.$rootScope.metadata.title = 'Profile: ' + this.user.firstName + ' ' + this.user.lastName;
    };

    showMessageDialog () {
        ContactUserDialogController.$inject = ['$rootScope', '$scope', '$modalInstance', 'UserActions', 'DataService', 'recipient', '$timeout'];
        function ContactUserDialogController($rootScope, $scope, $modalInstance, UserActions, DataService, recipient, $timeout) {


            $scope.recipient = recipient;
            $scope.model = {
                mySubject: $rootScope.AppData.User.fullName + ', ' + $scope.recipient.fullName,
                myMessage: null
            };

            $scope.postMessage = function () {
                UserActions.checkAuth().then(function (res) {
                    if (res) {
                        // create new conversation
                        DataService.save('messages', {
                            subject: $scope.model.mySubject,
                            message: $scope.model.myMessage,
                            recipients: new Array($scope.recipient.id)
                        }).then(function (convo) {
                            $scope.model.myMessage = null;
                            $rootScope.toastMessage('Message sent!');
                            // register Action
                            //result.participants = $scope.recipient;
                            $scope.closeDialog();

                            // Creates Duplicate entry Error
                            /*DataService.update('Conversation', convo.data.id, {
                             id: convo.data.id,
                             participants: [
                             {user: $rootScope.AppData.User.id},
                             {user: $scope.recipient.id}
                             ],
                             messages: [
                             {body: $scope.model.myMessage, from: $rootScope.AppData.User.id}
                             ]
                             }, true, true).then(function (convo) {

                             });*/
                        });
                    }
                }, function (err) {
                    $rootScope.toastMessage('Message failed. Please log in!');
                    //UserActions.loginModal();
                });
            };

            $scope.closeDialog = function () {
                $modalInstance.close(true);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

        }

            if (this.$rootScope.isAuthenticated()) {
                this.$modal.open({
                    templateUrl: 'templates/common/contactUserDialog.html',
                    resolve: {
                        recipient: function () {
                            return this.user;
                        }.bind(this)
                    },
                    controller: ContactUserDialogController
                });
            } else this.UserActions.loginModal();
    }
}

angular.module('IndieWise.user', [])
    .component('user', {
        templateUrl: 'user/user.html',
        controller: UserController,
        controllerAs: 'UserC',
        bindings: {user: '<', userStats: '<'}
    });
