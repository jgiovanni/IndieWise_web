(function () {
    'use strict';

    angular
        .module('app.wins')
        .controller('WinsController', WinsController);


    function WinsController($scope, $auth, $compile, $mdDialog, $document, $timeout, DTOptionsBuilder, DTColumnBuilder, apiResolver) {
        var vm = this;

        // Methods
        vm.grant = grant;
        vm.review = review;
        vm.remove = remove;
        vm.dtInstanceCallback = dtInstanceCallback;

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('dom', '<"top"<"info"i>f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>')
            .withOption('ajax', {
                headers: { Authorization: 'Bearer ' + $auth.getToken() },
                data: {counts:true, include: 'owner,nominations', datatable:true},
                dataSrc: 'data',
                url: '/api/admin/wins'
            })
            // or here
            .withDataProp('data')
            .withOption('responsive', true)
            .withOption('autoWidth', false)
            .withOption('processing', true)
            .withOption('serverSide', true)
            .withOption('createdRow', createdRow)
            .withPaginationType('simple_numbers')
            .withLightColumnFilter({
                '0': {
                    html: 'input',
                    type: 'text',
                    bRegex: false,
                    bSmart: true,
                },
                '1': {
                    html: 'input',
                    type: 'text',
                    bRegex: false,
                    bSmart: true
                },
                '2': {
                    html: 'input',
                    type: 'text',
                    bSmart: true
                },
                '3': {
                    type: 'number',
                },
                '4': {
                    html: 'select',
                    values: [{
                        value: null,  label: 'All'
                    }, {
                        value: 1,  label: 'Yes'
                    }, {
                        value: 0,  label: 'No'
                    }]
                },
                '5': {
                    type: 'datetime',
                    // values: ['Yoda', 'Titi', 'Kyle', 'Bar', 'Whateveryournameis']
                }
            });

        vm.dtColumns = [
            // DTColumnBuilder.newColumn('id').withTitle('ID')/*.notVisible()*/,
            DTColumnBuilder.newColumn('award.data.name').withTitle('Award'),
            DTColumnBuilder.newColumn(null).withTitle('Project').renderWith(renderProject),
            DTColumnBuilder.newColumn('owner.data.fullName').withTitle('Owner'),
            DTColumnBuilder.newColumn(null).withTitle('Nominations').renderWith(renderNoms),
            DTColumnBuilder.newColumn('rewarded').withTitle('Awarded'),
            DTColumnBuilder.newColumn('rewarded_at').withTitle('Awarded At'),
            DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)
        ];

        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }

        function renderProject(data, type, full, meta) {
            return data.project ? data.project.data.name : data.project_id;
        }

        function renderNoms(data, type, full, meta) {
            return data.nominations.data.length;
        }

        function actionsHtml(data, type, full, meta) {
            var canGrant = data.rewarded === 0;
            var projectURL = 'https://getindiewise.com/' + (angular.isObject(data.project) ? data.project.data.url_id : data.project_id);
            return  '<md-menu>' +
                        '<md-button ng-click="$mdOpenMenu($event)" class="md-icon-button" aria-label="Win Actions Menu"><md-icon md-menu-origin md-font-icon="icon-dots-horizontal"></md-icon></md-button>' +
                        '<md-menu-content>' +
                            '<md-menu-item><md-button ng-click="vm.review(\'' + data.id + '\', $event)" aria-label="Review"><md-icon md-menu-align-target md-font-icon="icon-eye"></md-icon>Review Critiques</md-button></md-menu-item>' +
                            '<md-menu-item ng-if="'+ canGrant +'"><md-button ng-click="vm.grant(\'' + data.id + '\', $event)" aria-label="Grant Award"><md-icon md-menu-align-target md-font-icon="icon-star"></md-icon>Grant Award</md-button></md-menu-item>' +
                            '<md-menu-item><md-button ng-href="' + projectURL + '" target="_blank" aria-label="View Project"><md-icon md-menu-align-target md-font-icon="icon-open-in-new"></md-icon>View Project</md-button></md-menu-item>' +
                            // '<md-menu-item><md-button ng-click="vm.remove(\'' + data.id + '\', \'' + data.award.data.name + '\', $event)" aria-label="Delete"><md-icon md-menu-align-target md-font-icon="icon-delete"></md-icon>Delete</md-button></md-menu-item>' +
                        '</md-menu-content>' +
                    '</md-menu>';
        }

        function grant(id, ev) {
            apiResolver.resolve('wins@update', {id: id, rewarded: true, rewarded_at: moment().format('YYYY-MM-DD HH:MM:SS')}).then(function (response) {
                debugger;
            })

        }

        function review(id, ev) {
            apiResolver.resolve('wins@get', {id: id, include: 'nominations.critique'}).then(function (response) {
                $mdDialog.show({
                    controller: 'ReviewDialogController',
                    controllerAs: 'vm',
                    templateUrl : 'app/wins/dialogs/review/review-dialog.html',
                    // parent: angular.element($document.body),
                    parent: angular.element($document.find('#content-container')),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: true,
                    locals: {
                        Win: response.data
                    }
                })
                    .then(function(answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function() {
                    });
            })

        }

        function remove(id, name, ev) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the contact?')
                .htmlContent('<b>' + name + '</b>' + ' will be deleted.')
                .ariaLabel('delete contact')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .parent(angular.element($document.body))
                .ok('Confirm')
                .cancel('Nevermind');
            $mdDialog.show(confirm).then(function() {
                apiResolver.resolve('wins@delete', {id: id})
            }, function() {

            });
        }

        function htmlspecialchars(string) {
            return string
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        function dtInstanceCallback(instance) {}
        $timeout(function () {
            angular.element('thead tr[role=row]').next().addClass('dataTables_filter')
        }, 1000);

    }


})();