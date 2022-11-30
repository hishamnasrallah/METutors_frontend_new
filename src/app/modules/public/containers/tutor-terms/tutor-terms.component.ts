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
  selector: 'metutors-tutor-terms',
  templateUrl: './tutor-terms.component.html',
  styleUrls: ['./tutor-terms.component.scss'],
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
export class TutorTermsComponent implements OnInit {
  questions = [
    {
      id: 1,
      title: 'What are you agreeing to?',
      answer: `
        Our terms of service for tutors ("<strong>Tutor Terms</strong>") are entered into by us ("<strong>Tutor</strong>", “<strong>you</strong>” or “<strong>your</strong>”).
        <br/><br/>
        These Tutor Terms govern your access to and use of our platform (the “Platform”) where you shall provide tutoring and associated educational support to students via the Platform (the “Tutoring Services”) and sets out what we ask of you, and what you can expect from us and your tutor(s).   These should be read in conjunction with our <strong><a href="/community-terms" target="_blank">Community terms</a></strong> and <strong><a href="/website-terms" target="_blank">Code of Conduct</a></strong>.  
        <br/><br/>
        <strong>What are the eligibility requirements?</strong>
        <br/><br/>
        The Tutoring Services (including access to the Platform) is available to you if you meet the <strong>eligibility requirements</strong> to be a tutor with MEtutors. If you don’t meet the eligibility requirements or otherwise fail to meet our pre-onboarding checks, you will not be able to act as a Tutor on our Platform. 
        <br/><br/>
        <i>Eligibility requirements</i>:  Our tutors are required to:
        <ul>
          <li>be self-employed education professionals that are part of the MEtutor’s network of tutors that may be available to provide you with Tutoring Services; </li>
          <li>be suitably qualified to provide the relevant Services; </li>
          <li>for each assignment, determine whether or not you are qualified and capable of completing a particular tutoring assignment. </li>
        </ul>
        <br/>
        You may register for an account on our Platform as a Tutor regardless of where you live in the world. 
      `
    },
    {
      id: 2,
      title: 'What are we providing you with?',
      answer: `
        <i>Scope of License to use the Platform</i>: We grant you a limited, non-exclusive, non-sublicensable, non-transferable, and revocable license to access and use the Platform to allow you (and only you) to provide Tutoring Services.  This includes to match with and provide Tutoring Services to Students registered on the Platform.  
        <br/><br/>
        <i>Modifications to the Platform</i>: We reserve the right at any time to modify or discontinue, temporarily or permanently, the Platform (or any part thereof), but will always seek to keep you updated and informed of any such plans to do so. You agree that MEtutors shall not be liable to you or any third party for any modification, suspension or discontinuance of the Platform.
        <br/><br/>
        <i>Access to Students</i>:  MEtutors connects tutors with our students via our Platform to provide Tutoring Services.  
      `
    },
    {
      id: 3,
      title: 'What are Intellectual Property Rights?',
      answer: `
        <i>“Intellectual Property Rights”</i> are current and future worldwide rights under patent, copyright, trade secret, trademark, and moral rights laws, and other similar rights.
        <br/><br/>
        <i>What’s yours is yours, and what’s ours is ours</i>: These Tutor Terms do not grant either party any rights, implied or otherwise, to the other's content or any of the other's intellectual property. As between the parties, you own all Intellectual Property Rights in content you provide, and MEtutors owns all Intellectual Property Rights in the Platform and the Service.
        <br/><br/>
        All copyright in the screens and pages on the Platform, including all recordings of sessions, information and material in their arrangement included in the Platform is owned by or licensed to us (unless otherwise noted). No one may use, copy, or otherwise reproduce our content or a part of our Platform without our prior written permission.
        <br/><br/>
        <strong>Intellectual property rights in content provided to/in the Platform</strong>
        <br/><br/>
        <i>Scope of License to use the content</i>: We grant you a limited, non-exclusive, non-sublicensable, non-transferable, and revocable license to access and use the Platform only for your own internal use (or, for the purpose of providing Services to students connected via the Platform), and only in a manner that complies with all legal requirements that apply to you or your use of the content included within the Platform. 
        <br/><br/>
        <i>Content provided by you</i>: By providing any content to MEtutors, you grant to MEtutors and any students on the Platform with whom you provide Services to with a worldwide, non-exclusive, royalty-free, transferable, sublicensable license to use that content (including to reproduce, distribute, modify, and/or display it) for the purpose of operating the Platform and providing Services to students.  The license granted by you continues until the content is removed and once removed, the license will terminate, except where the content is being used by MEtutors or such students prior to your removal of the content.   
      `
    },
    {
      id: 4,
      title: 'What do we ask of you?',
      answer: `
        <i>Registration and Set-up</i>: To access the Platform, you will need to register for a MEtutors user account. We will need you to provide us with accurate, complete, and current information about you and as you’d expect, would ask that you make sure your username and password is kept secret and you regularly change.  We’ve created guidance to support you with this process: <strong><a href="/signup" target="_blank">here</a></strong>. 
        <br/><br/>
        <i>Unauthorized Use</i>: If you become aware of any unauthorized user or access to your account, we request that you notify us at <a href="mailto:support@metutors.com" target="_blank">support@metutors.com</a>.   MEtutors will not be liable for any loss, damages, liability, expenses or legal fees that you may incur as a result of someone else using your password or account, either with or without your knowledge and/or authorisation. 
        <br/><br/>
        <i>Content</i>: You will ensure that your content will not violate any of our policies or any applicable law. You are solely responsible for the development, content, operation, maintenance, and use of your content.
        <br/><br/>
        <i>Acceptable Use</i>: when using the Platform and providing Services, you must comply at all times with our <strong><a href="/community-terms" target="_target">Community terms</a></strong> and <strong><a href="/website-terms" target="_target">Code of Conduct</a></strong> and you are not permitted to do any of the following:
        <ul>
          <li>access, tamper with, or use non-public areas of the Platform, MEtutor’s computer systems, or the technical delivery systems of MEtutor’s providers and any tutors providing you with services;</li>
          <li>probe, scan, or test the vulnerability of any system or network or breach or circumvent any security or authentication measure;</li>
          <li>access or search the Platform by any means other than MEtutor’s publicly supported interfaces (for example, “scraping”);</li>
          <li>attempt to disrupt or overwhelm our infrastructure by intentionally imposing unreasonable requests or burdens on our resources (e.g. using “bots” or other automated systems to send requests to our servers at a rate beyond what could be sent by a human user during the same period of time); </li>
          <li>interfere with or disrupt the access of any user, host or network, including, without limitation, by sending a virus, overloading, flooding, spamming, mail-bombing the Platform; or</li>
          <li>use the Platform to carry out, promote or support:
            <ul>
              <li>any unlawful or fraudulent activities;</li>
              <li>the impersonation of another person or entity or the misrepresentation of an affiliation with a person or entity in a manner that does or is intended to mislead, confuse, or deceive others; or</li>
              <li>activities that are defamatory, libelous or threatening, constitute hate speech, harassment, or stalking.  </li>
            </ul>
          </li>
        </ul>
        <br/>
        As I’m sure you’d expect, MEtutors reserves the right to take any remedial action it deems appropriate and/or necessary, including immediately suspending or terminating your account or your access to the Platform, upon notice and without liability to MEtutors should you fail to abide by the requirements.  
      `
    },
    {
      id: 5,
      title: 'How do I get paid?',
      answer: `
        <i>Fees due and payment value</i>: Tutors will be able to view within the Platform the number of teaching hours provided and therefore the value earned for the relevant period of time (“<strong>Fees</strong>”).  Tutors shall be required to confirm or dispute the proposed Fee for each period as shown within the Platform.  If disputed, MEtutors shall review the payment and shall review and respond to the Tutor within 5 business days with its determination.  
        <br/><br/>
        <i>Confirmed Fees</i>:  For any undisputed / confirmed Fees and following the Tutor requesting payment of the unpaid Fees, MEtutors shall issue payment of the unpaid Fees <strong>within 3 business days</strong> following receipt of request to pay.  Payment of Fees should reach the allocated bank account within the relevant time periods depending upon the method of payment and recipient bank account.  
        <br/><br/>
        <i>Frequency of payment of Fees</i>:  Tutors shall be entitled to request payment of Fees every 14 days.  
        <br/><br/>
        <i>Currency of payment of Fees</i>:  Unless otherwise agreed in writing with MEtutors, all payment of fees shall be made in US Dollars (USD $).  If the recipient does not have a US dollar account, the Fees shall be converted into the applicable currency (at the then prevailing foreign exchange rate) and payment will be made less any applicable conversion fees which shall be met by the Tutor and deducted prior to payment.  
        <br/><br/>
        <i>Taxes</i>: the Tutor is responsible for their own taxes, and MEtutors shall pay any Fees due less any applicable reduction for taxes. 
        <br/><br/>
        <i>Queries or disputes</i>: In the event of any disputes of Fees, these should be escalated by contacting <a href="mailto:support@metutors.com" target="_blank">support@metutors.com</a>.
      `
    },
    {
      id: 6,
      title: 'My MEtutors account',
      answer: `
        <strong>Term and Termination</strong>
        <br/><br/>
        Your account with MEtutors shall commence upon the date of registering to become a tutor on our Platform (“<strong>Effective Date</strong>”) and shall continue for until:
        <br/>
        <ol>
          <li>either party cancels your account, in which case you’re expected to cease providing any Tutoring Services with immediate effect; or</li>
          <li>otherwise terminated in accordance with the provisions of these Tutor Terms.</li>
        </ol>
        <br/>
        Without affecting any other right or remedy available to it, either party may terminate with immediate effect by giving written notice to the other party if:
        <br/>
        <ol>
          <li>the other party commits a material breach of any other term of these Tutor Terms which breach is irremediable or (if such breach is remediable) fails to remedy that breach within a period of 30 days after being notified in writing to do so;</li>
          <li>the other party repeatedly breaches any of the terms of these Tutor Terms in such a manner as to reasonably justify the opinion that its conduct is inconsistent with it having the intention or ability to give effect to the terms of these Tutor Terms;</li>
          <li>the other party suspends, or threatens to suspend, payment of its debts or is unable to pay its debts as they fall due or admits inability to pay its debts or is deemed unable to pay its debts.</li>
        </ol>
        <br/>
        MEtutors may terminate with immediate effect by giving written notice to you if:
        <br/>
        <ol>
          <li>you breach the <strong><a href="/community-terms" target="_target">Community terms</a></strong> and/or <strong><a href="/website-terms" target="_target">Code of Conduct</a></strong>; </li>
          <li>are found to have committed any conduct which does not adhere to the values and expectations of MEtutors and the wider teaching community.  </li>
        </ol>
        <br/>
        On termination for any reason:
        <br/>
        <ol>
          <li>all licenses granted under these Terms shall immediately terminate and the Tutor shall immediately cease all use Platform and cease providing any further Tutoring Services;</li>
          <li>the Tutor shall return and make no further use of any equipment, property, documentation and other items (and all copies of them) belonging to MEtutors, and shall assist MEtutors (including by granting access to its equipment and/or premises, where necessary and subject to having received prior reasonable written notice) as may be reasonably required to do so; and</li>
          <li>any rights, remedies, obligations or liabilities of the parties that have accrued up to the date of termination, including the right to claim damages in respect of any breach of the agreement which existed at or before the date of termination shall not be affected or prejudiced.</li>
        </ol>
      `
    },
    {
      id: 7,
      title: 'What information do we collect?',
      answer: `
        When you provide the Tutoring Services (including using our Platform), you provide us and Students with information about you to allow us to set up your user profile and to enable you to provide Services and use the Platform.  
        <br/><br/>
        What about “<i>personal information</i>”? When you set up an account with MEtutors and provide information about you, we collect personal information about tutors to enable us to match you with our students.  We collect and process this to provide you with access to Platform and provide Tutoring Services.  We’ve set out more information about this within our <strong><a href="/privacy-notice" target="_blank">Privacy notice</a></strong>.
      `
    },
    {
      id: 8,
      title: 'What happens if something goes wrong?',
      answer: `
        <i>Support</i>: please contact us at: <a href="mailto:support@metutors.com" target="_blank">support@metutors.com</a>.
      `
    },
    {
      id: 9,
      title: 'Other important legal information',
      answer: `
        <i>Not a school</i>: MEtutors is a platform to connect you with students so that you can assist them in your studies.  MEtutors are not tutors, we are not a school or education institution and as such we do not employ Tutors or otherwise hold ourselves out as being a school, education institution or teaching professional.  MEtutors connects you to students via our Platform as an intermediary only.  
        <br/><br/>
        <i>Our obligations if something unfortunate happens</i>: If we fail to comply with these Tutor Terms, we are responsible for loss or damage that you suffer that is a foreseeable result of our breach of these Tutor Terms or our negligence, but we are not responsible for any loss or damage that is not foreseeable. Loss or damage is foreseeable if it is an obvious consequence of our breach or if it was an order that was accepted.  We have no liability to you for any loss of profit, loss of business, interruption or loss of business opportunity based on your use of or reliance on the Platform or Services. We do not exclude or limit in any way our liability to you where it would be unlawful for us to do so. This includes liability for death or personal injury caused by our negligence or the negligence of our employees, agents or subcontractors (including tutors), for fraud or fraudulent misrepresentation and for breach of your legal rights in relation to the Platform and Services.
        <br/><br/>
        <i>Indemnification to us</i>: You will defend and indemnify MEtutors against any claims, actions, proceedings, losses, damages, expenses and costs (including without limitation court costs and reasonable legal fees) arising out of or in connection with your use of the Platform and provision of the Tutoring Services. This includes any content you provide to the Platform and providing Tutoring Services to the Students, including without limitation any violation of intellectual property rights attributed to any third parties from the content you have provided to the Platform.  
        <br/><br/>
        <i>Indemnification to you</i>: MEtutors shall defend you against any claim that the Platform infringes any United Kingdom patent effective the date of when you subscribe to use the Platform, copyright, trade mark, database right or right of confidentiality, and shall indemnify you for any amounts awarded against you in judgment or settlement of such claims, provided that: MEtutors is given prompt notice of any such claim; you provide reasonable co-operation to MEtutors in the defense and settlement of such claim, at MEtutor’s expense; and MEtutors is given sole authority to defend or settle the claim.
      `
    },
    {
      id: 10,
      title: 'Confidentiality',
      answer: `
        Each party may be given access to confidential information from the other party in order to perform its obligations under these Terms (“Confidential Information”). A party’s Confidential Information shall not be deemed to include information that: 
        <br/><br/>
        <ol>
          <li>is or becomes publicly known other than through any act or omission of the receiving party;</li>
          <li>was in the other party’s lawful possession before the disclosure;</li>
          <li>is lawfully disclosed to the receiving party by a third party without restriction on disclosure; orin the other party’s lawful possession before the disclosure;</li>
          <li>is independently developed by the receiving party, which independent development can be shown by written evidence.</li>
        </ol>
        <br/>
        Each party shall hold the other’s Confidential Information in confidence and not make the other’s Confidential Information available to any third party save as is necessary for the performance of the party’s obligations set out in these Terms, or use the other’s Confidential Information for any purpose other than as set out in these Terms. Please refer to our <strong><a href="/privacy-notice" target="_blank">Privacy notice</a></strong> for more information.
        <br/><br/>
        Each party shall take all reasonable steps to ensure that the other’s Confidential Information to which it has access is not disclosed or distributed by its employees or agents in violation of these Terms.
        <br/><br/>
        Notwithstanding the above, a party may disclose Confidential Information to the extent such Confidential Information is required to be disclosed by law, by any governmental or other regulatory authority or by a court or other authority of competent jurisdiction, provided that, to the extent it is legally permitted to do so, it gives the other party as much notice of such disclosure as possible and, where notice of disclosure is not prohibited and is given in accordance with this clause, it takes into account the reasonable requests of the other party in relation to the content of such disclosure.
        <br/><br/>
        Neither party shall be responsible for any loss, destruction, alteration or disclosure of Confidential Information caused by any third party.
        <br/><br/>
        You acknowledge that details of the Platform (including the user interface, documentation and MEtutor’s business model), any recordings from classes, the Services, the learning, these Tutor Terms and MEtutor’s network of tutors and students, constitute MEtutor’s Confidential Information.
        <br/><br/>
        MEtutors acknowledges that your data is the Confidential Information of you save that this shall be without prejudice to any licenses granted.
        <br/><br/>
        No party shall make, or permit any person to make, any public announcement concerning these Terms without the prior written consent of the other parties (such consent not to be unreasonably withheld or delayed), except as required by law, any governmental or regulatory authority (including, without limitation, any relevant securities exchange), any court or other authority of competent jurisdiction.
      `
    },
    {
      id: 11,
      title: 'What about the other legal bits? ',
      answer: `
        <i>Acts outside of our control</i>: MEtutors shall have no liability to you under these Tutor Terms if it is prevented from or delayed in performing its obligations under these Tutor Terms, or from carrying on its business, by acts, events, omissions or accidents beyond its reasonable control, including, without limitation, strikes, lock-outs or other industrial disputes (whether involving the workforce of MEtutors, tutors on the Platform or any other party), failure of a utility service or transport or telecommunications network, act of God, war, riot, civil commotion, public health disaster including pandemics, infectious diseases and viruses, malicious damage, compliance with any law or governmental order, rule, regulation or direction, accident, breakdown of plant or machinery, fire, flood, storm or default of suppliers or subcontractors or tutors, provided that the Tutor is notified of such an event and its expected duration.
        <br/><br/>
        <i>Unless we tell you, we haven’t waived our rights (no waiver)</i>: If we ever fail to insist that you perform any obligations under these Tutor Terms, or if we do not enforce our rights against you, or if we delay in doing so, that will not mean that we have waived such rights and will not mean that you do not have to comply with your obligations (unless we explicitly inform you of this in writing).  
        <br/><br/>
        <i>Severability</i>:  To make sure that these Tutor Terms are enforceable, we should add that should any part of these Student Terms be determined by any competent authority to be invalid, unlawful or unenforceable to any extent, that term (or terms) shall be severed from the rest of the terms. The remaining terms shall continue to be valid and enforceable to the fullest extent permitted by law.
        <br/><br/>
        <i>Formal notices</i>:  we will share with you any notices via email (to valid email addresses we know to be correct).  If you give us notice, you should address this to <a href="mailto:legal-notices@metutors.com" target="_blank">legal-notices@metutors.com</a>.   
        <br/><br/>
        <i>Third Party Rights</i>: These Tutor Terms do not confer any rights on any person or party (other than the parties to these Tutor Terms and, where applicable, their successors and permitted assigns).
      `
    },
    {
      id: 12,
      title: 'Which law applies? ',
      answer: `
        These Terms are governed by and interpreted in accordance with the laws of England and Wales.  The courts of England and Wales will have non-exclusive jurisdiction in respect of any dispute, which may arise.   However, this shall not deprive you of the mandatory consumer protections under the law of the country to which you receive tutoring services from where you have habitual residence (<i>i.e. where you live and are using MEtutors from</i>). With respect to jurisdiction, if the courts of England and Wales are impractical for you, you and MEtutors agree to choose the courts of the country to which we direct services where you have habitual residence for all disputes arising out of or relating to these Terms, or in the alternative, you may choose the responsible court in England and Wales.
        <br/><br/>
        We hope this would never arise, but like any person or company, we reserve our right to bring legal proceedings to the courts of the country of your location where a breach of our Tutor Terms occurs.
        <br/><br/>
        <strong>Version history</strong>
        <br/><br/>
        <i>Current version: 20 November 2022</i>.
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
