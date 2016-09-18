(function ()
{
    'use strict';

    angular
        .module('app.wins')
        .controller('ReviewDialogController', ReviewDialogController);

    function ReviewDialogController($mdDialog, Win, msUtils) {
        var vm = this;

        // Data
        vm.title = 'Review Critiques';
        vm.win = Win;

        // Methods
        vm.closeDialog = closeDialog;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.exists = msUtils.exists;


        /**
         * Close dialog
         */
        function closeDialog()
        {
            $mdDialog.hide();
        }

    }

})();