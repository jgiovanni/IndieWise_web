<template>
	<span class="pull-right" style="position: relative;z-index: 11;font-size: 13px;">
		<a class="lights-toggle-button" @click="toggleLights()" style="color: #ffffff;">
			<i class="fa fa-lightbulb-o" :class="{ 'light-on': lightsOff }"></i>
			<span v-if="!lightsOff">Lights Off</span>
			<span v-else>Lights On</span>
		</a>
		<span class="show-for-large">&nbsp;|&nbsp;</span>
		<a class="show-for-large" @click="toggleWidthMode()" style="position: relative;z-index: 11;font-size: 13px;color: #ffffff;">
			<i v-if="!playerResponsiveMode" class="fa fa-expand"></i>
			<i v-else class="fa fa-compress"></i>
			<span v-if="!playerResponsiveMode">Widescreen</span>
			<span v-else>Center</span>
		</a>
	</span>
</template>
<style></style>
<script type="text/javascript">
    export default{
        name: 'project-breadcrumbs',
        data(){
            return {
                lightsOff: false,
                playerResponsiveMode: localStorage.playerResponsiveMode ? JSON.parse(localStorage.playerResponsiveMode) : _.contains(['small', 'medium', 'large'], Foundation.MediaQuery.current),
            }
        },
        methods: {
            toggleLights () {
                this.lightsOff = !this.lightsOff;
                let overlay = jQuery('#overlay');
                let body = jQuery('body');
                overlay.fadeToggle(1000);
		        /* Choose desired delay */
                if (!this.lightsOff) {
                    setTimeout(function () {
                        overlay.removeClass('highlight');
                        body.removeClass('cinema-mode');
                    }, 1000);
			        /* Same delay */
                } else {
                    overlay.addClass('highlight');
                    body.addClass('cinema-mode');
                }
            },

            toggleWidthMode () {
                let self = this;
                localStorage.playerResponsiveMode = this.playerResponsiveMode = !this.playerResponsiveMode;
                this.$root.$emit('playerResponsiveMode', this.playerResponsiveMode);
            },

        },
        ready(){

        }
    }
</script>