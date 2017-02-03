<template>
    <md-card>
        <md-card-area md-inset>
            <md-card-header>
                <md-avatar class="md-large" md-flex="20" md-flex-large="10">
                    <img :src="critique.user.avatar||'/assets/img/avatar-1.png'" :alt="critique.user.fullName">
                </md-avatar>

                <div class="md-title"><a :href="'user/' + critique.user.url_id">{{ critique.user.fullName }}</a></div>
                <div class="md-subhead" :title="critique.created_at|vmUtc|vmLocal|vmDateFormat('lll')"><i
                        class="fa fa-clock-o"></i>&nbsp;{{ critique.created_at|vmTimeAgo }}
                </div>
            </md-card-header>

            <md-card-content>
                <md-layout>
                    <md-layout md-flex="60" md-flex-medium="60">
                        <p v-text="critique.body"></p>
                    </md-layout>
                    <md-layout md-flex="40" md-flex-medium="40">
                        <div class="row" v-if="isPrivate() && !isOwnerOrAuthor()">
                            <h3 class="text-center">Private</h3>

                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Overall Rating</span>
                                </div>
                                <div class="columns medium-4 small-3">
                                    <span class="md-body-2">{{critique.overall.toFixed(1)}}</span>
                                </div>
                            </div>
                        </div>
                        <template v-if="!isPrivate() || isOwnerOrAuthor()">
                            <template v-if="expanded">
                                <div v-once class="row columns" v-if="critique.type === 'video'">
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Acting</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.performances}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Cinematography</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.cinematography}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Direction</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.direction}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Editing</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.structure}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Music</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.music}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Originality</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.originality}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Pacing</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.pacing}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Production Value</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.production}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Sound Quality</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.audio}}</span>
                                    </div>
                                    <div class="row columns" style="border-bottom: 1px solid #ddd;">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Writing</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.writing}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Overall Rating</span>
                                        </div>
                                        <div class="columns medium-4 small-3">
                                            <span class="md-body-2">{{critique.overall.toFixed(1)}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-once class="row columns" v-if="critique.type === 'script'">
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Concept</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.concept}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Presentation</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.presentation}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Characters</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.characters}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Structure</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.structure}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Dialogue</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.dialogue}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Originality</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.originality}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Pacing</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.pacing}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Theme</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.theme}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Style</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.style}}</span>
                                    </div>
                                    <div class="row columns" style="border-bottom: 1px solid #ddd;">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Plot</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.writing}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Overall Rating</span>
                                        </div>
                                        <div class="columns medium-4 small-3">
                                            <span class="md-body-2">{{critique.overall.toFixed(1)}}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="row columns">
                                    <div class="row columns text-center" style="border-bottom: 1px solid #ddd;">
                                        <md-button class="" @click="toggleSize()">
                                            <md-icon>poll</md-icon>
                                            Show Scores
                                        </md-button>
                                    </div>
                                    <div class="row columns" v-once>
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Overall Rating</span>
                                        </div>
                                        <div class="columns medium-4 small-3">
                                            <span class="md-body-2">{{critique.overall.toFixed(1)}}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>

                        </template>
                    </md-layout>
                </md-layout>
            </md-card-content>
        </md-card-area>

        <md-card-expand :class="{'md-active': critique.comments.data.length}">
            <md-card-actions>
                <md-button @click="showQuickReply =! showQuickReply">
                    <md-icon>reply</md-icon> Reply critique
                </md-button>
                <md-button @click="view($event)">
                    <md-icon>remove_red_eye</md-icon>
                    View
                </md-button>
                <md-button :href="parentUrlId + '/critique/' + critique.url_id">
                    <md-icon>link</md-icon>
                    Permalink
                </md-button>
                <md-button class="md-icon-button has-tip" v-if="isPrivate()" style="margin-right: 0">
                    <md-icon>lock</md-icon>
                    <md-tooltip md-direction="top">Private</md-tooltip>
                </md-button>
                <md-button v-if="$root.user && critique.user_id === $root.user.id"
                   :href="parentUrlId + '/critique/' + critique.url_id + '/edit'">
                    <md-icon>mode_edit</md-icon> Edit
                </md-button>
                <span style="flex: 1"></span>
                <md-button class="" md-expand-trigger>
                    <md-icon>keyboard_arrow_down</md-icon>
                    {{critique.comments_count||0}} comments
                </md-button>
            </md-card-actions>

            <md-card-content>

                <comment v-for="comment in critique.comments.data" :comment="comment" :parent="critique" :child="true"></comment>
            </md-card-content>
        </md-card-expand>

        <md-card-content>
            <!--<div class="media-object stack-for-small reply-comment">-->
                <reply @defaultPostReply="toggleReplyInput" :parent="critique" v-show="showQuickReply"></reply>
            <!--</div>-->
        </md-card-content>

    </md-card>
</template>
<!--<template>
    <div class="media-object stack-for-small">

        &lt;!&ndash;<div class="media-object-section comment-img text-center">
            <md-list>
                <md-list-item :href="'user/' + critique.user.url_id">
                    <md-avatar md-flex="20" md-flex-large="10">
                        <img :src="critique.user.avatar||'/assets/img/avatar-1.png'" alt="comment">
                    </md-avatar>
                </md-list-item>
            </md-list>
            &lt;!&ndash;<div class="comment-box-img">
                <a :href="'user/' + critique.user.url_id + '/about'">
                    <img :src="critique.user.avatar||'/assets/img/avatar-1.png'" alt="comment">
                </a>
            </div>&ndash;&gt;
        </div>
        &lt;!&ndash; Critique Data &ndash;&gt;
        <div class="media-object-section comment-desc">
            <div class="comment-title">
            <span class="name"><a :href="'user/' + critique.user.url_id + '/about'">
                {{critique.user.fullName}}</a> Said:
            </span>
                <span class="time float-right"><i class="fa fa-clock-o"></i>
                <abbr :title="critique.created_at|vmUtc|vmLocal|vmDateFormat('lll')">
                    {{ critique.created_at|vmTimeAgo }}
                </abbr>

                    &lt;!&ndash;<span ng-if="critique.editedAt && !Body.isSame(critique.created_at, critique.editedAt)">
                        |Edited: <abbr title="{{critique.editedAt|amUtc|amLocal|amDateFormat:'lll'}}"
                                       am-time-ago="critique.editedAt"></abbr>
                    </span>&ndash;&gt;
            </span>
            </div>
            <div class="comment-text">
                <div class="row clearfix">
                    <div class="columns medium-7 small-5">
                        <p v-text="critique.body"></p>
                    </div>
                    <div class="columns medium-5 small-7">
                        <div class="row" v-if="isPrivate() && !isOwnerOrAuthor()">
                            <h3 class="text-center">Private</h3>

                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Overall Rating</span>
                                </div>
                                <div class="columns medium-4 small-3">
                                    <span class="md-body-2">{{critique.overall.toFixed(1)}}</span>
                                </div>
                            </div>
                        </div>
                        <template v-if="!isPrivate() || isOwnerOrAuthor()">
                            <template v-if="expanded">
                                <div v-once class="row columns" v-if="critique.type === 'video'">
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Acting</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.performances}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Cinematography</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.cinematography}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Direction</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.direction}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Editing</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.structure}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Music</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.music}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Originality</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.originality}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Pacing</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.pacing}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Production Value</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.production}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Sound Quality</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.audio}}</span>
                                    </div>
                                    <div class="row columns" style="border-bottom: 1px solid #ddd;">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Writing</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.writing}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Overall Rating</span>
                                        </div>
                                        <div class="columns medium-4 small-3">
                                            <span class="md-body-2">{{critique.overall.toFixed(1)}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-once class="row columns" v-if="critique.type === 'script'">
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Concept</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.concept}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Presentation</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.presentation}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Characters</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.characters}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Structure</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.structure}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Dialogue</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.dialogue}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Originality</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.originality}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Pacing</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.pacing}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Theme</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.theme}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Style</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.style}}</span>
                                    </div>
                                    <div class="row columns" style="border-bottom: 1px solid #ddd;">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Plot</span>
                                        </div>
                                        <span class="columns medium-4 small-3">{{critique.writing}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Overall Rating</span>
                                        </div>
                                        <div class="columns medium-4 small-3">
                                            <span class="md-body-2">{{critique.overall.toFixed(1)}}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="row columns">
                                    <div class="row columns text-center" style="border-bottom: 1px solid #ddd;">
                                        <md-button class="" @click="toggleSize()">
                                            <md-icon>poll</md-icon>Show Scores</md-button>
                                    </div>
                                    <div class="row columns" v-once>
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Overall Rating</span>
                                        </div>
                                        <div class="columns medium-4 small-3">
                                            <span class="md-body-2">{{critique.overall.toFixed(1)}}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>

                        </template>
                    </div>
                </div>
            </div>
            <div class="comment-btns">
            <span>{{critique.comments_count||0}} comments
                &nbsp;
                <a @click="showQuickReply =! showQuickReply"><i class="fa fa-comment"></i> Reply</a>
                &nbsp;
                <a @click="view($event)"><i class="fa fa-eye"></i> View</a>
            </span>
                <span>
                    <a :href="parentUrlId + '/critique/' + critique.url_id">
                        <i class="fa fa-link"></i> Permalink
                    </a>
                </span>
                <span v-if="isPrivate()" class="has-tip" style="margin-right: 0">
                    <i class="fa fa-lock"></i>
                    <md-tooltip md-direction="top">Private</md-tooltip>
                </span>
                <span v-if="$root.user && critique.user_id === $root.user.id">
                    <a :href="parentUrlId + '/critique/' + critique.url_id + '/edit'">
                        <i class="fa fa-pencil"></i> Edit
                    </a>
                </span>
                &lt;!&ndash;<span ng-if="critique.user_id === $root.user.id">
                    <a @click="critique.deleteCritique(critique, $event)"><i class="fa fa-close"></i>Delete</a>
                </span>&ndash;&gt;
            </div>
        </div>

        &lt;!&ndash; Comments &ndash;&gt;
        <div class="media-object stack-for-small reply-comment">
            <div class="media-object stack-for-small" v-for="comment in critique.comments.data"
                 ng-init="comment.replies=[];comment.showReplies=false;">
                <div class="media-object-section comment-img text-center"></div>
                <div class="media-object-section comment-img text-center">
                    <md-list>
                        <md-list-item :href="'user/' + comment.author.url_id">
                            <md-avatar md-flex="20" md-flex-large="10">
                                <img :src="comment.author.avatar || '/assets/img/avatar-1.png'" alt="comment">
                            </md-avatar>
                        </md-list-item>
                    </md-list>
                    &lt;!&ndash;<div class="comment-box-img">
                        <a :href="'user/' + comment.author.url_id + '/about'"><img
                                :src="comment.author.avatar || '/assets/img/avatar-1.png'" alt="comment"></a>
                    </div>&ndash;&gt;
                </div>
                <div class="media-object-section comment-desc">
                    <div class="comment-title">
                    <span class="name"><a :href="'user/' + comment.author.url_id + '/about'">
                        {{comment.author.fullName}}</a> Said:
                    </span>
                        <span class="time float-right">
                        <i class="fa fa-clock-o"></i>
                        <abbr :title="comment.created_at|vmUtc|vmLocal|vmDateFormat('lll')">
                            {{ comment.created_at|vmTimeAgo }}
                        </abbr>
                    </span>
                    </div>
                    <div class="comment-text">
                        <p v-text="comment.body"></p>
                    </div>
                    <div class="comment-btns">
                        <span>
                            &lt;!&ndash;<a href="#"><i class="fa fa-thumbs-o-up"></i></a> |&ndash;&gt;
                            &lt;!&ndash;<a href="#"><i class="fa fa-thumbs-o-down"></i></a> |&ndash;&gt;
                            {{comment.replies_count||0}}&nbsp;<i class="fa fa-comments"></i>
                        </span>
                        &lt;!&ndash;<span><a @click="toggleReplyInput(comment)"><i class="fa fa-share"></i>Reply</a></span>&ndash;&gt;
                        <span toggle-replies v-if="comment.replies_count" class='reply float-right'>
                            Show replies <i class="fa fa-angle-down"></i>
                        </span>
                    </div>

                    <reply :target-comment="comment" :parent="critique"
                           v-if="showReplyInput && targetComment == comment"></reply>

                    &lt;!&ndash;sub comment&ndash;&gt;
                    <template v-for="reply in comment.replies">
                        <div class="media-object stack-for-small reply-comment">
                            <div class="media-object-section comment-img text-center">
                                <div class="comment-box-img">
                                    <img :src="reply.author.avatar || '/assets/img/avatar-1.png'"
                                         alt="comment">
                                </div>
                            </div>
                            <div class="media-object-section comment-desc">
                                <div class="comment-title">
                                    <span class="name"><a :href="'user/' + reply.author.url_id + '/about'">{{reply.author.fullName}}</a> Said:</span>
                                    <span class="time float-right"><i class="fa fa-clock-o"></i>
                                        <abbr :title="reply.created_at|vmUtc|vmLocal|vmDateFormat('lll')">
                                            {{ reply.created_at|vmTimeAgo }}
                                        </abbr>
                                    </span>
                                </div>
                                <div class="comment-text">
                                    <p v-show="editComment && editComment.id != reply.id" v-text="reply.body"></p>
                                    <edit-comment-block
                                            v-if="$root.user && reply.author === $root.user.id && editCommentMode"></edit-comment-block>
                                </div>
                                <div class="comment-btns">
                                    <span>
                                        &lt;!&ndash;<a href="#"><i class="fa fa-thumbs-o-up"></i></a> |&ndash;&gt;
                                        &lt;!&ndash;<a href="#"><i class="fa fa-thumbs-o-down"></i></a>&ndash;&gt;
                                    </span>
                                    <span><a @click="toggleReplyInput(reply)"><i
                                            class="fa fa-share"></i>Reply</a></span>
                                    &lt;!&ndash;<span toggle-replies class='reply float-right'></span>&ndash;&gt;
                                </div>
                            </div>
                        </div>
                        &lt;!&ndash;<reply flex="95" :target-comment="targetComment" :parent="commentsParent"
                               v-if="showReplyInput && targetComment == reply"></reply>&ndash;&gt;
                    </template>
                    &lt;!&ndash; end sub comment &ndash;&gt;

                </div>
            </div>
            <reply @defaultPostReply="toggleReplyInput" :parent="critique" v-show="showQuickReply"></reply>
        </div>&ndash;&gt;

    </div>
</template>-->
<style scoped></style>
<script type="text/babel">
    import comment from '../comments/comment.vue';
    import reply from '../comments/reply.vue';
    export default {
        name: 'critique-item',
        components: {comment, reply},
        props: {
            critique: {
                type: Object
            },
            parentUrlId: {
                type: String
            },
            parentOwnerId: {
                type: String
            },
        },
        data(){
            return {
                showQuickReply: Foundation.MediaQuery.atLeast('large') || false,
                showReplyInput: false,
                expanded: false
            }
        },
        methods: {
            isPrivate() {
                return this.critique && this.critique.private;
            },

            isOwnerOrAuthor() {
                return this.$root.user && ((this.critique && this.$root.user.id === this.critique.user_id) || this.$root.user.id === this.parentOwnerId);
            },
            toggleSize(){
                this.expanded = !this.expanded;
            },

            view($event) {
                this.$root.$emit('openCritiqueView', this.critique);
            },
            toggleReplyInput($e){
                this.showReplyInput = !this.showReplyInput;
            },

            deleteCritique($event) {
                let self = this;
                this.UserActions.checkAuth().then(function (res) {
                    if (res) {
                        let confirm = this.$mdDialog.confirm()
                            .title('Delete Critique')
                            .textContent('Are you sure you want to delete your critique?')
                            .ariaLabel('Delete Critique')
                            .targetEvent($event)
                            .ok('Yes')
                            .cancel('No');

                        this.$mdDialog.show(confirm).then(function () {
                            if (this.isOwnerOrAuthor) {
                                this.DataService.delete('Critique', this.critique.id).then(function () {
                                    this.$rootScope.toastMessage('Your critique was deleted.');
                                    // Decrement film critiques_count
                                    this.film.critiques_count--;
                                    this.updateVideoObj();
                                    this.checkUserActions();
                                    this.critiques = this._.reject(this.critiques, function (a) {
                                        return a.id === self.critique.id;
                                    });
                                });
                            }
                        }, function (error) {
                            console.log(error);
                        });
                    }
                })
            },
        },
        mounted(){
            this.critique.replies = [];
            this.critique.showReplies = false;
        }
    }
</script>