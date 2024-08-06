import React from 'react';
import { WidgetProps } from '@rjsf/utils';

const ColorWidget: React.FC<WidgetProps> = ({ id, value, required, disabled, readonly, label, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="color"
        value={value || ''}
        required={required}
        disabled={disabled || readonly}
        onChange={handleChange}
      />
    </div>
  );
};

export default ColorWidget;
