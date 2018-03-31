import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import marked from 'marked';

const renderer = new marked.Renderer();

renderer.link = (href, title, text) => `<a target="new" href="${href}">${text}</a>`;

const propTypes = {
  content: PropTypes.string,
  contentLabel: PropTypes.string,
};

const defaultProps = {
  content: '',
  contentLabel: '',
};

const styles = theme => ({
  root: {
    display: 'column',
  },
  boxLabel: {
    ...theme.typography.body1,
    color: theme.palette.secondary.dark,
    marginLeft: 10,
  },
  boxData: {
    ...theme.typography.body3,
    color: theme.palette.primary.dark,
  },
});

class RenderMDStatic extends React.Component {
  constructor(props) {
    super(props);

    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
    });
  }

  render() {
    const { classes, content, contentLabel } = this.props;
    const html = marked(content || '', { renderer });
    return (
      <div
        className={classes.root}
      >
        {contentLabel && (
          <label
            htmlFor={content}
            className={classes.boxLabel}
          >
            {contentLabel}
          </label>
        )}
        <div
          className={classes.boxData}
          id={content}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  }
}

RenderMDStatic.propTypes = propTypes;
RenderMDStatic.defaultProps = defaultProps;

export default withStyles(styles, { name: 'StyledRenderMDStatic' })(RenderMDStatic);
