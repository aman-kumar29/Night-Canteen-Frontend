// Input.js
import React from 'react';
import { Input as AntInput } from 'antd'; // Import Ant Design's Input component
import InputContainer from '../InputContainer/InputContainer.js'; // Custom container for label and error display

function Input(
  { label, type, defaultValue, onChange, onBlur, name, error },
  ref
) {
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;
    // Defaults
    switch (error.type) {
      case 'required':
        return 'This Field Is Required';
      case 'minLength':
        return 'Field Is Too Short';
      default:
        return '*';
    }
  };

  return (
    <InputContainer label={label}>
      <AntInput
        defaultValue={defaultValue}
        type={type}
        placeholder={label}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        status={error ? 'error' : ''} // Error status for Ant Design input
        className="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full px-3 py-2 transition duration-150 ease-in-out" // Tailwind CSS for styling
      />
      {error && (
        <div className="text-red-500 text-sm mt-1">
          {getErrorMessage()}
        </div>
      )}
    </InputContainer>
  );
}

export default React.forwardRef(Input);
