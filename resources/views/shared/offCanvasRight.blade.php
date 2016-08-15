<div class="off-canvas position-right light-off-menu" id="NotificationsArea" data-off-canvas data-close-on-click="false">
    <div class="off-menu-close">
        <h3>Notifications</h3>
        <span class="right-off-canvas-toggle"><i class="fa fa-times fa-2x"></i></span>
    </div>
    <ul class="vertical menu off-menu notification-list">
        <li ng-repeat="notice in AppData.Notifications.list" ng-click="Body.markAsRead(notice)">
            <a ng-show="::notice.verb === 'react'" ui-sref="video({url_id:notice.projectUrlId})">
                <i class="notificon fa fa-smile-o"></i>&nbsp;Your video made <b>@{{::notice.activities[0].actor.fullName}}</b> feel <b>@{{::notice.activities[0].object.emotion}}</b>.
            </a>
            <a ng-show="::notice.verb === 'comment'" ui-sref="video_critique({video_url_id: notice.projectUrlId, url_id:notice.critiqueUrlId})">
                <i class="notificon fa fa-comment"></i>&nbsp;<b>@{{::notice.actorFullName}}</b> posted a comment on your critique.
            </a>
            <a ng-show="::notice.verb === 'message'" ui-sref="messages">
                <i class="notificon fa fa-envelope"></i>&nbsp;
                <ng-pluralize count="notice.activity_count" when="{'one': 'You have 1 new message.', 'other': 'You have {} new messages.'}"></ng-pluralize>
            </a>
            <a ng-show="::notice.verb === 'reply'" ui-sref="video_critique({video_url_id: notice.projectUrlId, url_id:notice.critiqueUrlId})">
                <i class="notificon fa fa-comment"></i>&nbsp;<b>@{{::notice.actorFullName}}</b> replied to your comment.
            </a>
        </li>
    </ul>
</div>
