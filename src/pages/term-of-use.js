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
class Term extends React.Component{

    render(){

        let { classes } = this.props;

        return(<div style={{overflowY:'auto', height: '100%'}}><div className={classes.page}>
        <Typography className={classes.white} gutterBottom style={{textAlign: 'center'}} variant='display3'> TERMS OF USE </Typography>
        <Typography className={classes.white} gutterBottom style={{marginTop: '-10px',textAlign: 'center'}} variant='display4'> Quizi </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'> Last update: 7/6/18 </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'> Introduction </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'> These Terms of Use (“Tems”) together with our <a href="https://www.quizi.io/privacy-policy" className={classes.link}> Privacy Policy</a> form the entire legal Agreement (“Agreement”) between ION digital (“Quizi”, “Company”, “we” or “us”) and you as a user (“you”, “your” or “user”). This Agreement regulates the relationships arising from the use of the Quizi Website <a href="/" className={classes.link}> quizi.io</a> (“Site”) and the Quizy Services (“Service”). 
        </Typography>

        <Typography className={classes.white} gutterBottom  variant='body1'>Quizi was created to allow its users to create polls and quizzes and share it with the world. However, we strongly encourage everybody to read these Terms and Privacy prior to accessing and using our Site and/or Service</Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'> Acceptance of Terms </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'> In order to use the Service, you must firstly agree to the Terms. You may not use the Service if you do not accept the Terms. You can accept the Terms by simply using the Service. You understand and agree that Quizi will treat your use of the Service as acceptance of the Terms from that point onwards.
        </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'> You may not access or use the Site or Services without acceptance of our Terms of Use and Privacy Policy. 
        </Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'> Age restrictions  </Typography>

        <Typography className={classes.white} gutterBottom  variant='body1'>To use our Site and/or Service you must be above of 18 years old. If you haven’t reached the age of 18 yet, please immediately stop using the Site and/or Service. We reserve a right to terminate the Agreement between Quizi and an individual who is under age of 18 at our sole discretion and without prior notice to the individual. </Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Changes to Terms </Typography>
        
        <Typography className={classes.white} gutterBottom  variant='body1'>We reserve a right to, from time-to-time, introduce changes to the terms of the Agreement with or without prior notification to you. It is your sole responsibility to periodically check for any changes or updates to this Agreement. If you do not agree with the new updated version of the Agreement please stop using the Site and/or the Service.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Our Service  </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>We allow our users to create polls and quizzes share them with everybody. </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>You can access our Site and complete a poll or a quiz without registering an account. Upon completing a poll/quiz you will see your results and you will have an option to re-complete a quiz or poll. Also you will have an option to share your results via social media. Moreover, you will have a chance to register your account to redeem your IMP reward.</Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Disclaimer  </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>You acknowledge that receipt of any benefit (rewards) resulting from your participation and performance in the Quizi’s polls and quizzes depends on various factors, such as data gathering, processing and transfer, which may be within or out of our control. You expressly acknowledge and agree without any reservation that we are not liable, nor shall we become liable at any time in the future, for any event which may cause or result in the corruption of data, their incorrect collection or processing, their alteration or loss in transfer, or other malfunctions, and the consequences of such events, irrespective of whether such event is caused by us or a third party. </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>You further expressly acknowledge and agree without any reservation that your participation and performance in the Quizi’s polls and quizzes does not establish for you any legal claim or right to payment or provision of any benefit, and that any payment or other benefit received by you in connection with your participation and performance in the Quizi’s polls and quizzes is entirely voluntary on the part of Quizi.</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>You further expressly acknowledge and agree that participation or performance in the Quizi’s polls and quizzes does not convey the express or implied guarantee or promise on part of Quizi of any payment or provision of any benefit, irrespective of your conduct, performance or its result.</Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Quizi Account  </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>To use full functionality of our Service (such as redeeming your reward for completing a poll or a quiz) you will have to register a Quizi Account (“Account”). You may get access to Account by logging in through Facebook or Google plus. When you provide us with any type of your personal information such provision will covered by our <a className={classes.link} href="https://www.quizi.io/privacy-policy">Privacy Policy</a>. When you log into your Account through <a className={classes.link} href="httpss://policies.google.com/privacy">Google</a> or <a className={classes.link} href="httpss://www.facebook.com/privacy/explanation">Facebook</a> the processing of your personal information will be subjected to their Privacy Policies, so we highly recommend you to read them first prior to providing us with any information.
        </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Once you registered an Account you will get access to your dashboard. On the dashboard your completed quizzes and polls will be displayed. You may add/update your information in your Account setting. Also you may indicate your address of IMP wallet so that you will be able to get your reward directly to your IMP wallet. You will be able to withdraw your IMP through your Account, and also to see your transaction history.</Typography>
        
        <Typography className={classes.white} gutterBottom style={{border: '1px solid white',padding: 10}} variant='body1'><span style={{fontWeight: 600}}>NOTE:</span> Once you’ve registered an Account you will have an option to contact us through your Account options. While contacting us through the Account you may write us a message. We implemented this way of communication to help you resolve any issues that may arise while using our Site. Therefore, don’t include any private or sensitive information in such message. You bear whole liability for the content of such messages. </Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Third-party Services </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Quizi uses third-party services in order to perform its functions. Third-party services include, but are not limited to website operators, hosting services, analytical services etc.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Application Programming Interface (API) </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Alongside with other third-party services, we are using API. Such API’s will allow our users to convert IMP into other crypto currencies. Note, we don’t control such  API services, we merely implement such service to our Site for convenience of our users. We bear no liability for API, exchanging rates. We strongly encourage you to familiarize yourself with API’s terms of use prior to using them.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Limitation of Liability, Indemnification </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>OTHER THAN AS EXPRESSLY SET OUT IN THESE TERMS OR ADDITIONAL TERMS, QUIZI DOES NOT MAKE ANY PROMISES OR QUALITY DECLARATION ABOUT THE SERVICES RENDERED BY IT AND DOES NOT PROVIDE ANY GUARANTEES REGARDING THOSE SERVICES. </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>BY CONTINUOUSLY  USING THE WEBSITE ITS PORTALS AND SERVICES YOU EXPLICITLY CONFIRM THAT YOU UNDERSTAND AND TAKE RESPONSIBILITY AND ASSUME ALL RISKS, DIRECT OR INDIRECT, RESULTING FROM THE USE OF THE WEBSITE WITHOUT LIMITATIONS.</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>QUIZI AND ITS EMPLOYEES, MANAGEMENT, PARTNERS, SHAREHOLDERS, AND AGENTS DO NOT BEAR ANY RESPONSIBILITY FOR FAILURES OF ANY KIND OR SHUTDOWN OF THE WEBSITE RESULTING IN LOSS OF BUSINESS INFORMATION, PROFIT OR OTHER FINANCIAL LOSSES DUE TO CLAIMS OF ANY KIND, LOSSES, PETITIONS, ACTIONS OR OTHER EVENTS OCCURRING DUE TO VALIDITY OF THESE TERMS OF SERVICE INCLUDING WITHOUT LIMITATIONS THE WEBSITE NAVIGATION, USE, ACCESS TO ANY FILES OR THEIR PARTS. ALSO, ANY RIGHTS INCLUDING EVEN IN THE EVENT QUIZI WAS ADVISED OF THE THEORETICAL POSSIBILITY OF SUCH DAMAGES, IRRESPECTIVE OF WHETHER THE OCCURRING EVENT AND DAMAGE WERE THE RESULT OF INFRINGEMENT ON INTELLECTUAL OR ANY OTHER PROPERTY, BASED ON A BREACH OF LAW, NEGLIGENCE, CONTRACT LIABILITIES OR OTHER SIMILAR CASES AND SITUATIONS, OR NOT.</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>QUIZI BEARS NO LIABILITY FOR THE CORRECTNESS, COMPLETION AND UP-TO-DATENESS OF ANY INFORMATION PROVIDED BY PROVIDERS AND/OR ANY OTHER THIRD-PARTIES ON THE WEBSITE. </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>THERE MAY BE LINKS TO THIRD-PARTY WEBSITES ON THIS WEBSITE. SUCH LINKS ARE PROVIDED SOLELY FOR THE CONVENIENCE OF THE USER. QUIZI SHALL NOT BEAR ANY LIABILITY IN CASE OF ANY DAMAGES OR LOSSES, DIRECT OR INDIRECT, DUE TO A VISITATION ORIGINATING FROM QUIZI, OR TO THE USE OF SERVICES FROM THIRD-PARTY WEBSITES.</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>MOREOVER, CONSENTING TO THE TERMS OF THIS AGREEMENT, THE USER  AGREES TO INDEMNIFY, DEFEND AND HOLD QUIZI, ITS AFFILIATES AND THEIR RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, SHAREHOLDERS, PARTNERS AND AGENTS (COLLECTIVELY, THE "QUIZI PARTIES") HARMLESS FROM AND AGAINST ALL CLAIMS, LIABILITY, LOSSES, DAMAGES, COSTS AND EXPENSES (INCLUDING REASONABLE LEGAL FEES) INCURRED BY ANY QUIZI PARTY AS A RESULT OF, OR IN CONNECTION WITH, ANY BREACH OR ALLEGED BREACH BY THE USER OR ANYONE ACTING ON THE USER’S BEHALF OF ANY OF THE TERMS OF THIS AGREEMENT.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Data Protection  </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>You may generally browse our Site without submitting any of your personal information. However, to get access to all of the Site’s features and functionalities, we will ask you to register an account. Which means that you will have an option to provide certain personal information to register an account. 
        </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'> 
        Please note, that we at Quizi are applying all reasonable efforts to keep information secure. However, there is no perfect secure method of protecting information during in storage, processing etc., despite all of our efforts.
        </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>
        For more information about the procedure of information collection, processing, disclosure etc., please familiarize yourself with our Privacy Policy. We strongly encourage you to read our <a href="https://www.quizi.io/privacy-policy" className={classes.link}> Privacy Policy</a> .</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Termination of Services </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>We may limit, suspend or stop providing our Services to you if you fail to comply with these Terms.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Intellectual Property  </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Please keep in mind that all of the Site assets, including the system of organization and presentation of the materials at the Site, are the property of Quizi. These materials include but are not limited to, the design, layout, look appearance etc. Site and its materials are protected by legal and subordinate acts relating to intellectual property including but not limited to copyright laws and other similar laws.</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Unconditioned use and reproduction of the materials presented at the Site without the written permission of Quizi is prohibited.</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>You may only use the Site (including all the related materials to it) for your personal, non-commercial use. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store or transmit any of Quizi materials.</Typography>
        
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>General Representation and Warranty   </Typography>
        <Typography component="div" className={classes.white} gutterBottom  variant='body1'>You represent and warrant that:
            <ul>
                <li>your use of the Site will be in strict accordance with this Agreement and with all applicable laws and regulations (including without limitation any local laws or regulations in your country, state, city or other governmental area regarding online conduct and acceptable content, and including all applicable laws regarding the transmission of technical data exported from the US or the country in which you reside; and </li>
                <li>your use of Site will not infringe or misappropriate the intellectual property rights of any third party.</li>
            </ul>
        </Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Site Updates</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>We regularly update technical, content and other information on the Site. However, we make no claim in guaranteeing the completeness, accuracy, and compliance of the information provided at the Site. We are able to add, review or delete information, resources, and services posted on the Website.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Software and Computer Viruses</Typography><Typography className={classes.white} gutterBottom  variant='body1'>At times, Site failures may happen due to an Internet connection, software operation, data transmission, etc., and it is possible that incorrect or incomplete copy of the information contained at the Site pages may occur. Similarly, the Site pages may contain malicious code or programs infected with computer viruses.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Software and Computer Viruses</Typography><Typography className={classes.white} gutterBottom  variant='body1'>We are not responsible and bears no liabilities connected to the work of any software, the presence of any computer viruses or other elements with malicious code, the presence of destructive or unsafe files that can be distributed or otherwise affect software and hardware upon the user’s review of the Site, the access to any information on the Site, or the downloading of any files from the Site. </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Software and Computer Viruses</Typography><Typography className={classes.white} gutterBottom  variant='body1'>Quizi does not purposely distribute any kinds of viruses, however the Company strongly encourages the use of anti-virus software or other protective programs during interaction with all websites. </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Force Majeure</Typography><Typography className={classes.white} gutterBottom  variant='body1'>In no event shall Quizi be responsible or liable for any failure or delay in the performance of its obligations hereunder arising out of or caused by, directly or indirectly, forces beyond its control, including, without limitation, strikes, work stoppages, accidents, acts of war or terrorism, civil or military disturbances, nuclear or natural catastrophes or acts of God, and interruptions, loss or malfunctions of utilities, communications or computer (software and hardware) services.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Applicable Law</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>These Terms of Use shall be governed by and construed in accordance with Ukrainian law. Any disputes relating to these Terms of Use shall be subject to the exclusive jurisdiction of the courts of Ukraine.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Severability</Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Any provision of these Terms of Use that is prohibited or unenforceable in any jurisdiction shall, as to such jurisdiction, be ineffective to the extent of such prohibition or unenforceability without invalidating the remaining provisions hereof, and any such prohibition or unenforceability in any jurisdiction shall not invalidate or render unenforceable such provision in any other jurisdiction.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Assignment  </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>You may assign your rights under this Agreement to any party that consents to, and agrees to be bound by, its Terms. The Company may assign or transfer any or all of Company’s rights under these Terms of Use, in whole or in part, without obtaining user’s consent or approval.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Waiver </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Our failure or delay in exercising any right, power or privilege under these Terms shall not operate as a waiver thereof.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Headings  </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>
        Headings of provisions are for convenience only and shall not be used to limit or construe any provisions of these Terms thereof.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Contact us </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>If you have any questions in relation to these Terms of Use please feel free to contact us via email at <a className={classes.link}href="mailto:support@quizi.io">support@quizi.io</a></Typography>
        </div></div>
        )
    }
}

export default Term