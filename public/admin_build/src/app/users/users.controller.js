(function () {
    'use strict';

    angular
        .module('app.users')
        .controller('UsersController', UsersController);


    function UsersController($scope, $auth, $compile, $mdDialog, $document, DTOptionsBuilder, DTColumnBuilder, apiResolver) {
        var vm = this;

        // Methods
        vm.view = view;
        vm.edit = edit;
        vm.remove = remove;
        vm.openContactDialog = openContactDialog;

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('dom', '<"top"<"info"i>f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>')
            .withOption('ajax', {
                headers: { Authorization: 'Bearer ' + $auth.getToken() },
                data: {counts:true, include: 'country', datatable:true},
                dataSrc: 'data',
                url: '/api/admin/users'
            })
            // or here
            .withDataProp('data')
            .withOption('responsive', true)
            .withOption('autoWidth', false)
            .withOption('processing', true)
            .withOption('serverSide', true)
            .withOption('createdRow', createdRow)
            .withPaginationType('simple_numbers');

        vm.dtColumns = [
            DTColumnBuilder.newColumn('id').withTitle('ID')/*.notVisible()*/,
            DTColumnBuilder.newColumn('fullName').withTitle('Name'),
            DTColumnBuilder.newColumn('email').withTitle('Email'),
            DTColumnBuilder.newColumn('projects_count').withTitle('Projects'),
            DTColumnBuilder.newColumn('critiques_count').withTitle('Critiques'),
            DTColumnBuilder.newColumn('nominations_count').withTitle('Nominations'),
            DTColumnBuilder.newColumn(null).withTitle('Country').renderWith(renderCountry),
            DTColumnBuilder.newColumn('verified').withTitle('Verified'),
            DTColumnBuilder.newColumn('created_at').withTitle('Join Date'),
            DTColumnBuilder.newColumn('updated_at').withTitle('Last Seen'),
            DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)
        ];

        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }

        function renderCountry(data, type, full, meta) {
            return data.country ? data.country.data.name : 'None Selected';
        }

        function actionsHtml(data, type, full, meta) {
            var name = htmlspecialchars(data.fullName);
            return  '<md-menu>' +
                        '<md-button ng-click="$mdOpenMenu($event)" class="md-icon-button" aria-label="User Actions Menu"><md-icon md-menu-origin md-font-icon="icon-dots-horizontal"></md-icon></md-button>' +
                        '<md-menu-content>' +
                            '<md-menu-item><md-button ng-click="vm.view(\'' + data.id + '\', $event)" aria-label="View"><md-icon md-menu-align-target md-font-icon="icon-account"></md-icon>View</md-button></md-menu-item>' +
                            '<md-menu-item><md-button ng-href="https://getindiewise.com/user/' + data.url_id + '/about" target="_blank" aria-label="Profile Page"><md-icon md-menu-align-target md-font-icon="icon-open-in-new"></md-icon>Profile Page</md-button></md-menu-item>' +
                            '<md-menu-item><md-button ng-click="vm.edit(\'' + data.id + '\', $event)" aria-label="Edit"><md-icon md-menu-align-target md-font-icon="icon-pencil"></md-icon>Edit</md-button></md-menu-item>' +
                            '<md-menu-item><md-button ng-click="vm.remove(\'' + data.id + '\', \'' + name + '\', $event)" aria-label="Delete"><md-icon md-menu-align-target md-font-icon="icon-delete"></md-icon>Delete</md-button></md-menu-item>' +
                        '</md-menu-content>' +
                    '</md-menu>';
        }

        function openContactDialog(ev, contact) {
            $mdDialog.show({
                controller         : 'ContactDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/users/dialogs/contact/contact-dialog.html',
                parent             : angular.element($document.find('#content-container')),
                targetEvent        : ev,
                fullscreen         : true,
                clickOutsideToClose: true,
                locals             : {
                    Contact : contact,
                    // User    : vm.user,
                    // Contacts: vm.contacts
                }
            });
        }

        function view(id, ev) {
            apiResolver.resolve('users@get', {id: id}).then(function (response) {
                debugger;
            })

        }

        function edit(id, ev) {
            apiResolver.resolve('users@get', {id: id}).then(function (response) {
                openContactDialog(ev, response.data);
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
                apiResolver.resolve('users@delete', {id: id})
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
    }


})();