import {IRootScopeService} from "angular";
import {IUserActionsService} from "../services/userActions.service";
export class NotificationsController {
    static $inject = ['$rootScope', 'UserActions', '_'];
    constructor($rootScope: IRootScopeService, UserActions:IUserActionsService, _: any) {
        let self = this;

        self.refresh();
    }

    refresh () {
        //$rootScope.getFlatNotificationsFeed();
    };

    markAllAsRead () {
        /*$rootScope.getNewToken('flat', $rootScope.AppData.User.id).then(function (token) {
         let feed = window.StreamClient.feed('flat_notifications', $rootScope.AppData.User.id, token);
         feed.get({limit: 20, mark_read: true}, function (a) {
         _.each($rootScope.AppData.NotificationsFeed.list, function (n) {
         n.is_read = true;
         });
         $rootScope.AppData.NotificationsFeed.unread = 0;
         })
         });*/
    }

    markAsRead (n) {
        /*$rootScope.getNewToken('flat', $rootScope.AppData.User.id).then(function (token) {
         let feed = window.StreamClient.feed('flat_notifications', $rootScope.AppData.User.id, token);
         feed.get({limit: 5, mark_read: [n.id]}, function (a) {
         n.is_read = true;
         --$rootScope.AppData.NotificationsFeed.unseen;
         --$rootScope.AppData.NotificationsFeed.unread;
         return n;
         })
         });*/
    }
}

angular.module('IndieWise.auth')
    .component('notifications', {
        templateUrl: 'auth/notifications.html',
        controller: NotificationsController,
        // controllerAs: 'FPC',
        bindings: {}
    });
