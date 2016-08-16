<div class="off-canvas position-right light-off-menu" id="NotificationsArea" data-off-canvas data-close-on-click="false">
    <div class="off-menu-close">
        <h3>Notifications</h3>
        <span class="right-off-canvas-toggle"><i class="fa fa-times fa-2x"></i></span>
    </div>
    <ul class="vertical menu off-menu notification-list">
        <li ng-repeat="notice in AppData.Notifications.list" ng-click="Body.markAsRead(notice)" ng-class="{'unread': !notice.is_read}">
            <a ng-if="::notice.verb === 'win'" ui-sref="video({url_id: notice.project.url_id})">
                <i class="notificon fa fa-trophy"></i>&nbsp;Your video <b>@{{::notice.project.name}}</b> won an award!.
            </a>
            <a ng-if="::notice.verb === 'nominate'" ui-sref="video({url_id: notice.project.url_id})">
                <i class="notificon fa fa-trophy"></i>&nbsp;@{{::notice.actors[0].fullName}} nominated <b>@{{::notice.project.name}}</b> for <b>@{{::notice.activities[0].object.award.name}}</b>.
            </a>
            <a ng-if="::notice.verb === 'critique'" ui-sref="video({url_id: notice.project.url_id})">
                <i class="notificon fa fa-star"></i>&nbsp;@{{::notice.actors[0].fullName}} gave <b>@{{::notice.project.name}}</b> a <b>@{{::notice.activities[0].object.overall}}</b>.
            </a>
            <a ng-if="::notice.verb === 'react'" ui-sref="video({url_id: notice.project.url_id})">
                <i class="notificon fa fa-smile-o"></i>&nbsp;Your video made <b>@{{::notice.activities[0].actor.fullName}}</b> feel <b>@{{::notice.activities[0].object.emotion}}</b>.
            </a>
            <a ng-if="::notice.verb === 'comment'" ui-sref="video_critique({video_url_id: notice.project.url_id, url_id:notice.object})">
                <i class="notificon fa fa-comment"></i>&nbsp;<b>@{{::notice.actorFullName}}</b> posted a comment on your critique.
            </a>
            {{--<a ng-if="::notice.verb === 'message'" ui-sref="messages">
                <i class="notificon fa fa-envelope"></i>&nbsp;
                <ng-pluralize count="notice.activity_count" when="{'one': 'You have 1 new message.', 'other': 'You have {} new messages.'}"></ng-pluralize>
            </a>--}}
            <a ng-if="::notice.verb === 'reply'" ui-sref="video_critique({video_url_id: notice.projectUrlId, url_id:notice.critiqueUrlId})">
                <i class="notificon fa fa-comment"></i>&nbsp;<b>@{{::notice.actorFullName}}</b> replied to your comment.
            </a>
        </li>
    </ul>
</div>
