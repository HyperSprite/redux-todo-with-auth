import React from 'react';
import EditSwitch from './switch';

const RenderRange = ({ form, sortStrings }) => {
  const rangeArr = sortStrings.map((rS) => {
    return [
      {
        contentLabel: `Min ${rS.option}`,
        contentName: `min-${rS.value}`,
        componentType: 'InputText',
      },
      {
        contentLabel: `Max ${rS.option}`,
        contentName: `max-${rS.value}`,
        componentType: 'InputText',
      },
    ];
  });

  return (
    <div>
      {rangeArr && rangeArr.map(rA => (
        <div key={rA[0].contentName} >
          <EditSwitch
            form={form}
            formValues={rA[0]}
          />
          <EditSwitch
            form={form}
            formValues={rA[1]}
          />
        </div>
      ))}
    </div>
  );
};

export default RenderRange;
