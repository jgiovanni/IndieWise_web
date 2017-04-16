import {IRootScopeService, ISCEService} from "angular";
import {IDataService} from "../services/dataService.service";
export class ContactController {
    emails: Array<Object> = [
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
    ];
    selectedEmail: Object = null;
    description: string = '';
    form: Object = {
        to: '',
        name: '',
        email: '',
        subject: '',
        message: ''
    };

    static $inject = ['$rootScope', 'DataService', '$sce', '_'];
    constructor(private $rootScope: IRootScopeService, private DataService: IDataService, private $sce: ISCEService, private _: any) {
        let self = this;
    }

    $onInit = function () {
        this.selectedEmail = this._.contains(this._.pluck(this.emails, 'address'), this.$rootScope.$stateParams.email) ? this._.findWhere(this.emails, {address: this.$rootScope.$stateParams.email}) : null;
        this.getDescription();
    };

    getDescription () {
        let self = this;
        self.description = angular.isObject(self.selectedEmail) ? this.$sce.trustAsHtml(self.selectedEmail.description) : this.$sce.trustAsHtml('');
    }

    submitForm () {
        let self = this;
        self.form.to = self.selectedEmail.address;
        self.DataService.mail('contact', self.form).then(function (res) {
            self.$rootScope.toastMessage('Message Sent, Thank you!');
            self.form = {
                to: '',
                name: '',
                email: '',
                subject: '',
                message: ''
            };
        });
    }
}

angular.module('IndieWise.static', [])
    .component('contact', {
        templateUrl: 'static/contact.html',
        controller: ContactController,
        controllerAs: 'CC',
        bindings: {}
    });