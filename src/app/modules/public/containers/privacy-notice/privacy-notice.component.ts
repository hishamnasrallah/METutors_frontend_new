import { Component, OnInit } from '@angular/core';

import {
  state,
  style,
  group,
  animate,
  trigger,
  transition
} from '@angular/animations';

@Component({
  selector: 'metutors-privacy-notice',
  templateUrl: './privacy-notice.component.html',
  styleUrls: ['./privacy-notice.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ opacity: '0' }))
        ])
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ opacity: '1' }))
        ])
      ])
    ])
  ]
})
export class PrivacyNoticeComponent implements OnInit {
  questions = [
    {
      id: 1,
      title: 'Who are we?',
      answer:
        '<strong>METUTORS</strong> (“we”, “our”, “us” or “<strong>METUTORS</strong>”) is committed to protecting and respecting your privacy.'
    },
    {
      id: 2,
      title: 'What do we mean by “personal information”?',
      answer: `
        We mean information relating to an identified or identifiable individual – depending upon where in the world you are, this may be referred to as “<strong>personal data</strong>” or “<strong>personally identifiable information</strong>”. 
        <br/><br/>
        Simple examples include your name, email address, and phone number. It may also include things like device identifiers and IP addresses used by you. This privacy notice describes types of personal information we may collect from or about you in particular contexts. 
        <br/><br/>
        Generally, we don’t aim to collect or process <strong>sensitive</strong> personal information (also known in some countries as “special category personal data”). That means things like health information, ethnic origin, political views and other information which is more sensitive than usual. If for some specific reason (e.g. in a recruitment context) we intend to collect any personal information of that type, we will consider carefully whether we really need it, ask you specifically in advance, and make sure you know why we believe we need it. 
      `
    },
    {
      id: 3,
      title: 'What personal information do we collect about you?',
      answer: `
        We might collect personal information about you either when you use our website, receive any services from us, provide services via our platform, contact us, attend any events (virtually or in-person), or otherwise interact with us online or in-person.   
        <br/><br/>
        The types of personal data we collect about you include:
        <ul>
        <li><strong>Identity data</strong> includes first name, maiden name, last name, username or similar identifier, marital status, title, date of birth and gender.  </li>
        <li><strong>Contact data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
        <li><strong>Profile data of students</strong> includes your username and password, purchases or orders you’ve made, your interests, preferences, feedback and survey responses.</li>
        <li><strong>Profile data of tutors</strong> includes your username and password, student bookings, your interests, preferences, feedback and survey responses.</li>
        <li><strong>Financial data</strong> includes bank account and payment card details.  </li>
        <li><strong>Transaction data</strong> includes details about payments to and from you (or your parent / guardian in the case of students).</li>
        <li><strong>Technical data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access our website or products. </li>
        <li><strong>Usage data</strong> includes information about how you use our website and platform / services.</li>
        <li><strong>Marketing and Communications data</strong> includes your preferences in receiving marketing from us and our third parties (as applicable) and your communication preferences.</li>
        <li><strong>Recruitment data</strong> includes information about you if you want to become a tutor or part of the MEtutor head office team, including information about you and your career history (such as your CV).</li>
        </ul>
      `
    },
    {
      id: 4,
      title: 'What about more sensitive data?',
      answer: `
        We have no need (except in the case of recruitment) to collect special categories of personal data. These ‘special categories’ are things like health information, ethnic origin, political views and other information which are more sensitive than usual.  
        <br/><br/>
        If we ever need to collect this, we will ask you first, and make sure you know why we need this from you. 
      `
    },
    {
      id: 5,
      title: 'What about “aggregated” or “de-identified” data?',
      answer: `
        We may collect, use and share information which is statistical or demographic data for any purpose.  This is often called “Aggregate Data”. 
        <br/><br/>
        Aggregated Data in some cases is based upon (derived from) your personal data but is not considered “personal data” at law; this is because Aggregated Data does not directly or indirectly reveal your identity. 
        <br/><br/>
        Also, if we de-identify (i.e. anonymise) your personal information so we cannot identify you from that information, we may use this data for any purpose.  
        <br/><br/>
        If we combine or connect Aggregated Data or De-Identified data with your personal information so that it can directly or indirectly identify you, we treat the combined data as personal data which will be used in accordance with this privacy notice.  
      `
    },
    {
      id: 6,
      title: 'Where do we collect your information from?',
      answer: `
        <u>When you use this website:</u>
        <br/>
        This will vary according to what you do on the website.  
        <br/><br/>
        <i>You’re just looking:</i> If you only browse our website and nothing else, we will only collect cookies. This is done with <strong>your consent</strong> except for those cookies which are absolutely necessary to operate our website. 
        <br/><br/>
        These are used to understand the number of visitors to our website and how users interact with the website. These ones are not intended to be intrusive and we are not looking to intrude on you enjoying our website. Please see our <strong><a href="/cookie-notice" target="_blank">cookie notice</a></strong> for more information.  
        <br/><br/>
        <i>You’re interested in hearing more:</i> If you provide your contact information by subscribing to our regular communications.  We’re doing this <strong>with your consent</strong>.  If you use our contact form to request an invite or to subscribe to our blog and newsletters, we collect details about who you are and which organisation you are from and the type of organisation you are. This is also done as we think there is a <strong>legitimate interest</strong> that you want us to <strong>get in touch with you.</strong>  
        <br/><br/>
        <u>When you use / sign-in to our platform:</u>
        <br/>
        When you create or otherwise login to your account with us, and related to this contact with us by phone, e-mail or otherwise, we need to collect information from you. The personal information you provide may include your name and email address.  
        <br/><br/>
        We also collect technical information, including:
        <ul>
          <li>the Internet protocol (IP) address used to connect your computer to the Internet, your login information, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform; and</li>
          <li>information about your visit, including the full Uniform Resource Locators (URL) clickstream to, through and from our site (including date and time), page response times, download errors, length of visits to certain pages, page interaction information (such as scrolling, clicks, and mouse-overs), cookies and methods used to browse away the page.</li>
        </ul>
        <br/>
        This is all collected on the basis of the <strong>legal agreement</strong> (i.e. the contract) we have in place to use our product.  
        <br/><br/>
        <u>Information received from other sources:</u>
        <br/>
        We may receive information from other sources.  These include:
        <br/><br/>
        <ul>
          <li><strong>Social media</strong>: if you interact with us on social media and provide us with your contact information, we will use this to contact you and keep you in our mailing list (unless you tell us you no longer wish to).  </li>
          <li><strong>Events and meetings</strong>: if you attend an event or meeting hosted by us or another party and you’ve agreed for your contact details to be shared with us or it is otherwise intended for us to keep in touch <i>(e.g. you’ve given one of our team your business card or contact details)</i>, we will keep you in our mailing list (unless you tell us you no longer wish to).  </li>
          <li><strong>Recruiters / Recruitment sites</strong>: where we're looking for talent to join the MEtutor’s family, we may obtain your information either from recruiters (always with your permission) or via third party sites <i>(e.g. Linked-in).</i>  </li>
        </ul>
      `
    },
    // THIS 
    {
      id: 7,
      title: 'What do we do with your personal data?',
      answer: `
        We will only use your personal information when the law allows us to, and always in a transparent and ethically sound manner.  We’ve listed the purposes and activities for using personal information, and included the lawful reasons for using the personal information in this way.  
      `
    },
    {
      id: 8,
      title: 'Do we carry out any “automated decision making”?',
      answer: `
        “Automated decision making” is essentially where a technology <i>(e.g. AI or a smart algorithm)</i> can make a decision about something without human intervention.  This is problematic when it comes to decisions about you and your information.
        <br/><br/>
        We do not use automated decision-making processes during our relationship with you.  We have very intelligent tools which use AI and decision making in the case of legal rules, but never about you.         
      `
    },
    {
      id: 9,
      title: 'Cookies',
      answer: `
        We may obtain information about your general internet usage by using cookie files stored on your computer or device (“<strong>cookies</strong>”). Cookies are text files containing small amounts of information which are downloaded to your computer or device when you visit a website. They help us to improve our site and to deliver a better and more personalized service.
        <br/><br/>
        You can find more information about how we use cookies within our <strong><a href="/cookie-notice" target="_blank">cookie notice</a></strong>.
      `
    },
    {
      id: 10,
      title: 'How we share your personal data ',
      answer: `
        We don’t share personal data unless either you’ve told us we can, it is to provide you with our products / services, we have a legal duty or reason to do so, or the law requires that we do.  
        <br/><br/>
        We may need though to share with some third parties, including:
        <ul>
          <li>In the case of student name and contact details, this will be shared with your assigned tutor (and vice-versa, Tutor information will be provided to the relevant student);</li>
          <li>Software providers we use to operate / provider who hosts our website and product <i>(e.g. Hetzner, BrainCert)</i>; </li>
          <li>Our subscription providers, so we can contact you or otherwise manage how we market our product and services (e.g. HubSpot);</li>
          <li>Our payment processing / gateway providers <i>(e.g. MePS, Hyperpay and Paypal)</i>;</li>
          <li>Our analytics provider <i>(e.g. Google, Segment and Mixpanel)</i> so we can improve our website;</li>
          <li>Our cookie management system to make sure we can collect your choices;</li>
          <li>Security and authentication management providers so we can keep our sites and product secure;</li>
          <li>Our contact form when you interact with us;</li>
          <li>With our professional advisors where we need to <i>(e.g. to deal with legal rights, claims or actions)</i>;</li>
          <li>If we decided to merge, sell or otherwise partner with another organization (and we will keep you informed about this wherever relevant and possible to do);</li>
          <li>With members of the MEtutors of companies <i>(e.g. subsidiaries and affiliated companies)</i>; or</li>
          <li>Other people and organizations when required by the law.  </li>
        </ul>    
      `
    },
    {
      id: 11,
      title: 'Sharing aggregated or anonymised data ',
      answer:
        'Where we have made your information anonymous (this means no one can ever know it was you or link it back to you), we may share it outside of MEtutors with partners such as research groups, universities, advertisers or connected sites. '
    }
  ];
  selectedQuestion?: number;
  openQuestion: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  changeOpenSelection(id: number) {
    if (this.selectedQuestion === id) {
      this.openQuestion = false;
      this.selectedQuestion = undefined;
    } else {
      this.openQuestion = true;
      this.selectedQuestion = id;
    }
  }
}
