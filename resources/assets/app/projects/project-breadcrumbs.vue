<template>
	<md-button-toggle class="player-toggles">
		<md-button class="md-icon-button md-toggle lights-toggle-button" @click.native="toggleLights()" style="color: #ffffff;">
			<md-icon :class="{ 'light-on': lightsOff }">lightbulb_outline</md-icon>
			<!--<i class="fa fa-lightbulb-o" :class="{ 'light-on': lightsOff }"></i>-->
			<md-tooltip md-direction="bottom">
				<span v-if="!lightsOff">Lights Off</span>
				<span v-else>Lights On</span>
			</md-tooltip>
		</md-button>
		<md-button class="md-icon-button md-toggle show-for-large" @click.native="toggleWidthMode()" style="color: #ffffff;">
			<!--<i v-if="!playerResponsiveMode" class="fa fa-expand"></i>-->
			<!--<i v-else class="fa fa-compress"></i>-->
			<md-icon v-if="!playerResponsiveMode">aspect_ratio</md-icon>
			<md-icon v-else>crop_16_9</md-icon>
			<md-tooltip md-direction="bottom">
				<span v-if="!playerResponsiveMode">Widescreen</span>
				<span v-else>Center</span>
			</md-tooltip>
		</md-button>
	</md-button-toggle>
</template>
<style scoped>
	.cinema-mode .player-toggles {
		z-index: 10;
	}
</style>
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