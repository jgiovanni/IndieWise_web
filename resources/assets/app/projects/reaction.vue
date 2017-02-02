<template>
    <md-list-item class="has-tip" style="display: block;border-bottom: none">
        <md-icon class="emoticon" :md-src="reaction.src"></md-icon>
        <div class="md-list-text-container">
            <span>{{reaction.name}}</span>
            <span>
                <md-progress class="md-accent" :md-progress="progress"></md-progress>
                <!--<div class="progress" role="progressbar" tabindex="0"
                     :aria-valuenow="(count/reactions.length)*100" aria-valuemin="0"
                     :aria-valuetext="((count/reactions.length)*100) + ' percent'"
                     aria-valuemax="100">
                    <div class="progress-meter" :style="{width: computedProgress(count)}"></div>
                </div>-->
             </span>
        </div>
        <md-tooltip md-direction="top"> {{ pluralizedEmotionCount(count, reaction.name) }}</md-tooltip>
    </md-list-item>
</template>
<style scoped></style>
<script type="text/babel">
    export default {
        name: 'reaction',
        props: ['count', 'id', 'reaction', 'max'],
        data(){
            return {
                currentCount: 0,
                progress: 0,
            }
        },
        watch:{
            currentCount: function(newValue, oldValue) {
                let vm = this;
                let animationFrame;
                function animate (time) {
                    TWEEN.update(time);
                    animationFrame = requestAnimationFrame(animate)
                }
                new TWEEN.Tween({ tweeningNumber: oldValue })
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .to({ tweeningNumber: newValue }, 500)
                    .onUpdate(function () {
                        vm.progress = (this.tweeningNumber.toFixed(0) / vm.max) * 100
                    })
                    .onComplete(function () {
                        cancelAnimationFrame(animationFrame)
                    })
                    .start();
                animationFrame = requestAnimationFrame(animate)
            }
        },
        computed: {
            /*progress(){
                return (this.currentCount / this.max) * 100
            }*/
        },
        methods: {
            pluralizedEmotionCount(count, name) {
                if (count > 1) {
                    return count + ' Users feel ' + name;
                } else {
                    return count + ' User feels ' + name;
                }
            }
        },
        mounted(){
            this.currentCount = this.count;
        }
    }
</script>