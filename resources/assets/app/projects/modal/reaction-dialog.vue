<template>
    <md-dialog ref="ReactionDialog">
        <md-dialog-title>How'd this make you feel?</md-dialog-title>
        <md-dialog-content>
            <md-input-container>
                <md-input v-model="search" placeholder="Search a feeling">
            </md-input-container>
            <md-list style="height: 300px;overflow-y: scroll;">
                <md-list-item class="angucomplete-row" v-for="reaction in filteredEmotions" @click="selectedEmotion(reaction)">
                    <md-icon class="emoticon" md-svg-icon="{{reaction.icon}}"></md-icon>&nbsp;<span>{{reaction.name}}</span>
                </md-list-item>
            </md-list>
            <br>
        </md-dialog-content>
        <md-dialog-actions>
            <md-button class="button tiny" @click="close()">Cancel</md-button>
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
                    return emotion.name.indexOf(self.search) !== -1;
                });
                return filtered;
            }
        },
        methods: {
            close() {
                this.$refs.ReactionDialog.close();
            },
            getEmoticonByEmotion (emotion) {
                return _.findWhere($scope.emotions, {emotion: emotion});
            },
            selectedEmotion (e) {
                // zIndexPlayer(true);
                //$modalInstance.dismiss('cancel');
                $modalInstance.close(e);
                this.$root.$emit('projectReactionSelected', e);
                this.$refs.ReactionDialog.close();
            }

        },
        created() {
        },
        mounted(){
            let self = this;
            this.emotions = this.generateReactions();
            this.$root.$on('openReactionDialog', function () {
                debugger;
                self.$refs.ReactionDialog.open();
            })
        }
    }
</script>