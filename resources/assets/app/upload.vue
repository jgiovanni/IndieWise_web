<template>
    <div class="large-12 columns">
        <template v-if="projectData && (viewState === 'upload' || viewState === 'edit')">
            <template v-if="viewState === 'upload'">
                <form @submit.stop.prevent="submitNewVideo()" name="NewVideoForm" novalidate>
                    <div class="row">
                        <div class="large-12 columns">
                            <md-input-container :class="{'md-input-invalid': errors.has('name')}">
                                <label for="name">Title</label>
                                <md-input id="name" v-model="projectData.name" data-vv-name="name" v-validate="'required'"
                                          placeholder="Enter your video title..." required></md-input>
                                <span class="md-error" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                            </md-input-container>
                        </div>
                        <div class="large-12 columns">
                            <h6 class="borderBottom">Choose Video/Script Method</h6>

                            <!--<p><strong>Note:</strong> Please choose one of the following ways to embed the video
								into your post, the video is determined in the order: Video Code > Video URL > Video
								File.</p>-->
                            <md-button-toggle md-single class="md-primary">
                                <md-button @click.native="projectData.hosting_type = 'script'">Script (PDF)</md-button>
                                <md-button @click.native="projectData.hosting_type = 'HTML5'">
                                    MP4 Video File. (Max Size: 1GB)
                                </md-button>
                                <md-button @click.native="projectData.hosting_type = 'youtube'" class="md-toggle">YouTube
                                    Video URL
                                </md-button>
                                <md-button @click.native="projectData.hosting_type = 'vimeo'">Vimeo Video URL</md-button>
                            </md-button-toggle>
                        </div>
                        <div class="large-12 columns">
                            <template v-if="uploadType === 1">
                                <div class="large-12 columns">
                                    <div class="padding-16">
                                        <!--<md-button class="md-fab" @click.native="pickVideo">
											<md-icon>edit</md-icon>
										</md-button>-->

                                        <input filepicker type="filepicker" onchange="" @change="onUploadSuccess"
                                               data-fp-services="computer,dropbox,video,url,googledrive,skydrive,clouddrive"
                                               data-fp-mimetype="video/*" data-fp-store-path="getUserFilmPath()"
                                               :data-fp-policy="fpPolicy" :data-fp-signature="fpSignature"
                                               data-fp-debug="true"/>


                                    </div>
                                    <!--<hr>-->
                                </div>
                            </template>
                            <template v-else-if="uploadType === 4">
                                <div class="large-12 columns">
                                    <div class="padding-16">
                                        <!--<md-button class="md-fab" @click.native="pickScript">
											<md-icon>edit</md-icon>
										</md-button>-->


                                        <input filepicker type="filepicker" onchange="" @change="onUploadSuccess"
                                               data-fp-services="computer,dropbox,url,googledrive,skydrive,clouddrive"
                                               data-fp-extension=".pdf" data-fp-store-path="getUserFilmPath()"
                                               :data-fp-policy="fpPolicy" :data-fp-signature="fpSignature"
                                               data-fp-debug="true"/>

                                        <!--<md-theme class="complete-example" md-name="orange">
											<md-button class="md-fab" :class="{ 'md-primary': done }">
												<md-icon>cloud_upload</md-icon>
												&lt;!&ndash;<md-icon v-if="done">done</md-icon>&ndash;&gt;
											</md-button>

											<md-spinner :md-size="74" :md-stroke="2.2" md-inderterminate></md-spinner>
										</md-theme>-->
                                    </div>
                                    <!--<hr>-->
                                </div>
                            </template>
                            <template v-else>
                                <div class="large-12 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('videoUrl')}">
                                        <label for="video_url">{{projectData.hosting_type.toUpperCase()}} Video URL</label>
                                        <md-input id="video_url" type="url" v-model="projectData.video_url"
                                                  data-vv-name="videoUrl" v-validate="'required|url'"
                                                  :required="uploadType == 2 || uploadType == 3"></md-input>
                                    </md-input-container>
                                </div>
                            </template>

                        </div>

                        <div class="large-12 columns">
                            <h6 class="borderBottom">Upload Thumbnail/Artwork</h6>
                        </div>
                        <div>
                            <div class="large-12 columns">
                                <md-checkbox id="uploadOwnArt" name="uploadOwnArt" v-model="uploadOwnArt">
                                    Upload your own video thumbnail/artwork ?
                                </md-checkbox>
                            </div>
                            <div class="large-12 columns" v-if="!uploadOwnArt">
                                <md-input-container>
                                    <label for="thumbnail_url">Poster Artwork/Video Thumbnail URL</label>
                                    <md-input id="thumbnail_url" type="url" v-model="projectData.thumbnail_url"></md-input>
                                </md-input-container>
                                <hr v-if="projectData.thumbnail_url != ''">
                                <img v-if="projectData.thumbnail_url != ''" :src="projectData.thumbnail_url"
                                     alt="Video Thumbnail URL">
                            </div>
                            <div class="large-12 columns" v-else>
                                <img ngf-thumbnail="projectData.thumbnail_url || getDefaultImage()" class="md-card-image"
                                     style="max-width: 560px"/>
                                <br>
                                <div class="row">
                                    <div class="large-12 columns">
                                        <md-button class="md-primary" @click.native="pickArtwork">Select Thumbnail/Artwork
                                        </md-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>

                        <div class="large-12 columns">
                            <md-input-container :class="{'md-input-invalid': errors.has('completionDate')}">
                                <label for="completionDate">Year of Completion</label>
                                <md-input id="completionDate" v-model="projectData.completionDate"
                                          data-vv-name="completionDate" v-validate="'required|date_format:YYYY'"
                                          required></md-input>
                                <span class="md-error" v-show="errors.has('completionDate')">{{ errors.first('completionDate') }}</span>
                            </md-input-container>
                        </div>
                        <div class="large-12 columns">
                            <md-input-container>
                                <label>Description</label>
                                <md-textarea v-model="projectData.description" maxlength="3000"></md-textarea>
                            </md-input-container>
                        </div>
                        <template v-if="projectData.hosting_type !== 'script'">
                            <div class="large-12 columns row">
                                <div class="large-4 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('director')}">
                                        <label for="director">Director</label>
                                        <md-input id="director" v-model="projectData.director" data-vv-name="director"
                                                  v-validate="'required'" required></md-input>
                                        <span class="md-error" v-show="errors.has('director')">{{ errors.first('director') }}</span>
                                    </md-input-container>
                                </div>
                                <div class="large-4 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('writer')}">
                                        <label for="writer">Writer</label>
                                        <md-input id="writer" v-model="projectData.writer" data-vv-name="writer"
                                                  v-validate="'required'" required></md-input>
                                        <span class="md-error" v-show="errors.has('writer')">{{ errors.first('writer') }}</span>
                                    </md-input-container>
                                </div>
                                <div class="large-4 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('producers')}">
                                        <label for="producers">Producers</label>
                                        <md-input id="producers" v-model="projectData.producers" data-vv-name="producers"
                                                  v-validate="'required'" required></md-input>
                                        <span class="md-error" v-show="errors.has('producers')">{{ errors.first('producers') }}</span>
                                    </md-input-container>
                                </div>
                            </div>
                            <div class="large-12 columns">
                                <md-input-container>
                                    <label>Key Cast</label>
                                    <md-textarea v-model="projectData.keyCast"></md-textarea>
                                </md-input-container>
                            </div>
                            <fieldset class="large-12 columns row">
                                <legend style="margin-left: 20px">
                                    Video Duration <sup class="fa fa-asterisk req" aria-hidden="true"></sup>
                                </legend>
                                <div class="large-4 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('hours')}">
                                        <label for="hours">Hours</label>
                                        <md-input id="hours" type="number" v-model="runtime.hours" min="0"
                                                  data-vv-name="hours" v-validate="'required|min_value:0'"
                                                  required></md-input>
                                        <span class="md-error" v-show="errors.has('hours')">{{ errors.first('hours') }}</span>
                                    </md-input-container>
                                </div>
                                <div class="large-4 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('minutes')}">
                                        <label for="mins">Minutes</label>
                                        <md-input id="mins" type="number" v-model="runtime.mins" min="0" max="60"
                                                  data-vv-name="minutes" v-validate="'required|min_value:0|max_value:60'"
                                                  required></md-input>
                                        <span class="md-error" v-show="errors.has('minutes')">{{ errors.first('minutes') }}</span>
                                    </md-input-container>
                                </div>
                                <div class="large-4 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('seconds')}">
                                        <label for="secs">Seconds</label>
                                        <md-input id="secs" type="number" v-model="runtime.secs" min="0" max="60"
                                                  data-vv-name="seconds" v-validate="'required|min_value:0|max_value:60'"
                                                  required></md-input>
                                        <span class="md-error" v-show="errors.has('seconds')">{{ errors.first('seconds') }}</span>
                                    </md-input-container>
                                </div>
                            </fieldset>
                        </template>
                        <template v-else>
                            <div class="large-12 columns row">
                                <div class="large-6 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('writer')}">
                                        <label for="writer">Writer</label>
                                        <md-input id="writer" v-model="projectData.writer" data-vv-name="writer"
                                                  v-validate="'required'" required></md-input>
                                        <span class="md-error" v-show="errors.has('writer')">{{ errors.first('writer') }}</span>
                                    </md-input-container>
                                </div>
                                <div class="large-6 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('producers')}">
                                        <label for="producers">Producers</label>
                                        <md-input id="producers" v-model="projectData.producers" data-vv-name="producers"
                                                  v-validate="'required'" required></md-input>
                                        <span class="md-error" v-show="errors.has('producers')">{{ errors.first('producers') }}</span>
                                    </md-input-container>
                                </div>
                            </div>
                            <div class="large-12 columns">
                                <md-input-container :class="{'md-input-invalid': errors.has('pages')}">
                                    <label for="pages"># of pages</label>
                                    <md-input id="pages" type="number" v-model="projectData.runTime" min="1"
                                              data-vv-name="pages" v-validate="'required|min_value:1'" required></md-input>
                                    <span class="md-error" v-show="errors.has('pages')">{{ errors.first('pages') }}</span>
                                </md-input-container>
                            </div>
                        </template>

                        <div class="large-12 columns">
                            <h6 class="borderBottom" style="borderBoottom: 10px;">
                                Genres <sup class="fa fa-asterisk req" aria-hidden="true"></sup>
                            </h6>
                            <template v-for="(g, $index) in $root.genresList">
                                <!--<md-checkbox :value="g.id" class="">{{g.name}}</md-checkbox>-->
                                <div class="md-checkbox md-theme-default"
                                     :class="{ 'md-checked': contains('genres', g.id) }">
                                    <div class="md-checkbox-container">
                                        <input :id="'genreCheckA'+$index" type="checkbox" v-model="projectData.genres"
                                               :value="g.id">
                                    </div>
                                    <label class="md-checkbox-label" :for="'genreCheckA'+$index">{{g.name}}</label>
                                </div>
                            </template>
                            <div class="post-category">
                                <md-input-container :class="{'md-input-invalid': errors.has('type')}">
                                    <label for="projectType">Type</label>
                                    <md-select name="projectType" id="projectType" v-model="projectData.type"
                                               data-vv-name="type" v-validate="'required'" required>
                                        <md-option :value="type.id" v-for="type in $root.typesList" :key="type.id">{{type.name}}
                                        </md-option>
                                    </md-select>
                                    <span class="md-error" v-show="errors.has('type')">{{ errors.first('type') }}</span>
                                </md-input-container>
                            </div>
                            <div class="post-category">
                                <md-input-container :class="{'md-input-invalid': errors.has('language')}">
                                    <label for="language">Language</label>
                                    <md-select name="language" id="language" v-model="projectData.language"
                                               data-vv-name="language" v-validate="'required'" required>
                                        <md-option value="00000000-0000-6b6e-4371-305344643451">English</md-option>
                                        <md-subheader></md-subheader>
                                        <md-option :value="language.id" v-for="language in $root.languageList" :key="language.id">
                                            {{language.English}}
                                        </md-option>
                                    </md-select>
                                    <span class="md-error" v-show="errors.has('language')">{{ errors.first('language') }}</span>
                                </md-input-container>
                            </div>
                            <div class="post-category">
                                <md-input-container :class="{'md-input-invalid': errors.has('country')}">
                                    <label for="filmingCountry">
                                        <template v-if="projectData.hosting_type !== 'script'">Country of Filming</template>
                                        <template v-else>Country of Origin</template>
                                    </label>
                                    <md-select name="filmingCountry" id="filmingCountry" data-vv-name="country"
                                               v-validate="'required'"
                                               v-model="projectData.filmingCountry" required>
                                        <md-option :value="country.id" v-for="country in $root.countryList" :key="country.id">
                                            {{country.name}}
                                        </md-option>
                                    </md-select>
                                    <span class="md-error" v-show="errors.has('country')">{{ errors.first('country') }}</span>
                                </md-input-container>
                            </div>
                        </div>
                        <div class="large-12 columns">
                            <div class="medium-12 columns">
                                <md-checkbox id="nsfw" name="nsfw" v-model="projectData.nsfw">Contains mature content?
                                </md-checkbox>
                                <p class="help-text" id="nsfwHelpText">
                                    Mature content = Violence, Drug Use, Sexual Content, Nudity, Strong Language
                                    <br>
                                    <b>NOTE: We reserve the right to Remove content that is Excessively Violent,
                                        Pornographic, Racially Offensive, etc.</b>
                                </p>
                            </div>
                            <div class="medium-12 columns">
                                <label>Do you own the rights to this content?</label>
                                <md-button-toggle md-single class="md-primary">
                                    <md-button @click.native="projectData.copyrightOwner = true">Yes</md-button>
                                    <md-button @click.native="projectData.copyrightOwner = false">No</md-button>
                                </md-button-toggle>
                            </div>
                            <div class="medium-6 columns">
                                <md-checkbox id="unlist" name="unlist" v-model="projectData.unlist">Unlist Project
                                </md-checkbox>
                            </div>
                            <div class="medium-6 columns">
                                <md-checkbox id="critiques" name="critiques" v-model="projectData.disableCritique">
                                    Disable Critiques
                                </md-checkbox>
                            </div>
                        </div>
                        <div class="large-12 columns">
                            <md-chips v-model="projectData.tags"
                                      md-input-placeholder="Tags: (separate by pressing enter key)">
                                <template scope="chip">{{ chip.value }}</template>
                            </md-chips>
                        </div>
                        <div class="large-12 columns">
                            <button class="button expanded" type="submit" name="submit">publish now</button>
                        </div>
                    </div>
                </form>
            </template>
            <template v-if="viewState === 'edit'">
                <form @submit.stop.prevent="updateVideo()" name="NewVideoForm" novalidate>
                    <div class="row">
                        <div class="large-12 columns">
                            <md-input-container :class="{'md-input-invalid': errors.has('name')}">
                                <label for="name">Title</label>
                                <md-input id="name" v-model="projectData.name" data-vv-name="name" v-validate="'required'"
                                          placeholder="Enter your video title..." required></md-input>
                                <span class="md-error" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                            </md-input-container>
                        </div>
                        <div class="large-12 columns">
                            <h6 class="borderBottom">Choose Video/Script Method</h6>

                            <!--<p><strong>Note:</strong> Please choose one of the following ways to embed the video
								into your post, the video is determined in the order: Video Code > Video URL > Video
								File.</p>-->
                            <md-button-toggle md-single class="md-primary">
                                <md-button @click.native="projectData.hosting_type = 'script'">Script (PDF)</md-button>
                                <md-button @click.native="projectData.hosting_type = 'HTML5'">
                                    MP4 Video File. (Max Size: 1GB)
                                </md-button>
                                <md-button @click.native="projectData.hosting_type = 'youtube'" class="md-toggle">YouTube
                                    Video URL
                                </md-button>
                                <md-button @click.native="projectData.hosting_type = 'vimeo'">Vimeo Video URL</md-button>
                            </md-button-toggle>
                        </div>
                        <div class="large-12 columns">
                            <template v-if="uploadType === 1">
                                <div class="large-12 columns">
                                    <div class="padding-16">
                                        <!--<md-button class="md-fab" @click.native="pickVideo">
											<md-icon>edit</md-icon>
										</md-button>-->

                                        <input filepicker type="filepicker" onchange="" @change="onUploadSuccess"
                                               data-fp-services="computer,dropbox,video,url,googledrive,skydrive,clouddrive"
                                               data-fp-mimetype="video/*" data-fp-store-path="getUserFilmPath()"
                                               :data-fp-policy="fpPolicy" :data-fp-signature="fpSignature"
                                               data-fp-debug="true"/>


                                    </div>
                                    <!--<hr>-->
                                </div>
                            </template>
                            <template v-else-if="uploadType === 4">
                                <div class="large-12 columns">
                                    <div class="padding-16">
                                        <!--<md-button class="md-fab" @click.native="pickScript">
											<md-icon>edit</md-icon>
										</md-button>-->


                                        <input filepicker type="filepicker" onchange="" @change="onUploadSuccess"
                                               data-fp-services="computer,dropbox,url,googledrive,skydrive,clouddrive"
                                               data-fp-extension=".pdf" data-fp-store-path="getUserFilmPath()"
                                               :data-fp-policy="fpPolicy" :data-fp-signature="fpSignature"
                                               data-fp-debug="true"/>

                                        <!--<md-theme class="complete-example" md-name="orange">
											<md-button class="md-fab" :class="{ 'md-primary': done }">
												<md-icon>cloud_upload</md-icon>
												&lt;!&ndash;<md-icon v-if="done">done</md-icon>&ndash;&gt;
											</md-button>

											<md-spinner :md-size="74" :md-stroke="2.2" md-inderterminate></md-spinner>
										</md-theme>-->
                                    </div>
                                    <!--<hr>-->
                                </div>
                            </template>
                            <template v-else>
                                <div class="large-12 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('videoUrl')}">
                                        <label for="video_url">{{projectData.hosting_type.toUpperCase()}} Video URL</label>
                                        <md-input id="video_url" type="url" v-model="projectData.video_url"
                                                  data-vv-name="videoUrl" v-validate="'required|url'"
                                                  :required="uploadType == 2 || uploadType == 3"></md-input>
                                    </md-input-container>
                                </div>
                            </template>

                        </div>

                        <div class="large-12 columns">
                            <h6 class="borderBottom">Upload Thumbnail/Artwork</h6>
                        </div>
                        <div>
                            <div class="large-12 columns">
                                <md-checkbox id="uploadOwnArt" name="uploadOwnArt" v-model="uploadOwnArt">
                                    Upload your own video thumbnail/artwork ?
                                </md-checkbox>
                            </div>
                            <div class="large-12 columns" v-if="!uploadOwnArt">
                                <md-input-container>
                                    <label for="thumbnail_url">Poster Artwork/Video Thumbnail URL</label>
                                    <md-input id="thumbnail_url" type="url" v-model="projectData.thumbnail_url"></md-input>
                                </md-input-container>
                                <hr v-if="projectData.thumbnail_url != ''">
                                <img v-if="projectData.thumbnail_url != ''" :src="projectData.thumbnail_url"
                                     alt="Video Thumbnail URL">
                            </div>
                            <div class="large-12 columns" v-else>
                                <img ngf-thumbnail="projectData.thumbnail_url || getDefaultImage()" class="md-card-image"
                                     style="max-width: 560px"/>
                                <br>
                                <div class="row">
                                    <div class="large-12 columns">
                                        <md-button class="md-primary" @click.native="pickArtwork">Select Thumbnail/Artwork
                                        </md-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>

                        <div class="large-12 columns">
                            <md-input-container :class="{'md-input-invalid': errors.has('completionDate')}">
                                <label for="completionDate">Year of Completion</label>
                                <md-input id="completionDate" v-model="projectData.completionDate"
                                          data-vv-name="completionDate" v-validate="'required|date_format:YYYY'"
                                          required></md-input>
                                <span class="md-error" v-show="errors.has('completionDate')">{{ errors.first('completionDate') }}</span>
                            </md-input-container>
                        </div>
                        <div class="large-12 columns">
                            <md-input-container>
                                <label>Description</label>
                                <md-textarea v-model="projectData.description" maxlength="3000"></md-textarea>
                            </md-input-container>
                        </div>
                        <template v-if="projectData.hosting_type !== 'script'">
                            <div class="large-12 columns row">
                                <div class="large-4 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('director')}">
                                        <label for="director">Director</label>
                                        <md-input id="director" v-model="projectData.director" data-vv-name="director"
                                                  v-validate="'required'" required></md-input>
                                        <span class="md-error" v-show="errors.has('director')">{{ errors.first('director') }}</span>
                                    </md-input-container>
                                </div>
                                <div class="large-4 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('writer')}">
                                        <label for="writer">Writer</label>
                                        <md-input id="writer" v-model="projectData.writer" data-vv-name="writer"
                                                  v-validate="'required'" required></md-input>
                                        <span class="md-error" v-show="errors.has('writer')">{{ errors.first('writer') }}</span>
                                    </md-input-container>
                                </div>
                                <div class="large-4 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('producers')}">
                                        <label for="producers">Producers</label>
                                        <md-input id="producers" v-model="projectData.producers" data-vv-name="producers"
                                                  v-validate="'required'" required></md-input>
                                        <span class="md-error" v-show="errors.has('producers')">{{ errors.first('producers') }}</span>
                                    </md-input-container>
                                </div>
                            </div>
                            <div class="large-12 columns">
                                <md-input-container>
                                    <label>Key Cast</label>
                                    <md-textarea v-model="projectData.keyCast"></md-textarea>
                                </md-input-container>
                            </div>
                            <fieldset class="large-12 columns row">
                                <legend style="margin-left: 20px">
                                    Video Duration <sup class="fa fa-asterisk req" aria-hidden="true"></sup>
                                </legend>
                                <div class="large-4 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('hours')}">
                                        <label for="hours">Hours</label>
                                        <md-input id="hours" type="number" v-model="runtime.hours" min="0"
                                                  data-vv-name="hours" v-validate="'required|min_value:0'"
                                                  required></md-input>
                                        <span class="md-error" v-show="errors.has('hours')">{{ errors.first('hours') }}</span>
                                    </md-input-container>
                                </div>
                                <div class="large-4 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('minutes')}">
                                        <label for="mins">Minutes</label>
                                        <md-input id="mins" type="number" v-model="runtime.mins" min="0" max="60"
                                                  data-vv-name="minutes" v-validate="'required|min_value:0|max_value:60'"
                                                  required></md-input>
                                        <span class="md-error" v-show="errors.has('minutes')">{{ errors.first('minutes') }}</span>
                                    </md-input-container>
                                </div>
                                <div class="large-4 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('seconds')}">
                                        <label for="secs">Seconds</label>
                                        <md-input id="secs" type="number" v-model="runtime.secs" min="0" max="60"
                                                  data-vv-name="seconds" v-validate="'required|min_value:0|max_value:60'"
                                                  required></md-input>
                                        <span class="md-error" v-show="errors.has('seconds')">{{ errors.first('seconds') }}</span>
                                    </md-input-container>
                                </div>
                            </fieldset>
                        </template>
                        <template v-else>
                            <div class="large-12 columns row">
                                <div class="large-6 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('writer')}">
                                        <label for="writer">Writer</label>
                                        <md-input id="writer" v-model="projectData.writer" data-vv-name="writer"
                                                  v-validate="'required'" required></md-input>
                                        <span class="md-error" v-show="errors.has('writer')">{{ errors.first('writer') }}</span>
                                    </md-input-container>
                                </div>
                                <div class="large-6 columns">
                                    <md-input-container :class="{'md-input-invalid': errors.has('producers')}">
                                        <label for="producers">Producers</label>
                                        <md-input id="producers" v-model="projectData.producers" data-vv-name="producers"
                                                  v-validate="'required'" required></md-input>
                                        <span class="md-error" v-show="errors.has('producers')">{{ errors.first('producers') }}</span>
                                    </md-input-container>
                                </div>
                            </div>
                            <div class="large-12 columns">
                                <md-input-container :class="{'md-input-invalid': errors.has('pages')}">
                                    <label for="pages"># of pages</label>
                                    <md-input id="pages" type="number" v-model="projectData.runTime" min="1"
                                              data-vv-name="pages" v-validate="'required|min_value:1'" required></md-input>
                                    <span class="md-error" v-show="errors.has('pages')">{{ errors.first('pages') }}</span>
                                </md-input-container>
                            </div>
                        </template>

                        <div class="large-12 columns">
                            <h6 class="borderBottom" style="borderBoottom: 10px;">
                                Genres <sup class="fa fa-asterisk req" aria-hidden="true"></sup>
                            </h6>
                            <template v-for="(g, $index) in $root.genresList">
                                <!--<md-checkbox :value="g.id" class="">{{g.name}}</md-checkbox>-->
                                <div class="md-checkbox md-theme-default"
                                     :class="{ 'md-checked': contains('genres', g.id) }">
                                    <div class="md-checkbox-container">
                                        <input :id="'genreCheckA'+$index" type="checkbox" v-model="projectData.genres"
                                               :value="g.id">
                                    </div>
                                    <label class="md-checkbox-label" :for="'genreCheckA'+$index">{{g.name}}</label>
                                </div>
                            </template>
                            <div class="post-category">
                                <md-input-container :class="{'md-input-invalid': errors.has('type')}">
                                    <label for="projectType">Type</label>
                                    <md-select name="projectType" id="projectType" v-model="projectData.type"
                                               data-vv-name="type" v-validate="'required'" required>
                                        <md-option :value="type.id" v-for="type in $root.typesList" :key="type.id">{{type.name}}
                                        </md-option>
                                    </md-select>
                                    <span class="md-error" v-show="errors.has('type')">{{ errors.first('type') }}</span>
                                </md-input-container>
                            </div>
                            <div class="post-category">
                                <md-input-container :class="{'md-input-invalid': errors.has('language')}">
                                    <label for="language">Language</label>
                                    <md-select name="language" id="language" v-model="projectData.language"
                                               data-vv-name="language" v-validate="'required'" required>
                                        <md-option value="00000000-0000-6b6e-4371-305344643451">English</md-option>
                                        <md-subheader></md-subheader>
                                        <md-option :value="language.id" v-for="language in $root.languageList" :key="language.id">
                                            {{language.English}}
                                        </md-option>
                                    </md-select>
                                    <span class="md-error" v-show="errors.has('language')">{{ errors.first('language') }}</span>
                                </md-input-container>
                            </div>
                            <div class="post-category">
                                <md-input-container :class="{'md-input-invalid': errors.has('country')}">
                                    <label for="filmingCountry">
                                        <template v-if="projectData.hosting_type !== 'script'">Country of Filming</template>
                                        <template v-else>Country of Origin</template>
                                    </label>
                                    <md-select name="filmingCountry" id="filmingCountry" data-vv-name="country"
                                               v-validate="'required'"
                                               v-model="projectData.filmingCountry" required>
                                        <md-option :value="country.id" v-for="country in $root.countryList" :key="country.id">
                                            {{country.name}}
                                        </md-option>
                                    </md-select>
                                    <span class="md-error" v-show="errors.has('country')">{{ errors.first('country') }}</span>
                                </md-input-container>
                            </div>
                        </div>
                        <div class="large-12 columns">
                            <div class="medium-12 columns">
                                <md-checkbox id="nsfw" name="nsfw" v-model="projectData.nsfw">Contains mature content?
                                </md-checkbox>
                                <p class="help-text" id="nsfwHelpText">
                                    Mature content = Violence, Drug Use, Sexual Content, Nudity, Strong Language
                                    <br>
                                    <b>NOTE: We reserve the right to Remove content that is Excessively Violent,
                                        Pornographic, Racially Offensive, etc.</b>
                                </p>
                            </div>
                            <div class="medium-12 columns">
                                <label>Do you own the rights to this content?</label>
                                <md-button-toggle md-single class="md-primary">
                                    <md-button @click.native="projectData.copyrightOwner = true">Yes</md-button>
                                    <md-button @click.native="projectData.copyrightOwner = false">No</md-button>
                                </md-button-toggle>
                            </div>
                            <div class="medium-6 columns">
                                <md-checkbox id="unlist" name="unlist" v-model="projectData.unlist">Unlist Project
                                </md-checkbox>
                            </div>
                            <div class="medium-6 columns">
                                <md-checkbox id="critiques" name="critiques" v-model="projectData.disableCritique">
                                    Disable Critiques
                                </md-checkbox>
                            </div>
                        </div>
                        <div class="large-12 columns">
                            <md-chips v-model="projectData.tags"
                                      md-input-placeholder="Tags: (separate by pressing enter key)">
                                <template scope="chip">{{ chip.value }}</template>
                            </md-chips>
                        </div>
                        <div class="large-12 columns">
                            <button class="button expanded" type="submit" name="submit">update project</button>
                        </div>
                    </div>
                </form>
            </template>
        </template>
        <template v-else-if="viewState === 'verify'">
            <div class="md-display-1 text-center padding-24">
                Please verify your account so you can upload videos!
                <br>
                <md-button class="md-raised md-primary" @click.native="requestVerificationEmail">Verify Now!</md-button>
                <span>Check your spam folder too!</span>
            </div>
        </template>
        <template v-else-if="viewState === 'loading'">
            <div class="md-display-1 text-center padding-24">
                Loading
                <br>
                <md-progress md-indeterminate></md-progress>
            </div>
        </template>
        <template v-else-if="viewState === 'limit'">
            <div class="md-display-1 text-center padding-24">Oh no! Looks like you've reached the upload limit!</div>
        </template>
        <template v-else>
            <div class="md-display-1 text-center padding-24">
                You must login/register before you can upload content.
                <br>
                Join an ever growing community of indie film makers, viewers, and critics!
                <br>
                <md-button class="md-raised md-primary" @click.native="loginModal">Login / Register</md-button>
            </div>
        </template>
    </div>
</template>
<style scoped></style>
<script type="text/javascript">
    export default {
        name: 'upload',
        props: {
            isUpdate: {
                type: Boolean,
                default: false
            },
            id: {
                type: String,
            }
        },
        data(){
            return {
                viewState: 'loading',
                uploadOwnArt: null,
                user: false,
                userStats: false,
                selectedGenre: [],
                uploadType: 2,
                genresArr: [],
                files: [], //JSON.parse($window.localStorage.getItem('files') || '[]'),
                maxDate: moment().toDate(),
                projectData: {
                    name: '',
                    description: '',
                    director: '',
                    writer: '',
                    producers: '',
                    keyCast: '',
                    language: '00000000-0000-6b6e-4371-305344643451',
                    completionDate: '',
                    filmingCountry: undefined,
                    originCountry: undefined,
                    owner: null,
                    genres: [],
                    type: undefined,
                    runTime: 0,
                    thumbnail_url: '',
                    hosting_type: 'youtube',
                    video_url: '',
                    tags: [],
                    unlist: false,
                    disableComments: false,
                    disableCritique: false,
                    nsfw: false,
                    copyrightOwner: false
                },
                runtime: {
                    hours: 0,
                    mins: 0,
                    secs: 0
                },
                fpPolicy: '',
                fpSignature: ''
            }
        },
        watch: {
            'projectData.hosting_type'(val){
                switch (val) {
                    case 'HTML5':
                        this.uploadType = 1;
                        this.$nextTick(function () {
                            filepicker.constructWidget($('input[type=filepicker]'));
                        });
                        break;
                    case 'youtube':
                        this.uploadType = 2;
                        break;
                    case 'vimeo':
                        this.uploadType = 3;
                        break;
                    case 'script':
                        this.uploadType = 4;
                        this.$nextTick(function () {
                            filepicker.constructWidget($('input[type=filepicker]'));
                        });
                        break;
                }
            },
            'projectData.video_url'(val) {
                this.getThumbnailUrl(val)
            },
            'projectData.runTime'(val) {
                this.runtimeToSeconds();
            },
            'runtime': {
                handler: function (val) {
                    this.runtimeToSeconds();
                },
                deep: true
            }
        },
        methods: {
            contains(arr, string){
                return _.contains(this.projectData[arr], string);
            },
            runtimeToSeconds () {
                this.projectData.runTime = (this.runtime.hours * 3600) + (this.runtime.mins * 60) + this.runtime.secs;
            },

            getUserFilmPath () {
                return this.projectData.hosting_type === 'script' ? this.user.url_id + '/scripts/' : this.user.url_id + '/films/';
            },

            isURL (str) {
                let urlRegex = '[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)';
                let url = new RegExp(urlRegex, 'i');
                return str.length < 2083 && url.test(str);
            },

            getThumbnailUrl (url) {
                let self = this;
                if (url != null && url != '') {
                    if (url.indexOf('youtu') != -1) {
                        let video_id = url.indexOf('v=') != -1 ? url.split('v=')[1].split('&')[0] : url.split('be/')[1];
                        self.projectData.hosting_type = 'youtube';
                        self.projectData.hosting_id = video_id;
                        return self.projectData.thumbnail_url = 'https://img.youtube.com/vi/' + video_id + '/hqdefault.jpg';
                    } else if (url.indexOf('vimeo') != -1) {
                        let video_id = url.split('.com/')[1];
                        self.projectData.hosting_type = 'vimeo';
                        self.projectData.hosting_id = video_id;
                        this.$http.jsonp('https://api.vimeo.com/videos/' + video_id + '/pictures.json?callback=JSON_CALLBACK')
                            .then(res => {
                                //$http.jsonp('http://www.vimeo.com/api/v2/video/' + video_id + '.json?callback=JSON_CALLBACK').then(function (res) {
                                return self.projectData.thumbnail_url = !_.isUndefined(res.data[0].sizes[6])
                                    ? res.data[0].sizes[6] : !_.isUndefined(res.data[0].sizes[5])
                                        ? res.data[0].sizes[5] : !_.isUndefined(res.data[0].sizes[4])
                                            ? res.data[0].sizes[4] : res.data[0].sizes[3];
                            });
                    }/* else if (url.indexOf('dailymotion') != -1) {
                        let video_id = url.split('video/')[1].split('_')[0];
                        self.projectData.hosting_type = 'dailymotion';
                        self.projectData.hosting_id = video_id;
                        this.$http.get('https://api.dailymotion.com/video/' + video_id + '?fields=thumbnail_large_url')
                            .then(res => self.projectData.thumbnail_url = res.data.thumbnail_large_url);
                    }*/
                    /* else if (url.indexOf('youku') != -1) {
                     self.projectData.hosting_type = 'youku';
                     self.projectData.hosting_id = undefined;

                     } else if (url.indexOf('vine') != -1) {
                     self.projectData.hosting_type = 'vine';
                     self.projectData.hosting_id = undefined;
                     $http.get('/utils/get-vine-data.php?url=' + url).then(function (res) {
                     return self.projectData.thumbnail_url = res.data;
                     });
                     }*/
                }
            },

            validateNewVideoForm () {
                let test = true;
                let msg = 'Your project is missing:';
                if (!this.projectData.name.length) {
                    msg += 'Project Title, ';
//                    this.$root.$emit('toastMessage', );
                    test = false;
                }
                if (this.uploadType == 2 && !this.projectData.video_url.length) {
                    msg += 'Video URL, ';
                    test = false;
                }
                if (_.isUndefined(this.projectData.genres) || (_.isArray(this.projectData.genres) && !this.projectData.genres.length)) {
                    msg += 'Genres, ';
                    test = false;
                }
                if (_.isUndefined(this.projectData.type)) {
                    msg += 'Type, ';
                    test = false;
                }
                if (_.isUndefined(this.projectData.language)) {
                    msg += 'Language, ';
                    test = false;
                }
                if (this.projectData.hosting_type !== 'script') {
                    if (this.projectData.runTime == 0) {
                        msg += 'Duration';
                        test = false;
                    }
                }
                if (!test) {
                    this.$root.$emit('toastMessage', msg);
                    alert(msg);
                }
                return test;
            },

            syncGenres (bool, item) {
                if (bool) {
                    // add item
                    this.genresArr.push(item);
                } else {
                    // remove item
                    for (let i = 0; i < this.genresArr.length; i++) {
                        if (this.genresArr[i].id == item.id) {
                            this.genresArr.splice(i, 1);
                        }
                    }
                }
            },

            isCheckedGenre (id) {
                let match = false;
                for (let i = 0; i < this.genresArr.length; i++) {
                    if (this.genresArr[i].id == id) {
                        match = true;
                    }
                }
                return match;
            },

            getDefaultImage () {
                return this.projectData.hosting_type === 'script' ? 'https://cdn.filepicker.io/api/file/XFaspYLQTreMc63hx9ng' : 'https://getindiewise.com/assets/img/default_video_thumbnail.jpg'
            },

            submitNewVideo () {
                let self = this;

                this.$validator.validateAll().then(function (success) {
                    if (!success) {
                        return;
                    }

                    if (self.validateNewVideoForm()) {
                        let filmParams = {
                            name: self.projectData.name,
                            description: self.projectData.description,
                            director: self.projectData.director,
                            writer: self.projectData.writer,
                            producers: self.projectData.producers,
                            keyCast: self.projectData.keyCast,
                            completionDate: moment({year: self.projectData.completionDate}).startOf('year').format('YYYY-MM-DD HH:MM:SS'),
                            owner_id: self.projectData.owner,
                            runTime: self.projectData.runTime,
                            video_url: self.projectData.video_url,
                            thumbnail_url: (self.projectData.thumbnail_url === '' || self.projectData.thumbnail_url === null) ? self.getDefaultImage() : self.projectData.thumbnail_url,
                            hosting_type: self.projectData.hosting_type,
                            hosting_id: self.projectData.hosting_id,
                            tags: self.projectData.tags.toString(),
                            disableComments: self.projectData.disableComments || false,
                            disableCritique: self.projectData.disableCritique || false,
                            language_id: self.projectData.language,
                            filmingCountry_id: self.projectData.filmingCountry,
                            // originCountry: self.projectData.originCountry,
                            type_id: self.projectData.type,
                            unlist: self.projectData.unlist,
                            nsfw: self.projectData.nsfw,
                            copyrightOwner: self.projectData.copyrightOwner,
                            genres: self.projectData.genres
                        };

                        self.$http.post('projects', filmParams)
                            .then(function (project) {
                                console.log(project.body.data);
                                self.$root.$emit('toastMessage', 'Project Uploaded Successfully');
                                // register Action
                                window.location = '/' + project.body.data.url_id;
//                                self.$state.go('video', {url_id: project.body.data.url_id});
                                //return film;
                            }, function (err) {
                                // console.log(err);
                                alert('Failed to create new project, with error: ' + err.message);
                            });

                    } else {
                        self.$root.$emit('toastMessage', 'Please check the form!');
                    }

                }, function (error) {
                    self.$root.$emit('toastMessage', 'Please check the form for errors.');
                });

            },

            updateVideo () {
                let self = this;

                this.$validator.validateAll().then(function (success) {
                    if (!success) {
                        return;
                    }

                    if (self.validateNewVideoForm()) {
                        let filmParams = {
                            name: self.projectData.name,
                            description: self.projectData.description,
                            director: self.projectData.director,
                            writer: self.projectData.writer,
                            producers: self.projectData.producers,
                            keyCast: self.projectData.keyCast,
                            completionDate: moment({year: self.projectData.completionDate}).startOf('year').format('YYYY-MM-DD HH:MM:SS'),
                            owner_id: self.projectData.owner.id,
                            runTime: self.projectData.runTime,
                            video_url: self.projectData.video_url,
                            thumbnail_url: (self.projectData.thumbnail_url === '' || self.projectData.thumbnail_url === null) ? self.getDefaultImage() : self.projectData.thumbnail_url,
                            hosting_type: self.projectData.hosting_type,
                            hosting_id: self.projectData.hosting_id,
                            tags: self.projectData.tags.toString(),
                            disableComments: self.projectData.disableComments || false,
                            disableCritique: self.projectData.disableCritique || false,
                            language_id: self.projectData.language,
                            filmingCountry_id: self.projectData.filmingCountry,
                            // originCountry: self.projectData.originCountry,
                            type_id: self.projectData.type,
                            unlist: self.projectData.unlist,
                            nsfw: self.projectData.nsfw,
                            copyrightOwner: self.projectData.copyrightOwner,
                            genres: self.projectData.genres
                        };

                        self.$http.put('projects/' + self.id, filmParams)
                            .then(function (project) {
                                console.log(project.body.data);
                                self.$root.$emit('toastMessage', 'Project Uploaded Successfully');
                                // register Action
                                window.location = '/' + project.body.data.url_id;
//                                self.$state.go('video', {url_id: project.body.data.url_id});
                                //return film;
                            }, function (err) {
                                // console.log(err);
                                alert('Failed to create new project, with error: ' + err.message);
                            });

                    } else {
                        self.$root.$emit('toastMessage', 'Please check the form!');
                    }

                }, function (error) {
                    self.$root.$emit('toastMessage', 'Please check the form for errors.');
                });
            },

            pickArtwork (){
                let self = this;
                filepicker.pick(
                    {
                        cropRatio: 4 / 3,
                        mimetype: 'image/*',
                        services: ['CONVERT', 'COMPUTER', 'FACEBOOK', 'GOOGLE_DRIVE', 'INSTAGRAM', 'URL'],
                        conversions: ['crop', 'rotate', 'filter'],
                        customSourcePath: self.user.url_id + '/films/',
                        policy: this.fpPolicy,
                        signature: this.fpSignature
                    },
                    function (Blob) {
                        self.projectData.thumbnail_url = Blob.url + '?cache=true';
                    }
                );
            },

            pickVideo () {
                let self = this;
                filepicker.pick({
                        mimetype: 'video/mp4',
                        services: ['computer', 'dropbox', 'video', 'url', 'googledrive', 'skydrive', 'clouddrive'],
                        customSourcePath: self.user.url_id + '/films/',
                        policy: self.fpPolicy,
                        signature: self.fpSignature
                    },
                    self.onUploadSuccess, self.onUploadError, self.onUploadProgress
                );
            },

            pickScript () {
                let self = this;
                filepicker.pick({
                        extension: '.pdf',
                        services: ['computer', 'dropbox', 'url', 'googledrive', 'skydrive', 'clouddrive'],
                        customSourcePath: self.user.url_id + '/scripts/',
                        policy: self.fpPolicy,
                        signature: self.fpSignature
                    },
                    self.onUploadSuccess, self.onUploadError, self.onUploadProgress
                );
            },

            onUploadSuccess (event) {
                let Blob = event.fpfile || false;
                if (_.isObject(Blob)) {
                    this.projectData.hosting_type = this.projectData.hosting_type === 'script' ? 'script' : 'HTML5';
                    this.projectData.video_url = Blob.url + '?cache=true';
                    // self.files.push(Blob);
                    // $window.localStorage.setItem('files', JSON.stringify(self.files));
                }
            },

            onUploadError (error) {
                console.log(error.toString());
            },

            onUploadProgress (progress) {
                console.log(progress);
            },

            generateFpSecurity(){
                this.$http.get('policies/upload').then((response) => {
                    this.fpPolicy = response.body.policy;
                    this.fpSignature = response.body.signature;
                });
            }
        },
        created() {
            window.filepicker.setKey('APbjTx44SlSuCI6P58jwvz');
            let self = this;
            this.$root.$on('checkedAuthentication', function (data) {
                // User is logged in
                if (this.isAuthenticated) {
                    self.projectData.owner = self.$root.user.id;

                    // but User is not verified
                    if (this.isVerified) {
                        if (self.isUpdate) {
                            // Generate lists
                            let genresP = this.generateGenres();
                            let typesP = this.generateTypes();
                            let countriesP = this.generateCountries();
                            let languagesP = this.generateLanguages();

                            Promise.all([genresP, typesP, countriesP, languagesP]).then(() => {
                                this.$http.get('projects/' + self.id)
                                    .then((response) => {
                                        let project = response.body.data;
                                        project.tags = project.tags !== '' ? project.tags.split(/,\s*/) : [];
                                        project.type = project.type_id;
                                        project.language = project.language_id;
                                        project.genres = _.pluck(project.genres, 'id');
                                        project.filmingCountry = project.filmingCountry_id;
                                        project.completionDate = moment(project.completionDate).year();
                                        project.owner_id = _.isObject(project.owner_id) ? project.owner_id.id : project.owner_id;

                                        self.projectData = project;

                                        if (self.projectData.runTime) {
                                            let totalSeconds = self.projectData.runTime;
                                            self.runtime = {};
                                            self.runtime.hours = Math.floor(totalSeconds / 3600);
                                            totalSeconds %= 3600;
                                            self.runtime.mins = Math.floor(totalSeconds / 60);
                                            self.runtime.secs = totalSeconds % 60;
                                        }

                                        /*if (self.projectData.hosting_type === 'script' ) {
                                            self.uploadType = 2;
                                        } else {
                                            if (_.isString(self.projectData.video_url)) {
                                                self.uploadType = 2;
                                            }
                                        }*/

                                        self.viewState = 'edit';
                                        // Get FileStack Policy and Signature
                                        self.generateFpSecurity();
                                    });
                            });
                        } else {
                            this.$http.get('projects/limit')
                                .then((response) => {
                                    if (response.body.status) {
                                        self.viewState = 'upload';

                                        // Get FileStack Policy and Signature
                                        self.generateFpSecurity();
                                    } else {
                                        self.viewState = 'limit';
                                    }
                                }, (error) => console.log(error));
                        }
                    } else {
                        self.viewState = 'verify';
                    }
                } else {
                    self.viewState = false;
                }
            })
        },
        mounted(){
            if (!this.isUpdate) {
                // Generate lists
                this.generateGenres();
                this.generateTypes();
                this.generateCountries();
                this.generateLanguages();
            }
        }
    }
</script>