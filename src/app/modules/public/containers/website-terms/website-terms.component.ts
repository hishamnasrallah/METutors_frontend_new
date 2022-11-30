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
  selector: 'metutors-website-terms',
  templateUrl: './website-terms.component.html',
  styleUrls: ['./website-terms.component.scss'],
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
export class WebsiteTermsComponent implements OnInit {
  questions = [
    {
      id: 1,
      title: 'Who owns this website?',
      answer: `
        <strong>MEtutors</strong> owns and operates this website (<a href="https://www.metutors.com/" target="_blank">MEtutors</a>) and related websites (together “<strong>website</strong>”). 
      `
    },
    {
      id: 2,
      title: 'What are the expectations when using our website?',
      answer: `
        When you browse our website, we will assume that you will respect our wishes set out in the website terms.  If you do not agree, please do not use the website.   
      `
    },
    {
      id: 3,
      title: 'What about links we include on our website?',
      answer: `
        We sometimes include links to other websites.  Where they are not owned or operated by us, we would strongly suggest you take a look and familiarize yourself with the legal terms included on those sites including their privacy notices.  
        <br/><br/>
        As I’m sure you can appreciate, we are not responsible for the practices or the content of linked websites that are not administered by or on behalf of us.  We include them for your information and this should not be mistaken for a link or association with those third parties (unless we clearly tell you otherwise).        
      `
    },
    {
      id: 4,
      title: 'What do we do with your personal information?',
      answer: `
        We only collect your information where there is a good reason to do so and we will handle it in a legally compliant and ethical manner at all times.  
        <br/><br/>
        Please take a look at our <u><a href="/privacy-notice" target="_blank">privacy notice</a></u> for more information.
      `
    },
    {
      id: 5,
      title: 'Trademarks and copyright',
      answer: `
        All copyright in the screens and pages on this website, including all information and material in their arrangement included in this website is owned by us or licensed to MEtutors (unless otherwise noted). 
        <br/><br/>
        This means that you may imprint, copy, download or temporarily store extracts from our website for your personal information or when you use our products and services. However, you must not alter anything and any other use is not allowed unless you first get our written permission. 
        <br/><br/>
        <strong>In particular no one may use, copy or otherwise reproduce our content or a part of our website on any other website, or link any other website to our website, without our prior written permission.</strong>
        <br/><br/>
        <strong>Social Media</strong>
        <br/><br/>
        MEtutors operates channels, pages and accounts on some social media sites to inform, assist and engage with Students (<i>these are the usual suspects, such as LinkedIn and Twitter</i>).  
        <br/><br/>
        We may monitor and record comments and posts made on these channels about MEtutors so that we can improve our services.  MEtutors is not responsible for any information posted on those sites other than information we have posted ourselves. 
        <br/><br/>
        We do not endorse the social media sites themselves, or any information posted on them by third parties or other users.  When you engage with  MEtutors via social media your personal data may be stored on that social media site's servers, which are outside the control of  MEtutors and may be in the US or elsewhere outside the EU.       
      `
    },
    {
      id: 6,
      title: 'Which law applies?',
      answer: `
      The terms are governed by and interpreted in accordance with the laws of England and Wales and the courts of England and Wales will have non-exclusive jurisdiction in respect of any dispute, which may arise.
      <br/><br/>
      We hope this would never arise, but like any person or company,  MEtutors reserves its right to bring legal proceedings to the courts of the country of your location where a breach of our terms occurs.
      <br/><br/>
      To make sure that these terms are enforceable, we should add that should any part of the website terms be determined by any competent authority to be invalid, unlawful or unenforceable to any extent, that term (or terms) shall be severed from the rest of the terms.  The remaining terms shall continue to be valid and enforceable to the fullest extent permitted by law. 
      `
    },
    {
      id: 7,
      title: 'Changes to these website terms',
      answer: `
        Any changes we may make to these website terms in the future will be posted on this page and, where appropriate, notified to you by email. Please check this page frequently to see any updates or changes.
        <br/><br/>
        <i>These website terms were last updated on 20 November 2022.</i>
      `
    },
    {
      id: 8,
      title: 'Contact',
      answer: `
        Questions, comments and requests regarding these website terms are welcomed and should be addressed to <a href="mailto:support@metutors.com" target="_blank">support@metutors.com</a> or use our contact form. 
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
