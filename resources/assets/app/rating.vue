<template>
    <md-button-toggle md-single class="md-accent">
        <md-button class="md-icon-button md-dense" v-for="(star, index) in items" @click.native="change(star.value)">
            <md-icon v-if="selected < star.value">star_border</md-icon>
            <md-icon v-else :class="{'md-accent': selected > star.value}">star</md-icon>
        </md-button>
    </md-button-toggle>
</template>
<style scoped></style>
<script type="text/babel">
    export default {
        name: 'rating',
        props: {
            items: {
                type: Array,
            },
            value: {
                type: Number,
            },
            name: {
                type: String,
            }
        },
        data() {
            return  {
                selected: 0,
            }
        },
        methods: {
            change (val) {
                this.selected = val;
                this.$emit('change', this.selected, this.name)
            }
        },
        mounted() {
            this.selected = this.value;
        }

    }
</script>