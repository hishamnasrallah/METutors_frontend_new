import { AfterViewInit, Component, OnInit } from '@angular/core';

import { environment } from '@environment';

let CookieControl: any;

@Component({
  selector: 'metutors-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit {
  myDate = new Date();

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // cookies
    const config = {
      apiKey: environment.cookieKey,
      product: 'community',
      position: 'LEFT',
      theme: 'DARK',
      text: {
        // main preference panels
        title: 'MEtutors uses cookies to store information on your computer.',
        intro:
          'Some of these cookies are essential, while others help us to ' +
          'improve your experience by providing insights into how ' +
          'the site is being used.',
        acceptSettings: 'Accept Recommended Settings',
        rejectSettings: 'I Do Not Accept',
        necessaryTitle: 'Necessary Cookies',
        necessaryDescription:
          'Necessary cookies enable core functionality ' +
          'such as page navigation and access to secure areas. ' +
          'The website cannot function properly without ' +
          'these cookies, and can only be disabled by changing ' +
          'your browser preferences.',
      },
      statement: {
        description:
          'For more detailed information on the cookies we use, please check our',
        name: 'Privacy Policy',
        url: 'https://metutors.com/privacy-policy',
        updated: '29/11/2022',
      },
    };

    CookieControl.load(config);
  }
}
