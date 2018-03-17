// TODO - Not using this yet, will come back to this
import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem } from 'material-ui-next/List';
import { FieldArray } from 'redux-form';

import ButtonDelete from '../../button/delete';
import ButtonAdd from '../../button/add';
import EditSwitch from './switch';

const propTypes = {
  // fields: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

const formValues = {
  contentAlt: '',
  contentOptions: null,
  type: 'text',
  component: 'InputText',
  addButtonset: false,
};

const styles = theme => ({

});

const InputSingleFieldArray = (props) => {
  console.warn('input.value', input.value);

  const { form, name, input, label } = props;
  return (
    <List >
      {input.value.map((item, index) => (
        <ListItem
          key={`${item}`}
        >
          <FieldArray
            name={name}
            component={(
              <EditSwitch
                formValues={{ ...formValues, name: `${name[index]}`, value: item, label: `${label}` }}
              />
            )}

          />
          <ButtonDelete
            onClick={() => input.value.remove(index)}
            color="secondary"
            label="Delete"
            size="small"
            toolTip={`Remove ${label}`}
            toolTipId="tooltip-delete"
            toolTipPlacement="bottom"
          />
        </ListItem>
      ))}
      <ListItem>
        <ButtonAdd
          onClick={() => input.onChange([...input.value])}
          label={`Add ${label}`}
          size="small"
        />
      </ListItem>
    </List>
  );
};

InputSingleFieldArray.propTypes = propTypes;

export default InputSingleFieldArray;
