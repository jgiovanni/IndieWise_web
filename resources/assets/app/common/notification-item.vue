<template>
	<md-list-item :href="redirectUrl">
		<template v-if="verb === 'win'">
			<md-icon class="fa fa-trophy"></md-icon>
			<span>Your project <b>{{projectName}}</b> won an award!.</span>
		</template>
		<template v-else-if="verb === 'nominate'">
			<md-icon class="fa fa-trophy"></md-icon>
			<span>{{notification.actors[0] ? notification.actors[0].fullName:'Someone'}} nominated <b>{{projectName}}</b> for <b>{{awardName}}</b>.</span>
		</template>
		<template v-else-if="verb === 'critique'">
			<md-icon class="fa fa-star"></md-icon>
			<span>{{notification.actors[0] ? notification.actors[0].fullName:'Someone'}} gave <b>{{projectName}}</b> a <b>{{notification.activities[0].object.overall}}</b>.</span>
		</template>
		<template v-else-if="verb === 'react'">
			<md-icon class="fa fa-smile-o"></md-icon>
			<span>Your project made <b>{{notification.activities[0].actor.fullName}}</b> feel <b>{{notification.activities[0].object.emotion}}</b>.</span>
		</template>
		<template v-else-if="verb === 'rate'">
			<md-icon class="fa fa-thumbs-o-up" :class="{'fa-flip-vertical': notification.activities[0].object.down}"></md-icon>
			<span>{{notification.actors[0] ? notification.actors[0].fullName:'Someone'}} gave <b>{{projectName}}</b> a <b>{{(!!notification.activities[0].object.up) ? 'thumbs up' : 'thumbs down'}}</b>.</span>
		</template>
		<template v-else-if="verb === 'comment'">
			<md-icon class="fa fa-comment"></md-icon>
			<span><b>{{notification.actors[0] ? notification.actors[0].fullName:'Someone'}}</b> posted a comment on your critique.</span>
		</template>
		<!--<template v-if="verb === 'message'" :href="messages">
			<md-icon class="fa fa-envelope"></md-icon>
			<p><ng-pluralize count="notification.activity_count" when="{'one': 'You have 1 new message.', 'other': 'You have {} new messages.'}"></ng-pluralize></p>
		</template>-->
		<template v-else-if="verb === 'reply'">
			<md-icon class="fa fa-comment"></md-icon>
			<span><b>{{notification.actorFullName}}</b> replied to your comment.</span>
		</template>
	</md-list-item>
</template>

<style>
	.notification-list .md-list-item-holder {
		white-space: normal;
		line-height: 20px;
	}
</style>
<script type="text/javascript">
    export default{
        name: 'notification-item',
	    props: ['notification', 'verb'],
        data(){
            return {
                msg: null
            }
        },
	    computed: {
            redirectUrl(){
                switch (this.verb){
                    // Project Verbs
	                case 'win':
	                case 'nominate':
	                case 'critique':
	                case 'react':
	                case 'rate':
	                    return '/' + (this.notification.project ? this.notification.project.url_id : '');
                    // Critique Verbs
	                /*case 'comment':
	                    return this.notification.project ? '/' + this.notification.project.url_id + '/critique/' + this.notification.object : '';
	                case 'reply':
	                    return '/' + this.notification.projectUrlId + '/critique/' + this.notification.critiqueUrlId;
	                default:
	                    return '/';*/
                }
            },
		    projectName(){
                return this.notification.hasOwnProperty('project') ? this.notification.project.name : '';
		    },
		    awardName(){
		        if (this.verb === 'nominate') {
		            return _.isObject(this.notification.activities[0].object) ? this.notification.activities[0].object.award.name : 'an award.'
		        }
		    },
		    
	    },
        methods: {},
        mounted(){
//            console.log(this.notification);
        }
    }
</script>