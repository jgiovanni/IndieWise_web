<md-sidenav md-component-id="right" ng-cloak class="md-sidenav-right">
    <md-toolbar class="md-accent">
        <div class="md-toolbar-tools">
            <h1 class="md-toolbar-tools text-white">Notifications</h1>
            <span flex></span>
            <md-button class="md-icon-button" aria-label="Close menu" ng-click="Body.closeSideNav('right')">
                <md-icon>close</md-icon>
            </md-button>
        </div>
    </md-toolbar>
    <md-content>
        <md-list class=" notification-list" >
            <ng-repeat ng-repeat="notice in AppData.Notifications.list" ng-click="Body.markAsRead(notice);Body.closeSideNav('right')" ng-class="{'unread': !notice.is_read}">
                <md-list-item ng-if="::notice.verb === 'win'" ui-sref="video({url_id: notice.project.url_id})">
                    <md-icon class="fa fa-trophy"></md-icon>
                    <p>Your video <b>@{{::notice.project.name}}</b> won an award!.</p>
                </md-list-item>
                <md-list-item ng-if="::notice.verb === 'nominate'" ui-sref="video({url_id: notice.project.url_id})">
                    <md-icon class="fa fa-trophy"></md-icon>
                    <p>@{{::notice.actors[0].fullName}} nominated <b>@{{::notice.project.name}}</b> for <b>@{{::notice.activities[0].object.award.name}}</b>.</p>
                </md-list-item>
                <md-list-item ng-if="::notice.verb === 'critique'" ui-sref="video({url_id: notice.project.url_id})">
                    <md-icon class="fa fa-star"></md-icon>
                    <p>@{{::notice.actors[0].fullName}} gave <b>@{{::notice.project.name}}</b> a <b>@{{::notice.activities[0].object.overall}}</b>.</p>
                </md-list-item>
                <md-list-item ng-if="::notice.verb === 'react'" ui-sref="video({url_id: notice.project.url_id})">
                    <md-icon class="fa fa-smile-o"></md-icon>
                    <p>Your video made <b>@{{::notice.activities[0].actor.fullName}}</b> feel <b>@{{::notice.activities[0].object.emotion}}</b>.</p>
                </md-list-item>
                <md-list-item ng-if="::notice.verb === 'rate'" ui-sref="video({url_id: notice.project.url_id})">
                    <md-icon class="fa fa-thumbs-o-up" ng-class="{'fa-flip-vertical': notice.activities[0].object.down}"></md-icon>
                    <p>@{{::notice.actors[0].fullName}} gave <b>@{{::notice.project.name}}</b> a <b>@{{::(!!notice.activities[0].object.up) ? 'thumbs up' : 'thumbs down'}}</b>.</p>
                </md-list-item>
                <md-list-item ng-if="::notice.verb === 'comment'" ui-sref="video_critique({video_url_id: notice.project.url_id, url_id:notice.object})">
                    <md-icon class="fa fa-comment"></md-icon>
                    <p><b>@{{::notice.actors[0].fullName}}</b> posted a comment on your critique.</p>
                </md-list-item>
                <md-list-item ng-if="::notice.verb === 'message'" ui-sref="messages">
                    <md-icon class="fa fa-envelope"></md-icon>
                    <p><ng-pluralize count="notice.activity_count" when="{'one': 'You have 1 new message.', 'other': 'You have {} new messages.'}"></ng-pluralize></p>
                </md-list-item>
                <md-list-item ng-if="::notice.verb === 'reply'" ui-sref="video_critique({video_url_id: notice.projectUrlId, url_id:notice.critiqueUrlId})">
                    <md-icon class="fa fa-comment"></md-icon>
                    <p><b>@{{::notice.actorFullName}}</b> replied to your comment.</p>
                    {{--<a>
                        <i class="notificon fa fa-trophy"></i>&nbsp;Your video <b>@{{::notice.project.name}}</b> won an award!.
                    </a>
                    <a>
                        <i class="notificon fa fa-trophy"></i>&nbsp;@{{::notice.actors[0].fullName}} nominated <b>@{{::notice.project.name}}</b> for <b>@{{::notice.activities[0].object.award.name}}</b>.
                    </a>
                    <a>
                        <i class="notificon fa fa-star"></i>&nbsp;@{{::notice.actors[0].fullName}} gave <b>@{{::notice.project.name}}</b> a <b>@{{::notice.activities[0].object.overall}}</b>.
                    </a>
                    <a>
                        <i class="notificon fa fa-smile-o"></i>&nbsp;Your video made <b>@{{::notice.activities[0].actor.fullName}}</b> feel <b>@{{::notice.activities[0].object.emotion}}</b>.
                    </a>
                    <a>
                        <i class="notificon fa fa-thumbs-o-up"></i>&nbsp;@{{::notice.actors[0].fullName}} gave <b>@{{::notice.project.name}}</b> a <b>@{{::notice.activities[0].object.overall}}</b>.
                    </a>
                    <a>
                        <i class="notificon fa fa-comment"></i>&nbsp;<b>@{{::notice.actors[0].fullName}}</b> posted a comment on your critique.
                    </a>
                    <a>
                        <i class="notificon fa fa-envelope"></i>&nbsp;
                        <ng-pluralize count="notice.activity_count" when="{'one': 'You have 1 new message.', 'other': 'You have {} new messages.'}"></ng-pluralize>
                    </a>
                    <a>
                        <i class="notificon fa fa-comment"></i>&nbsp;<b>@{{::notice.actorFullName}}</b> replied to your comment.
                    </a>--}}
                </md-list-item>
            </ng-repeat>
        </md-list>
    </md-content>
</md-sidenav>
