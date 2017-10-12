<template>
	<md-list class="md-dense">
		<reaction class="{'md-inset': inset}" v-if="project.reactions_count" v-for="(count, key) in chartedReactions" :count="count" :id="key" :reaction="getEmoticonByEmotion(key)" :max="reactionCountMax"></reaction>
		<md-list-item class="{'md-inset': inset}" v-else>
			No Reactions made yet.
		</md-list-item>
	</md-list>
</template>
<style scoped></style>
<script type="text/javascript">
    import reaction from '../projects/reaction.vue';
    export default {
        name: 'user-reactions-list',
        components: {reaction},
        props: {
            project: {
                type: Object,
                required: true
            },
            inset: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                reactions: [],
                reactionCountMax: 0,
                chartedReactions: [],
            }
        },
        methods: {
            computedProgress(count) {
                return (( count / this.project.reactions_count ) * 100) + '%';
            },
            refresh() {
                this.$http.get('projects/reactions', { params: {project: this.project.id}})
                    .then((response) => {
                        this.chartedReactions = response.body.data;
                    });
            },
            getEmoticonByEmotion(emotion) {
                return _.findWhere(this.reactions, {emotion: emotion});
            }


        },
        mounted(){
            this.reactions = this.generateReactions();
            this.reactionCountMax = this.project.reactions_count;
            this.$parent.projectReactions = this;
            this.refresh();
        }
    }
</script>