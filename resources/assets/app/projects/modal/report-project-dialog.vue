<template>
    <md-dialog ref="ReportDialog" :md-active.sync="showReportDialog">
        <md-dialog-title>Explain Why You Are Flagging this Video</md-dialog-title>
        <md-dialog-content>
            <form id="ReportForm" novalidate @submit.prevent="throttledConfirm">
                <md-field :class="{'md-input-invalid': errors.has('name')}">
                    <label>Full Name</label>
                    <md-input v-model="name" v-validate="'required|alpha_spaces'" data-vv-name="name" placeholder="Full Name" maxlength="255" required></md-input>
                    <span class="md-error" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                </md-field>
                
                <md-field :class="{'md-input-invalid': errors.has('email')}">
                    <label>Email Address</label>
                    <md-input v-model="email" v-validate="'required|email'" data-vv-name="email" placeholder="Email Address" maxlength="255" required></md-input>
                    <span class="md-error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                </md-field>

                <md-field :class="{'md-input-invalid': errors.has('body')}">
                    <label>Explain the situation</label>
                    <md-textarea v-model="body" v-validate="'required'" data-vv-name="body" placeholder="Explain the situation" maxlength="1000" required></md-textarea>
                    <span class="md-error" v-show="errors.has('body')">{{ errors.first('body') }}</span>
                </md-field>

                <small class="help-text">We reserve the right to remove content that is Excessively Violent,
                    Pornographic, Racially Offensive,
                    Unlawful, of a Bullying Nature, Directly Harmful to any Individual, Copyright Infringement, Spam,
                    etc.
                </small>
            </form>
        </md-dialog-content>

        <md-dialog-actions>
            <md-button class="" @click.native="closeDialog">Cancel</md-button>
            <md-button class="md-accent" type="submit" form="ReportForm">Send Report</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>
<style scoped></style>
<script type="text/javascript">
    export default {
        name: 'report-project-dialog',
        props: {
            projectId: {
                type: String,
                required: true
            }
        },
        data(){
            return {
              showReportDialog: false,
                button_id: '#ReportDialogButtonA',
                name: '',
                email: '',
                body: '',
                throttledConfirm: null
            }
        },
        methods: {
            closeDialog() {
                this.showReportDialog = false;
            },
            confirm() {
                let self = this;
                this.$validator.validateAll().then((success) => {
                    if (! success) {
                        return;
                    }

                    let report = {
                        name: self.name,
                        email: self.email,
                        body: self.body,
                        project_id: self.projectId,
                    };
                    self.$http.post('report', report).then(() => {
                        self.$root.$emit('toastMessage', 'Your Report has been Sent');
                        _.extend(self, {
                            name: '',
                            email: '',
                            body: '',
                        });
                        self.errors.clear();
                        self.closeDialog();

                    });
                }, function (error) {
                    self.$root.$emit('toastMessage', 'Please check the form for errors.');
                });

            }
        },
        mounted(){
            this.$root.$on('openReportDialog', (id) => {
              this.button_id = '#' + id;
              this.$nextTick(() => {
                this.showReportDialog = true;
              });
            });
            this.throttledConfirm = _.throttle(this.confirm, 3000);
        }
    }
</script>