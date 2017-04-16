<template>
    <md-menu md-size="6" :md-close-on-select="false">
        <div md-menu-trigger>
            <a class="button tiny text-white"><i class="fa fa-heart"></i>Add to</a>
        </div>
        <md-menu-content>
            <md-layout md-align="center" md-gutter="16">
                <md-layout md-flex>
                    <ul class="menu vertical">
                        <li class="checkbox" v-for="(pl, $index) in sortedPlaylists">
                            <div class="md-checkbox md-theme-default" :class="{ 'md-checked': contains(model.playlistArr, pl.id) }">
                                <div class="md-checkbox-container">
                                    <input :id="'pl'+$index" type="checkbox" v-model="model.playlistArr" :value="pl.id">
                                </div>
                                <label class="md-checkbox-label" :for="'pl'+$index">{{pl.name}}</label>
                            </div>
                        </li>
                        <hr class="thin">
                        <li v-if="!newPlInput">
                            <a @click="toggleNewPlInput()" class="button tiny">
                                <i class="fa fa-plus"></i> Create new playlist
                            </a>
                        </li>
                        <li v-else>
                            <form>
                                <input type="text" v-model="model.newName" ng-maxlength="75" placeholder="Playlist Name">

                                <div class="row" style="margin-top: 5px">
                                    <div class="columns medium-6">
                                        <button class="button tiny hollow" type="button" @click="toggleNewPlInput(true)">Cancel</button>
                                    </div>
                                    <div class="columns medium-6 text-right">
                                        <button class="button tiny hollow" v-disabled="!model.newName" @click="newPlaylist()">Create</button>
                                    </div>
                                </div>
                            </form>
                        </li>
                    </ul>
                </md-layout>
            </md-layout>
        </md-menu-content>
    </md-menu>
</template>
<style scoped></style>
<script type="text/babel">
    export default {
        name: 'project-playlists',
        props: ['project'],
        data(){
            return {
                playlists: [],
                newPlInput: false,
                model: {
                    newName: null,
                    playlistArr: [],
                }
            }
        },
        computed:{
            sortedPlaylists(){
                return _.sortBy(this.playlists, '-name')
            }
        },
        methods: {
            contains(arr, string){
                return _.contains(arr, string);
            },
            toggleNewPlInput(clear) {
                this.newPlInput = !this.newPlInput;
                if (clear) {
                    this.model.newName = null;
                }
            },

            newPlaylist() {
                let self = this;
                this.checkAuth()
                    .then(function (res) {
                        self.$http.post('playlists', {name: self.model.newName, user_id: self.$root.user.id})
                            .then(function (pl) {
                                self.toggleNewPlInput(false);
                                self.model.newName = null;
                                self.playlists.push(pl.body.data);
                            }, function (error) {
                                console.log(error);
                            });
                    }, function (err) {
                        self.loginModal()
                            .then(function (res) {
                                debugger;
                            }, function (error) {
                                console.log(error);
                            });
                    });
            },

            syncPlaylists(bool, item) {
                if (bool) {
                    // add item
                    this.model.playlistArr.push(item);
                    this.$http.post('playlistItems', {playlist: item.id, project: this.project.id});
                    this.$root.$emit('toastMessage', 'Added to playlist');
                    // console.log('Added to playlist: ', item);
                } else {
                    // remove item
                    for (let i = 0; i < this.model.playlistArr.length; i++) {
                        if (this.model.playlistArr[i].id == item.id) {
                            let genreSetting = _.findWhere(this.model.playlistArr, {
                                project: this.project.id, playlist_id: item.id
                            });
                            // console.log(genreSetting);
                            if (genreSetting) {
                                this.$http.delete('PlaylistItem', genreSetting.id);
                            }
                            this.model.playlistArr.splice(i, 1);
                            this.$root.$emit('toastMessage', 'Removed from playlist');
                            // console.log('Removed from playlist: ', item);
                        }
                    }
                }
            },

            isCheckedPlaylist(id) {
                let match = false;
                for (let i = 0; i < this.model.playlistArr.length; i++) {
                    if (this.model.playlistArr[i].playlist_id == id) {
                        match = true;
                    }
                }
                return match;
            },
        },
        mounted(){
            let self = this;
            // Get playlists
            if (this.$root.user) {
                this.$http.get('playlists')
                    .then(function (res) {
                        // Check playlist items for this video
                        self.$http.get('playlistItems', { params: {
                            project: self.project.id,
                            playlists: _.pluck(res.data.playlists, 'id').toString()
                        }})
                            .then(function (resA) {
                                // console.log(resA);
                                self.model.playlistArr = resA.body.data;

                                // list playlists
                                self.playlists = res.data.playlists;
                                // console.log(scope.playlists);
                            });
                    });
            }
        }
    }
</script>