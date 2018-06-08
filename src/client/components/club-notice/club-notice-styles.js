import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    padding: 6,
  },
});

const StylesRP = props => props.render(props);

export default withStyles(styles)(StylesRP);
