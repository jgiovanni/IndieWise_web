<template>
    <md-dialog ref="reactionDialog">
        <md-dialog-title>How'd this make you feel?</md-dialog-title>
        <md-dialog-content>
            <md-input-container>
                <md-input v-model="search" placeholder="Search a feeling"></md-input>
            </md-input-container>
            <md-list style="height: 300px;overflow-y: scroll;">
                <md-list-item class="angucomplete-row" v-for="reaction in filteredEmotions" @click.native="selectedEmotion(reaction)">
                    <md-icon :md-src="reaction.src"></md-icon>&nbsp;<span>{{reaction.name}}</span>
                </md-list-item>
            </md-list>
            <br>
        </md-dialog-content>
        <md-dialog-actions>
            <md-button class="" @click.native="close()">Cancel</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>
<style scoped></style>
<script type="text/babel">
    export default {
        name: 'reaction-dialog',
        data(){
            return {
                emotions: [],
                search: '',
            }
        },
        computed: {
            filteredEmotions(){
                let self = this;
                let filtered = _.filter(_.sortBy(this.emotions, 'name'), function (emotion) {
                    return emotion.name.toLowerCase().indexOf(self.search.toLowerCase()) !== -1;
                });
                return filtered;
            }
        },
        methods: {
            close() {
                this.$refs.reactionDialog.close();
            },
            getEmoticonByEmotion (emotion) {
                return _.findWhere($scope.emotions, {emotion: emotion});
            },
            selectedEmotion (e) {
                this.$root.$emit('projectReactionSelected', e);
                this.$refs.reactionDialog.close();
            }
        },
        created() {
            let self = this;
            this.emotions = this.generateReactions();
            this.$root.$on('openReactionDialog', function () {
                self.$refs.reactionDialog.open();
            })
        },
        mounted(){

        }
    }
</script>