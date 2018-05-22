import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

    page:{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        overflow: 'auto',
        height: '100%',
        maxWidth: 1140,
        width: '100%',
        padding: '40px 40px'
    },


    white: {
        color: 'white',
        fontWeight: 300,
        paddingBottom: 20
    },

    enlarge: {
        fontSize: '1.5rem'
    },

    link:{
        color: '#ff4081'
    }



});

@withStyles(styles)
class Term extends React.Component{

    render(){

        let { classes } = this.props;

        return(<div className={classes.page}>
        <Typography className={classes.white} gutterBottom variant='display3'> Quizi Terms of Use </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'> This is a contract between you and the folks at ION digital (who created <a href="/" className={classes.link}> www.quizi.io </a> - “Quizi”) when you use the <a href="/" className={classes.link}>www.quizi.io</a> (“Site”) and the services and products found there (“Services”). We’re excited that you’re using Quizi and would love your feedback. We created Quizi to allow anyone to create a Poll and share it with the world. We think everyone should read this before accessing our site. </Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>This is a binding agreement </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>By accessing or using any part of the web site, you agree to become bound by the terms and conditions of this agreement. If you do not agree to all the terms and conditions of this agreement, then you may not access the Site or use any services. If these terms and conditions are considered an offer by Quizi, acceptance is expressly limited to these terms. </Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'> Who can use our Services </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'> Quizi is only for human adults and teenagers above the age of 18 years old.
        </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'> We can change our Services </Typography>

        <Typography className={classes.white} gutterBottom  variant='body1'> We may change any aspect of the service we want, or even stop it, at any time without giving you notice. We can also terminate or restrict access to it at any time, at our sole discretion. Termination of your access and use of Quizi Services shall not relieve you of any obligations arising or accruing before the termination. </Typography>

        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Your Quizi Account </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>We don’t have any account yet. If you need to create Poll, you can connect with us by mail <a className={classes.link}href="mailto:support@quizi.io">support@quizi.io</a></Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Responsibility of visitors </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>The Site doesn’t contain content that is offensive, indecent, or otherwise objectionable, as well as content containing technical inaccuracies, typographical mistakes, and other errors. The Site may also contain material that violates the privacy or publicity rights, or infringes the intellectual property and other proprietary rights, of third parties, or the downloading, copying or use of which is subject to additional terms and conditions, stated or unstated. Quizi disclaims any responsibility for any harm resulting from the use by visitors of the Site, or from any downloading by those visitors of content there posted. </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Privacy </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>When you use Quizi Services, you consent to the collection and use of information as detailed in our Privacy Policy. If you’re outside the United States, you consent to the transfer, storage, and processing of your information - including but not limited to the content you posted or transferred to the site and any personal information - to and within the United States and other countries.</Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Termination of Services </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>Quizi has the right to limit, suspend, or stop providing the Services to you if you fail to comply with these Terms. </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Copyright Infringement and DMCA Policy </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>As Quizi asks others to respect its intellectual property rights, it respects the intellectual property rights of others. Quizi deals with copyright infringement in accordance to the Digital Millennium Copyright Act. If you believe that material located on or linked to by <a className={classes.link} href="quizi.io">www.quizi.io</a> violates your copyright, you are encouraged to notify Quizi. Quizi will respond to all such notices, including as required or appropriate by removing the infringing material or disabling all links to the infringing material. Quizi will terminate a visitor’s access to and use of the Site if, under appropriate circumstances, the visitor is determined to be a repeat infringer of the copyrights or other intellectual property rights of Quizi or others. In the case of such termination, Quizi will have no obligation to provide a refund of any amounts previously paid to Quizi. The contact information for Quizi’s designated agent for receipt of notices of claimed infringement is here: ION digital Email: <a className={classes.link} href="mailto:support@quizi.io">support@quizi.io</a> </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Disclaimer of Warranties </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>The Site is provided “as is”. Quizi and its suppliers and licensors hereby disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement. Neither Quizi nor its suppliers and licensors, makes any warranty that the Site will be error free or that access thereto will be continuous or uninterrupted. If you’re actually reading this, here’s a treat. You understand that you download from, or otherwise obtain content or services through, the Site at your own discretion and risk. </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Limitation of Liability </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>In no event will Quizi, or its suppliers or licensors, be liable with respect to any subject matter of this agreement under any contract, negligence, strict liability or other legal or equitable theory for: (i) any special, incidental or consequential damages; (ii) the cost of procurement for substitute products or services; (iii) interruption of use or loss or corruption of data; or (iv) any amounts that exceed the fees paid by you to Quizi under this agreement during the twelve (12) month period prior to the cause of action. Quizi shall have no liability for any failure or delay due to matters beyond their reasonable control. The foregoing shall not apply to the extent prohibited by applicable law. </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>General Representation and Warranty </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>You represent and warrant that (i) your use of the Site will be in strict accordance with this Agreement and with all applicable laws and regulations (including without limitation any local laws or regulations in your country, state, city, or other governmental area, regarding online conduct and acceptable content, and including all applicable laws regarding the transmission of technical data exported from the United States or the country in which you reside) and (ii) your use of the Site will not infringe or misappropriate the intellectual property rights of any third party. </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Indemnification </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>You agree to indemnify and hold harmless Quizi, its contractors, and its licensors, and their respective directors, officers, employees and agents from and against any and all claims and expenses, including attorneys’ fees, arising out of your use of the Site, including but not limited to your violation of this Agreement. </Typography>
        <Typography className={classes.white + ' ' + classes.enlarge} gutterBottom  variant='title'>Miscellaneous </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>This Agreement constitutes the entire agreement between Quizi and you concerning the subject matter hereof, and they may only be modified by a written amendment signed by an authorized executive of Quizi, or by the posting by Quizi of a revised version. Except to the extent applicable law, if any, provides otherwise, this Agreement, any access to or use of the Site will be governed by the laws of the Ukraine. A waiver by either party of any term or condition of this Agreement or any breach thereof, in any one instance, will not waive such term or condition or any subsequent breach thereof. You may assign your rights under this Agreement to any party that consents to, and agrees to be bound by, its terms and conditions; Quizi may assign its rights under this Agreement without condition. This Agreement will be binding upon and will inure to the benefit of the parties, their successors and permitted assigns. </Typography>
        <Typography className={classes.white} gutterBottom  variant='body1'>It’s over. </Typography>
        </div>
        )
    }
}

export default Term