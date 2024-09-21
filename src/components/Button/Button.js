import React from 'react';
import { Button as AntButton } from 'antd'; // Import Ant Design's Button component

export default function Button({
  type,
  text,
  onClick,
  color,
  backgroundColor,
  fontSize,
  width,
  height,
}) {
  return (
    <center className=''>
      <AntButton
        type={type}
        onClick={onClick}
        style={{
          color,
          backgroundColor,
        }}
        className="w-[100%] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1"
      >
        {text}
      </AntButton>
    </center>
  );
}

Button.defaultProps = {
  type: 'primary', // 'primary' is the common Ant Design button type
  text: 'Submit',
  backgroundColor: '#e72929',
  color: 'white',
  fontSize: '1.3rem',
  width: '12rem',
  height: '3.5rem',
};
