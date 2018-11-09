import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

export default withStyles(theme => ({
    switchBase: {
        height: 36,
        width: 48,
      }
  }),{ withTheme: true })(Switch);
  