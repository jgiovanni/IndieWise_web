<template>
    <md-list class="md-denses">
        <md-list-item v-if="!loaded">
            <md-progress-bar md-mode="indeterminate"></md-progress-bar>
        </md-list-item>
        <reaction class="{'md-inset': inset}" v-if="reactionsCount" v-for="(count, key) in chartedReactions" :count="count" :id="key" :key="key" :reaction="getEmoticonByEmotion(key)" :max="reactionCountMax"></reaction>
        <md-list-item class="{'md-inset': inset}" v-else>
            No Reactions made yet.
        </md-list-item>
    </md-list>
</template>
<style scoped></style>
<script type="text/javascript">
    import reaction from './reaction.vue';
    export default {
        name: 'project-reactions',
        components: {reaction},
        props: {
            id: {
                type: String,
                required: true
            },
            reactionsCount: {
                type: Number,
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
                loaded: false,
            }
        },
        methods: {
            computedProgress(count) {
                return (( count / this.reactionsCount ) * 100) + '%';
            },
            refresh() {
                this.loaded = false;
                this.$http.get('projects/reactions', { params: {project: this.id}})
                    .then((response) => {
                        this.chartedReactions = response.data.data;
                        this.loaded = true;
                    }).catch((error) => { console.log(error); });
            },
            getEmoticonByEmotion(emotion) {
                return _.findWhere(this.reactions, {emotion: emotion});
            }
        },
        mounted(){
            let self = this;
            this.reactions = this.generateReactions();
            this.reactionCountMax = this.reactionsCount;
            this.refresh();

            this.$root.$on('loadProjectReactions', function () {
                self.refresh();
            });
        }
    }
</script>