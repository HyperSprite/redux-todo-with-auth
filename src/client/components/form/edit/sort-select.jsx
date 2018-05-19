import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import SortAscendingIcon from 'mdi-react/SortAscendingIcon';
import SortDescendingIcon from 'mdi-react/SortDescendingIcon';
import EditSwitch from './switch';

const styles = theme => ({
  root: {},
  spanContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  icon: {
    alignItems: 'baseline',
    paddingRight: '0.5em',
  },
});

const RenderSelect = ({ classes, form, sortStrings }) => {
  const sortArr = sortStrings.reduce((acc, sS) => {
    acc.push(
      {
        label: <span className={classes.spanContainer}><SvgIcon className={classes.icon}><SortDescendingIcon color="inherit" /></SvgIcon> {sS.option}</span>,
        value: `${sS.value}-des`,
      },
      {
        label: <span className={classes.spanContainer}><SvgIcon className={classes.icon}><SortAscendingIcon color="inherit" /></SvgIcon> {sS.option}</span>,
        value: `${sS.value}-asc`,
      },
    );
    return acc;
  }, []);
  const searchValues = {
    name: 'sortBy',
    label: 'Sort',
    contentAlt: '',
    contentOptions: { data: sortArr },
    contentHelp: '',
    placeholder: 'Try typing "dec"',
    type: 'text',
    component: 'InputSelect',
    addButtonset: false,
  };
  return (
    <div>
      <EditSwitch
        form={form}
        formValues={searchValues}
      />
    </div>
  );
};

export default withStyles(styles, { name: 'styledRenderSelect' })(RenderSelect);
