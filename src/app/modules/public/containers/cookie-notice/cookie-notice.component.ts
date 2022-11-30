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
  selector: 'metutors-cookie-notice',
  templateUrl: './cookie-notice.component.html',
  styleUrls: ['./cookie-notice.component.scss'],
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
export class CookieNoticeComponent implements OnInit {
  questions = [
    {
      id: 1,
      title: 'What are cookies?',
      answer: `
        A cookie is a small file downloaded onto your computer when you access certain websites.   There is a lot of information available to help you understand what cookies are if that’s helpful.  
        <br/><br/>
        External Websites: 
        <br/>
        <a href="https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies/#cookie" target="_blank">UK's Information Commissioner's Office</a>
        <br/>
        <a href="https://www.allaboutcookies.org" target="_blank">All About Computer Cookies </a>
        <br/><br/>
        If you want to go deeper into the cookie jar, also take a look at the International Chamber of Commerce cookie guide:  <a href="https://www.cookielaw.org/wp-content/uploads/2019/12/icc_uk_cookiesguide_revnov.pdf" target="_blank">ICC UK Cookies Guide (2012)</a>.
      `
    },
    {
      id: 2,
      title: 'What type of cookies do we use?',
      answer: `
        <i>Necessary Cookies:</i>
        <br/><br/>
        <u>Cookies to log on</u>: We use cookies to remember who you are when you log on to our secure product areas or other secure areas of our website. You won't be able to log on without them. 
        <br/><br/>
        <u>Cookies to keep our site secure</u>: We use cookies to remember who you are when you log on to our secure product areas or other secure areas of our website. You won't be able to log on without them. 
        <br/><br/>
        <u>Cookies to keep manage payments</u>: We use cookies to facilitate payments for our products.  You won't be able to purchase without them. 
        <br/><br/>
        Optional Cookies: 
        <br/>
        <u>Cookies to help us improve our website and products</u>: These cookies are used to help us understand how our website and products are used.  We use this information to improve how we operate our website and products.  A good example of this is where we use Google’s analytics service to identify and count visits to our website and to see which pages people go to and what they do there.
      `
    },
    {
      id: 3,
      title: 'How about your consent?',
      answer: `
        We ask for your permission to store optional cookies. 
        <br/><br/>
        <i>Strictly necessary cookies</i>: Some cookies are “strictly necessary” to operate our website or our products, and for those we will make sure you know about them, but we don’t ask for your consent.  
        <br/><br/>
        <i>Optional cookies</i>: We use analytics cookies for our website to understand numbers of visitors and how our website is used.  You can give your consent by continuing to use our website or by clicking on the appropriate button on the banner displayed to you at the bottom of our site when you first arrive.
        <br/><br/>
        If you would like to withdraw your consent to any of these, you will need to delete, and block or disable cookies via your browser settings.  Please note that disabling cookies may affect the functionality of the website and may prevent you from being able to access certain features on the website or on our products.      
      `
    },
    {
      id: 4,
      title: 'How can you withdraw your consent?',
      answer: `
        You can withdraw your consent at any time by deleting your cookies.  You can do this by using your browser / device settings or clicking on the button at the bottom of the website and changing your settings.
      `
    },
    {
      id: 5,
      title: 'How can you manage cookies on your browser?',
      answer: `
        For help on how to clear, block or otherwise manage cookies when using the internet, we’ve included links below to the popular web browsers:
        <br/><br/>
        Apple’s Safari (desktop): <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank">Manage cookies and website data in Safari on Mac </a>
        <br/>
        Apple’s Safari (iPhone / iPad): <a href="https://support.apple.com/en-us/HT201265" target="_blank">Clear the history and cookies from Safari </a>
        <br/>
        Google’s Chrome: <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en" target="_blank">Clear, enable, and manage cookies in Chrome - Computer - Google Chrome Help </a>
        <br/>
        Microsoft’s Internet Explorer: <a href="https://support.microsoft.com/en-us/topic/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank">Delete and manage cookies</a>
        <br/>
        Microsoft’s Edge: <a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank">Microsoft Edge, browsing data, and privacy  </a>
        <br/>
        Mozilla’s Firefox: <a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank">Clear cookies and site data in Firefox | Firefox Help </a>
      `
    },
    {
      id: 6,
      title: 'Full list of cookies',
      answer: `
        For the more technical folks, we’ve listed all of the cookies we and our third parties use.  If you need more information, feel free to contact us.  
        <br/><br/>
        <strong>Cookies to log on: </strong>
        <br/>
        MEtutors cookies
        <br/><br/>
        <strong>Cookies to keep our site secure: </strong>
        MEtutors cookies
        <br/><br/>
        <strong>Cookies to help us improve our website and products:</strong>
        <br/><br/>
        These help us understand how visitors interact with our website by collecting and reporting information anonymously.  
        <br/><br/>
        <a href="https://policies.google.com/privacy" target="_blank">Google</a>: <strong>_ga</strong> is stored for 2 years.  This registers a unique ID that is used to generate statistical data on how the visitor uses the website.
        <ul>
          <li><strong>_gat</strong> is stored for 1 day or less.  These cookies control the request rate made to Google Analytics.</li>
          <li><strong>_gid</strong> is stored for 1 day or less.  This cookie is used to distinguish users.</li>
          <li><strong>_utma</strong> is stored for 729 Days.  This cookie distinguishes between users and sessions. It is used to calculate new and returning visitor statistics.</li>
          <li><strong>_utmb</strong> is stored for 1 day or less. This cookie determines new sessions and visits. </li>
          <li><strong>_utmc</strong> is stored for the website session.  This cookie enables interoperability with the older version of Google Analytics code. In this older version this was used in combination with the __utmb cookie to identify new sessions/visits for returning visitors.  </li>
          <li><strong>_utmt</strong> is stored for 1 day or less.  This cookie is used to control the request rate for the Google Analytics service, limiting the collection of data on high traffic websites. </li>
          <li><strong>_utmz</strong> is stored for 182 days.  This cookie identifies the source of traffic to the Website - so Google Analytics can tell us where visitors came from when arriving on the Website.   </li>
        </ul>
      `
    },
    {
      id: 7,
      title: 'Changes to our cookie notice',
      answer: `
        Any changes we may make to the cookie notice  in the future will be posted on this page and, where appropriate, notified to you by email. Please check this page frequently to see any updates or changes to this cookie notice.
        <br/><br/>
        <i>This Cookie Notice was last updated on 20 November 2022.</i>
      `
    },
    {
      id: 8,
      title: 'Contact',
      answer: `
        Questions, comments and requests regarding this privacy notice are welcomed and should be addressed to <a href="mailto:support@metutors.com" target="_blank">support@metutors.com.</a>
      `
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
