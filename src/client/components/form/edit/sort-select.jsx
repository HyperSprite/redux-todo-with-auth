import React from 'react';
import EditSwitch from './switch';

const RenderSelect = ({ form, sortStrings }) => {
  const sortArr = sortStrings.reduce((acc, sS) => {
    acc.push(
      {
        label: `${sS.option} Des`,
        value: `${sS.value}-des`,
      },
      {
        label: `${sS.option} Asc`,
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

export default RenderSelect;
