import React from 'react';
import EditSwitch from './switch';

const RenderSelect = ({ form, sortStrings }) => {
  const sortArr = sortStrings.reduce((acc, sS) => {
    acc.push(
      {
        option: `${sS.option} Des`,
        value: `${sS.value}-des`,
      },
      {
        option: `${sS.option} Asc`,
        value: `${sS.value}-asc`,
      },
    );
    return acc;
  }, []);
  const searchValues = {
    contentName: 'sortBy',
    contentLabel: 'Sort',
    contentAlt: '',
    contentOptions: sortArr,
    contentHelp: '',
    contentPlaceholder: '',
    contentType: '',
    componentType: 'InputSelect',
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
