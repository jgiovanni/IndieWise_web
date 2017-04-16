<template>
    <form @submit.stop.prevent="submitForm()" data-abide>
        <div data-abide-error class="alert callout" style="display: none;">
            <p><i class="fa fa-exclamation-triangle"></i> There are some errors in your </p>
        </div>
        <p class="help-text" v-html="description"></p>
        <md-input-container>
            <label for="department">Select a Department</label>
            <md-select id="department" v-model="selectedEmail" required>
                <option value="" selected>Select a Department</option>
                <md-option v-for="email in emails" :value="email">{{ email.title }}</md-option>
            </md-select>
        </md-input-container>
        <md-input-container>
            <md-icon>account_circle</md-icon>
            <md-input v-model="name" placeholder="Enter your name" required></md-input>
        </md-input-container>
        <md-input-container>
            <md-icon>mail</md-icon>
            <md-input type="email" v-model="email" placeholder="Enter your email" required></md-input>
        </md-input-container>
        <md-input-container>
            <md-icon>book</md-icon>
            <md-input v-model="subject" placeholder="Enter your subject" required></md-input>
        </md-input-container>
        <md-input-container>
            <md-textarea required placeholder="Your message" v-model="message"></md-textarea>
        </md-input-container>
        <md-button class="md-primary" type="submit">Send</md-button>
    </form>
</template>
<style scoped></style>
<script type="text/babel">
    export default {
        name: 'contact-form',
        data(){
            return {
                emails: [
                    {
                        title: 'Technical Support',
                        address: 'support@getindiewise.com',
                        description: 'For all your Tech Support Needs and Issues.'
                    },
                    {
                        title: 'SafeGuard',
                        address: 'safeguard@getindiewise.com',
                        description: 'IndieWise cares about the safety and well-being of its users. Contact us immediately, if you come across any inappropriate content on the site. This includes, but is not limited to: content that is Excessively Violent, Pornographic, Racially Offensive, Unlawful, of a Bullying Nature, Directly Harmful to any Individual, Copyright Infringement, Spam, etc.'
                    },
                    {
                        title: 'Marketing',
                        address: 'marketing@getindiewise.com',
                        description: 'Would you like to advertise your company to our vast and diverse audience? Would you like a featured listing of your film at the top of our Homepage for all to see? Reach out today!'
                    },
                    {
                        title: 'Awards',
                        address: 'awards@getindiewise.com',
                        description: 'So you have such an amazing project, that 5 or more Users felt like you deserve an Award for it! Congrats! We can help!'
                    },
                    {
                        title: 'Public Relations',
                        address: 'pr@getindiewise.com',
                        description: 'Reach out for any press and/or media inquiries. Also let us know if you’d like to be featured in our bi-weekly newsletter. Also stay tuned for important announcements and updates!'
                    },
                    {
                        title: 'Career Center',
                        address: 'careers@getindiewise.com',
                        description: 'Interested in joining Team IndieWise? Let us know! There are several internship opportunities available.'
                    },
                    {
                        title: 'Become a Sponsor',
                        address: 'sponsor@getindiewise.com',
                        description: 'We’ve reserved a unique spot on our homepage to showcase our amazing sponsors. If you’re interested in becoming a sponsor of IndieWise, let us know!'
                    },
                    {
                        title: 'Invest in IndieWise',
                        address: 'investors@getindiewise.com',
                        description: 'So you’d like to take the bold step of investing in IndieWise! Great choice. Let’s talk!'
                    },
                    {
                        title: 'Register for IndieWise Convention (AUG 25-27, 2017)',
                        address: 'convention@getindiewise.com',
                        description: 'Register for our Annual Convention, in Miami, FL! Registration opens on JAN 2, 2017. Over 10,000 Filmmakers from 140+ Countries will be in attendance, as we provide you with 3 days of interactive workshops, educational seminars, film screenings, VIP Receptions, a Yacht Party, and a Closing Gala.<br>Regular 3- Day Package: $150  |  VIP 3-Day Package (Including Yacht Party): $250 (450 Tickets max. To Be Sold)'
                    },
                    {
                        title: 'Feedback Center',
                        address: 'feedback@getindiewise.com',
                        description: 'We welcome any feedback you have, to help us to provide you with the very best experience! Tell us!'
                    },
                ],
                selectedEmail: null,
                description: '',
                to: '',
                name: '',
                email: '',
                subject: '',
                message: '',
                filters: null,
            }
        },
        watch: {
            'selectedEmail'(val) {
                this.description = _.isObject(val) ? val.description : '';
            }
        },
        methods: {
            handleUrlFilters(){
                let self = this;
                let filters = decodeURIComponent(location.search).substr(1).split('&');
                _.each(filters, function (filter, key, list) {
                    let arr = filter.split('=');
                    self.filters[arr[0]] = arr[1];
                });
            },
            submitForm () {
                let self = this;
                this.to = self.selectedEmail.address;
                this.$http.post('contact', {
                    to: this.to,
                    name: this.name,
                    email: this.email,
                    subject: this.subject,
                    message: this.message
                }).then(function (res) {
                    self.$root.$emit('toastMessage', 'Message Sent, Thank you!');
                    _.extend(this, {
                        to: '',
                        name: '',
                        email: '',
                        subject: '',
                        message: ''
                    });
                });
            }
        },
        mounted(){
            this.handleUrlFilters();
            this.selectedEmail = _.contains(_.pluck(this.emails, 'address'), this.filters.email) ? _.findWhere(this.emails, {address: this.filters.email}) : null;
            this.getDescription();
        }
    }
</script>