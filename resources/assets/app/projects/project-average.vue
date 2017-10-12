<template>
    <md-list-item v-if="view === 'mobile'">
        <md-icon>star</md-icon>
        <span>IndieWise Average</span>

        <md-button class="md-list-action">
            <span v-if="critiques > 0" class="label info">{{rating.toFixed(1)}}</span>
            <span v-else class="label info">N/A</span>
        </md-button>
        <md-tooltip md-direction="top">This is the average of all ratings this project has received.</md-tooltip>
    </md-list-item>
    <h5 v-else class="has-tip" style="display: block;">
        IndieWise Average
        <span style="float: right;">
            <span v-if="critiques > 0" class="label info">{{rating.toFixed(1)}}</span>
            <span v-else class="label info">N/A</span>
        </span>
        <md-tooltip md-direction="bottom">This is the average of all ratings this project has received.</md-tooltip>
    </h5>
</template>
<style scoped></style>
<script type="text/javascript">
    export default {
        name: 'project-average',
        props: ['view', 'rating', 'critiques'],
        data(){
            return {
                iwRating: 'N/A',
            }
        },
        methods: {},
        mounted(){

        }
    }
</script>