<template>
    <section class="singlePostDescription">
        <div class="row secBg">
            <div class="large-12 columns" v-if="critique">
                <div class="heading">
                    <h5>
                        Critique by &nbsp;<a :href="'/user/' + critique.user.url_id">{{critique.user.fullName}}</a>
                        |
                        <span class="md-caption">
								<span class="fa fa-clock-o"></span>
								<abbr :title="critique.created_at|vmUtc|vmLocal|vmDateFormat('ll')">{{critique.created_at|vmTimeAgo}}</abbr>

								<span class="grey-text" v-if="critique.edited_at !== '0000-00-00 00:00:00'">Edited:
									<abbr :title="critique.edited_at|vmUtc|vmLocal|vmDateFormat('ll')">{{critique.edited_at|vmTimeAgo}}</abbr>
								</span>
							</span>

                        <md-button :href="'/'+critique.project.data.url_id + '/critique/' + critique.url_id + '/edit'"
                                   v-if="$root.user && $root.user.id == critique.user_id"
                                   class="pull-right md-icon-button">
                            <md-icon>edit_mode</md-icon>
                        </md-button>
                    </h5>
                </div>
                <div class="description" v-once>
                    <div class="row clearfix">
                        <div class="columns medium-7">
                            <p>{{ critique.body }}</p>
                        </div>
                        <div class="columns medium-5">
                            <div class="row" v-if="critique.private && $root.user.id != critique.user_id">
                                <h3 class="text-center">Private</h3>

                                <div class="row columns">
                                    <div class="columns small-6 text-right">
                                        <span class="md-body-1">Overall Rating</span>
                                    </div>
                                    <div class="columns small-6">
                                        <span class="md-body-2">{{critique.overall.toFixed(1)}}</span>
                                    </div>
                                </div>
                            </div>
                            <template v-if="!critique.private || ($root.user && $root.user.id == critique.user_id)">
                                <div class="row columns" v-if="critique.type === 'video'">
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Acting</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.performances}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Cinematography</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.cinematography}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Direction</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.direction}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Editing</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.structure}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Music</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.music}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Originality</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.originality}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Pacing</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.pacing}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Production Value</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.production}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Sound Quality</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.audio}}</span>
                                    </div>
                                    <div class="row columns" style="border-bottom: 1px solid #ddd;">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Writing</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.writing}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Overall Rating</span>
                                        </div>
                                        <div class="columns medium-4 small-6">
                                            <span class="md-body-2">{{critique.overall.toFixed(1)}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row columns" v-if="critique.type === 'script'">
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Concept</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.concept}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Presentation</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.presentation}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Character Development</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.characters}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Quality of Dialogue</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.dialogue}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Theme</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.theme}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Style</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.style}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Pacing</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.pacing}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Structure</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.structure}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Originality</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.originality}}</span>
                                    </div>
                                    <div class="row columns" style="border-bottom: 1px solid #ddd;">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Plot</span>
                                        </div>
                                        <span class="columns medium-4 small-6">{{critique.writing}}</span>
                                    </div>
                                    <div class="row columns">
                                        <div class="columns medium-8 small-6 text-right">
                                            <span class="md-body-1">Overall Rating</span>
                                        </div>
                                        <div class="columns medium-4 small-6">
                                            <span class="md-body-2">{{critique.overall.toFixed(1)}}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <br>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped></style>
<script type="text/javascript">
    export default{
        name: 'critique',
        props: ['id'],
        data(){
            return {
                critique: null,
            }
        },
        methods: {

        },
        mounted(){
            let self = this;
            this.$http.get('critiques{/id}', {
                params: {
                    id: this.id,
                    include: 'project.owner'
                }
            }).then((response) => {
                this.critique = response.data.data;
            });

        }
    }

</script>