<template>
     <md-list>
        <md-list-item v-if="loading">
            <md-progress-bar md-mode="indeterminate"></md-progress-bar>
        </md-list-item>
        <md-list-item v-else v-for="win in wins" :key="win.id">
            <md-icon style="color: #FFC10E;" md-src="assets/svg/trophy.svg"></md-icon>

            <span>{{win.award.data.name}}</span>
            <template v-if="win.rewarded === 0">
                <md-icon>hourglass_empty</md-icon>
                <md-tooltip md-direction="top">Awards are reviewed before being given. Once verified the hourglass icon will disappear.</md-tooltip>
            </template>
        </md-list-item>
    </md-list>
</template>
<style scoped></style>
<script type="text/javascript">
    export default {
        name: 'project-awards',
        props: ['view', 'id'],
        data(){
            return {
                loading: true,
                wins: [],
            }
        },
        methods: {},
        mounted(){
            let self = this;
            this.$http.get('wins', {params: {project: this.id, sort: 'name'}})
                .then((result) => {
                    self.wins = result.data.data;
                    // console.log('AwardWin: ', result.data);
                }, (error) => console.log(error)).then(() => {
                this.loading = false;

            });
        }
    }
</script>