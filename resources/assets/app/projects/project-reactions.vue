<template>
    <md-list class="md-denses">
        <md-list-item v-if="!loaded">
            <md-progress md-indeterminate></md-progress>
        </md-list-item>
        <reaction class="{'md-inset': inset}" v-if="project.reactions_count" v-for="(count, key) in chartedReactions" :count="count" :id="key" :reaction="getEmoticonByEmotion(key)" :max="reactionCountMax"></reaction>
        <md-list-item class="{'md-inset': inset}" v-else>
            No Reactions made yet.
        </md-list-item>
    </md-list>
</template>
<style scoped></style>
<script type="text/babel">
    import reaction from './reaction.vue';
    export default {
        name: 'project-reactions',
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
                loaded: false,
            }
        },
        methods: {
            computedProgress(count) {
                return (( count / this.project.reactions_count ) * 100) + '%';
            },
            refresh() {
                this.loaded = false;
                this.$http.get('projects/reactions', { params: {project: this.project.id}})
                    .then(function (response) {
                        this.chartedReactions = response.data.data;
                        this.loaded = true;
                    });
            },
            getEmoticonByEmotion(emotion) {
                return _.findWhere(this.reactions, {emotion: emotion});
            }
        },
        mounted(){
            let self = this;
            this.reactions = this.generateReactions();
            this.reactionCountMax = this.project.reactions_count;
            this.refresh();

            this.$root.$on('loadProjectReactions', function () {
                self.refresh();
            });
        }
    }
</script>