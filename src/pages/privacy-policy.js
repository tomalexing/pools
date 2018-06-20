import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

    page:{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        overflow: 'auto',
        maxWidth: 1140,
        width: '100%',
        padding: '40px',
        '@media (max-width: 600px)':{
            padding: '10px'
        }
    },


    white: {
        color: 'white',
        fontWeight: 300,
        marginBottom: 20
    },
    
    enlarge: {
        fontSize: '1.5rem',
        fontWeight: 800,
    },

    link:{
        color: '#ff4081'
    }



});

@withStyles(styles)
class Privacy extends React.Component{

    render(){

        let { classes } = this.props;

        return(<div style={{overflowY:'auto', height: '100%'}}><div className={classes.page}>
        <Typography className={classes.white} gutterBottom style={{textAlign: 'center'}} variant='display3'> PRIVACY POLICY </Typography>
        <Typography className={classes.white} gutterBottom style={{marginTop: '-10px',textAlign: 'center'}} variant='display4'> Quizi </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'> Last update: 7/6/18 </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'> A word from Quizi </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Thank you for visiting Quizi.com!
        We at Quizi respect your privacy and are committed to protecting it through our compliance with this Privacy Policy. This Policy is meant to help you understand what data we collect, why we collect it and what we do with it. This way you have a right to opt-out from providing any piece of information about you at any time. This is important, that is why we hope you will take time to read it carefully. Please note, if you don’t agree with  this Policy as a whole or with any part of it, please immediately stop using the Site.
        </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>1. Introduction </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'> This Privacy Policy together with the <a href="https://www.quizi.io/term-of-use" className={classes.link}>Terms of Use</a> form the entire legal Agreement (“Agreement”) between ION digital (“Quizi”, “Company”, “we”, “us” or “our”) and you as a user (“you”, “user”). The Agreement Applies to our Internet web site located at the URL’s <a href="/" className={classes.link}> quizi.io</a> (“Site”).
        </Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>2. What types of information we collect? </Typography>
        <Typography component="div" className={classes.white} gutterBottom  variant='body1'>There are three general categories of information we collect:
        </Typography>
        <Typography component="div" className={classes.white} gutterBottom  variant='body1'>
            <ul>
                <li>Information we collect automatically;</li>
                <li>Information you give us;</li>
                <li>Information we collect from Third Parties;</li>
            </ul>
        </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>(For your convenience we provide you with bullet-points, however we also provide a full reasoning for each article. So let’s take a closer at everything.)
        </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'> 2.1. Information we collect automatically </Typography>

        <Typography className={classes.white} gutterBottom  variant='body1'> You can generally visit our Site without submitting any personally identifiable information about yourself. However, keep in mind that our Site collects certain information automatically. This information is necessary for the proper communication between you and us and to provide our services and improve its functionalities. We use automatically collected information to personalise your experience and improve our services. Such information includes: 
        </Typography>
        <Typography component="div" className={classes.white} gutterBottom  variant='body1'>
            <ul>
                <li><span style={{fontWeight: 600}}>Geolocation information.</span> When you use certain features of our SIte, we may collect information about your location using IP address or mobile device’s GPS. We collect such information to improve your experience. </li>
                <li><span style={{fontWeight: 600}}>Cookies and similar technologies.</span> We use cookies and other similar technologies. You may disable cookies at your browser settings at any time. <a href="/privacy-policy#cookies" className={classes.link}>Read more</a> about cookies further in this Policy.</li>
                <li><span style={{fontWeight: 600}}>Log information.</span> We may collect your log information.
                </li>
                <li><span style={{fontWeight: 600}}>Usage information.</span>  We may collect information about your interaction with our Site. Such information includes content you view, your searches etc.
                </li>
            </ul> 
        </Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>2.2. Information you give us
        </Typography>
        
        <Typography className={classes.white} gutterBottom  variant='body1'>To use full range of services and functionality of the Site, you will be required to register  an account. The registration of an account has a voluntary nature. You may register an account by signing up via <a className={classes.link} href="httpss://www.facebook.com/privacy/explanation">Facebook</a> or <a className={classes.link} href="httpss://policies.google.com/privacy">Google</a>. </Typography>
        <Typography component="div" className={classes.white} gutterBottom  variant='body1'>You may also choose to give us certain information:
            <ul>
                <li><span style={{fontWeight: 600}}>Name</span> - in case you are willing to contact through your account. We will ask your name to know how you are willing to be referred to. We will use your name to identify your request and to personalize answer for you.</li>
                <li><span style={{fontWeight: 600}}>Email</span> - to receive latest news from us, marketing related materials and other materials you may choose to provide us with your email address.</li>
                <li><span style={{fontWeight: 600}}>Impleum wallet address</span> - you may choose to provide us with your Impleum wallet address, so that you can receive your Impleum coins for completing quizzes.</li>
            </ul>
        </Typography>
        <Typography className={classes.white} gutterBottom style={{border: '1px solid white',padding: 10}} variant='body1'><span style={{fontWeight: 600}}>NOTE:</span> Once you’ve registered an Account you will have an option to contact us through your Account options. While contacting us through the Account you may write us a message. We implemented this way of communication to help you resolve any issues that may arise while using our Site. Therefore, don’t include any private or sensitive information in such message. You bear whole liability for the content of such messages. </Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>2.3. Information we collect from Third Parties </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>In case you decide to sign up with Facebook or Google we will collect the information that is publicly available on your Facebook/Google profile. Such information includes: full name and photo. We collect such information according to Google’s and Facebook’s Privacy Policies, so we highly recommend you to read them first prior to providing us with any information.</Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>3. How we use information we collect?</Typography>
        <Typography component="div" className={classes.white} gutterBottom  variant='body1'>Our usage of information that we collect may divided into following categories:
            <ul>
                <li>Provision, improvement and development of our Site;</li>
                <li>Prevention of fraudulent actions and creation of trusted environment;</li>
                <li>Making your experience more personalized.</li>
            </ul>
        </Typography>
        
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>3.1. Provision, improvement and development of our Site.  </Typography>
        <Typography component="div" className={classes.white} gutterBottom  variant='body1'>We use your information to:
            <ul>
                <li>Register you, so that you can use our full amount of the Site;</li>
                <li>Provide our service;</li>
                <li>Conduct researches to improve our services;</li>
                <li>Provide you with customer services;</li>
                <li>Send you support messages, updates, account notifications;</li>
                <li>Contact you to deliver certain services or information you have requested;</li>
                <li>To improve the content and general administration of the Site.</li>
            </ul>
        </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>3.2. Prevention of fraudulent actions and creation of trusted environment.</Typography>
        <Typography component="div" className={classes.white} gutterBottom  variant='body1'>We use your information to:
            <ul>
                <li>Detect and prevent fraud;</li>
                <li>Conduct security investigations;</li>
                <li>Verify your authority to use the Site;</li>
                <li>Comply with our legal obligations;</li>
                <li>Resolve any disputes with any of our users.</li>
            </ul>
        </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>3.3. Making your experience more personalized</Typography>
        <Typography component="div" className={classes.white} gutterBottom  variant='body1'>We use your information to:
            <ul>
                <li>Send you promotional messages, marketing, advertising, and other information that may be of interest to you based on your preferences, but only if you have shown your explicit consent to receive such messages. If you at some point will no longer  wish to receive these marketing materials or promotions from us, you may opt-out as set forth in the message.</li>
                <li>Personalize, measure and improve our advertising.</li>
            </ul>
        </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Please also note that if you choose not to receive marketing-related emails from us, we may still send you non-marketing important administrative messages or notifications.</Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>4. HOW WE SHARE AND DISCLOSE INFORMATION?</Typography>
        <Typography component="div" className={classes.white} gutterBottom  variant='body1'>We may share and disclose information that we collect for following reasons:
            <ul>
                <li>With your consent;</li>
                <li>Safety, legal purposes, and law enforcement;</li>
                <li>Service providers;</li>
                <li>Business transfers;</li>
                <li>Aggregated data.</li>
            </ul>
        </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>4.1. With your consent</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>In cases where you have provided your explicit consent, we may share your personal information, as described at the time of consent. Example of such usage may be when you authorize a third party website to access your Quizi account.</Typography>
        
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>4.2. Safety, Legal purposes, and Law enforcement.</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>We will disclose your personally identifiable information (a) if we are required to do so by law, regulation or other government authority or otherwise in cooperation with an ongoing investigation of a governmental authority, (b) to enforce the Quizi Terms of Use or user agreements or to protect our rights or (c) to protect the safety of users of our Site and our services.
        </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>4.3. Service providers</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>We may provide your personally identifiable information and the data generated by cookies and the aggregate information to the vendors and service agencies that we may engage to assist us in providing our services to you for their use solely to provide us with such assistance. Such third parties’ use of your personally identifiable information is subject to the third party’s Applicable privacy policy terms and we may also enter into Model Contracts for the transfer of personal data to third countries with such third party vendors and service agencies.</Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>4.4. Business transfers </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>We will not sell your personally identifiable information to any company or organization, but we may transfer your personally identifiable information to a successor entity upon a merger, consolidation or other corporate reorganization in which Quizi participates or to a purchaser or acquirer of all or substantially all of Quizi's assets to which this Site relates. In such event we will notify you before your personal information is transferred and becomes subject to a different privacy policy.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>4.5. Aggregated data.</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Through the third party analytic providers and directly through our Site, we may track information that will be maintained, used and disclosed in aggregate form only and which will not contain your personally identifiable information. For example, without limitation, the total number of visitors to our Site, the number of visitors to each page of our Site, browser type, External Web Sites (defined below) linked to and IP addresses. We may analyze this data for trends and statistics in the aggregate, and we may use such aggregate information to administer the Site, and gather broad demographic information for aggregate use.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>5. OTHER IMPORTANT INFORMATION</Typography>
        <Typography component="div" className={classes.white} gutterBottom  variant='body1'>In this section we will describe other important information that our users need to know. Such information includes:
            <ul>
                <li>Cookies related information;</li>
                <li>Children’s privacy;</li>
                <li>Link to third party sites.</li>
            </ul>
        </Typography>

        <Typography id="cookies" className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>5.1. Cookies related information</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>A cookie is a piece of data stored on the user's hard drive containing information about the user. Cookies generally do not permit us to personally identify you. We generally use session cookies to save your preferences and such cookies expire when you close your browser. We also may set a persistent cookie to authenticate users (such as for password recognition) and for support for the internal operations of our Site. Quizi may track users over time and over our Sites but we do not respond to browser do not track signals. Third parties such as providers of external services like web traffic analysis services may also track users over time and over our Site and third party websites and such third parties may also place cookies, via our Site. These cookies are likely to be analytical, performance cookies or targeting cookies, including:</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Google Analytics cookies, which in particular are used as Quizi contracts with Google as a third party vendor. You can find out more about this popular website analytics tool <a className={classes.link} href="httpss://www.google.com/analytics/index.html">here</a>.  These cookies collect information about how visitors use a website, for instance which pages visitors go to most often, and if they get error messages from web pages. These cookies don’t collect information that identifies a visitor. All information these cookies collect is aggregated and  anonymous. It is only used to improve how a website works. All of this information is anonymized. You can find out more about how it protects your data <a className={classes.link} href="httpss://support.google.com/analytics/answer/6004245">here</a>.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>5.2. Children’s privacy</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Quizi recognizes the privacy interests of children and we encourage parents and guardians to take an active role in their children's online activities and interests. The Site is not  directed to children under the age of 13. Quizi does not target its Site to children under 13. Quizi does not knowingly collect personally identifiable information from children under the age of 13. If we learn that a child under the age of 13 provided us with personally identifiable information, we will delete that information. If your child has provided personally identifiable information, please contact us so we can delete it. If you are under the age of 13, please do not provide us with any personally identifiable information.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>5.3. Link to third party sites</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>The Site may provide links to other Websites or resources over which Quizi does not have control ("External Web Sites"). Such links do not constitute an endorsement by Quizi of those External Web Sites. You acknowledge that Quizi is providing these links to you only as a convenience, and further agree that Quizi is not responsible for the content of such External Web Sites. Your use of External Web Sites is subject to the terms of use and privacy policies located on the linked to External Web Sites. We strongly encourage you to familiarize yourself with terms of use and privacy policies of External Web Sites prior to using them.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>6. WHAT ARE YOUR RIGHTS?</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>You remain in full control of your information at all times. You may exercise any of the of the rights described in this section by sending an email to support@quizi.io. Please note, that we may ask you to verify your identity before proceeding to any actions on your request.</Typography>
        <Typography component="div" className={classes.white} gutterBottom  variant='body1'>In this section we will describe other important information that our users need to know. Such information includes:
            <ul>
                <li>Manage and control your information;</li>
                <li>Rectification of inaccurate or incomplete information;</li>
                <li>Data access and portability;</li>
                <li>Data retention and right to be forgotten;</li>
                <li>Withdrawing consent and restriction of processing;</li>
                <li>Objection to processing;</li>
                <li>Lodging complaints;</li>
                <li>Automated individual decision-making.</li>
            </ul>
        </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>6.1 Manage and control your Information </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>You may access and update some of your information through your Account settings. You are responsible for keeping your personal information up-to-date. 
        </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>6.2 Rectification of Inaccurate or Incomplete Information</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'> 
        You have the right to ask us to correct inaccurate or incomplete personal information concerning you and which you cannot update yourself within your Quizi account.
        </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>6.3 Data Access and Portability</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>In some jurisdictions, Applicable law may entitle you to request copies of your personal information held by us. You may also be entitled to request copies of personal information that you have provided to us in a structured, commonly used, and machine-readable format and/or request us to transmit this information to another service provider (where technically feasible).</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>6.4 Data Retention and right to be forgotten</Typography>
        <Typography className={classes.white} gutterBottom variant='body1'>We generally retain your personal information for as long as is necessary for the provision of  our service to you and to comply with our legal obligations. If you no longer want us to use your information to provide the services to you, you can execute your right to be forgotten.  Please note that if you request the erasure of your personal information:</Typography>
        <Typography className={classes.white} gutterBottom variant='body1'>We may retain some of your personal information as necessary for our legitimate business interests, such as fraud detection and prevention and enhancing safety. For example, if we suspend an account for fraud or safety reasons, we may retain certain information from that account to prevent that user from opening a new account in the future.</Typography>
        <Typography className={classes.white} gutterBottom variant='body1'>Additionally, some copies of your information (e.g., log records) may remain in our database, but are disassociated from personal identifiers.
        Because we maintain Site to protect from accidental or malicious loss and destruction, residual copies of your personal information may not be removed from our backup systems for a limited period of time.
        </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>6.5 Withdrawing Consent and Restriction of Processing</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Where you have provided your consent to the processing of your personal information by Quizi you may withdraw your consent at any time by sending a communication to us specifying which consent you are withdrawing. Please note that the withdrawal of your consent does not affect the lawfulness of any processing activities based on such consent before its withdrawal. Additionally, in some jurisdictions, Applicable law may give you the right to limit the ways in which we use your personal information, in particular where (i) you contest the accuracy of your personal information; (ii) the processing is unlawful and you oppose the erasure of your personal information; (iii) we no longer need your personal information for the purposes of the processing, but you require the information for the establishment, exercise or defence of legal claims; or (iv) you have objected to the processing pursuant to Section 6.6 and pending the verification whether the legitimate grounds of Quizi override your own.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>6.6 Objection to Processing</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>In some jurisdictions, Applicable law may entitle you to require Quizi not to process your personal information for certain specific purposes (including profiling) where such processing is based on legitimate interest. If you object to such processing we will no longer process your personal information for these purposes unless we can demonstrate compelling legitimate grounds for such processing or such processing is required for the establishment, exercise or defence of legal claims.</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Where your personal information is processed for direct marketing purposes, you may, at any time ask us to cease processing your data for these direct marketing purposes by sending an email to <a className={classes.link}href="mailto:support@quizi.io">support@quizi.io</a>.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>6.7 Lodging Complaints</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>You have the right to lodge complaints about the data processing activities carried out by us before the competent data protection authorities.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>6.8. Automated individual decision-making</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>While using our Site you will always have an option to opt-in or to opt-out. Our Site doesn’t automatically make decisions for you.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>7. HOW DO WE SECURE INFORMATION?</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>We may employ procedural and technological measures that are generally consistent with industry practice. Such measures are reasonably designed to help protect your personally identifiable information from loss, unauthorized access, disclosure, alteration or destruction. Quizi may use encryption, secure socket layer and password protection to help prevent unauthorized access to your personally identifiable information.</Typography>
        <Typography component="div" className={classes.white} gutterBottom  variant='body1'>Moreover, we are actively monitoring and enforcing the information protection standards during all of our activities, namely:
            <ul>
                <li>Limitation of the rendered access to information only to those employees who need it for providing services to the user;</li>
                <li>Signature of non-disclosure agreements by employees;</li>
                <li>Signature by partners and external companies invited for the fulfillment of particular functions of non-disclosure agreements and agreements concerning non-usage of such information for any unauthorized purposes;</li>
                <li>Storing of the personal information obtained from the user in encrypted form, at protected servers secured from unauthorized access.</li>
            </ul>
        </Typography>

        <Typography className={classes.white} gutterBottom  variant='body1'>
        The security of your information is important to us. Nevertheless, we cannot guarantee absolute protection of your personal information. If you have a reason to believe that your interaction with us is no longer secure, please immediately notify us by contacting us in writing at <a className={classes.link}href="mailto:support@quizi.io">support@quizi.io</a>  .</Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>8. HOW DO WE UPDATE PRIVACY POLICY?</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Quizi may need to update this Privacy Policy from time to time. If so, Quizi will post our updated Privacy Policy on our Site, along with notice that the Privacy Policy has been changed so you are always aware of what personally identifiable information we may collect and how we may use this information. Quizi may also send registered users that have provided us with their email address an email notification notifying such users of any changes to the Privacy Policy. Quizi encourages you to review this Privacy Policy regularly for any changes. Your continued use of this Site and/or continued provision of personally identifiable information to us will be subject to the terms of the then-current Privacy Policy.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>9. CONTACT US</Typography><Typography className={classes.white} gutterBottom  variant='body1'>If you have any questions or complaints regarding this Privacy Policy or questions in relation to the way we handle your information please contact us via email at <a className={classes.link}href="mailto:support@quizi.io">support@quizi.io</a>.</Typography>
        </div></div>
        )
    }
}

export default Privacy