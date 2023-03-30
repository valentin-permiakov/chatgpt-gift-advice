import React from 'react';

interface IDropdownIcon {
  height?: number;
  width?: number;
}

export const DropdownIcon = ({ height = 10, width = 16 }: IDropdownIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 1L8 8L1 1" strokeWidth="2" />
    </svg>
  );
};
