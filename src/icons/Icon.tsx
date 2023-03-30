import React from "react";
import { DropdownIcon } from "./DropdownIcon";

export enum EIcons {
  dropdownIcon = "DropdownIcon",
}

interface IIconProps {
  name: EIcons;
  size?: number;
}

export const Icon = ({ name, size = 16 }: IIconProps) => {
  const icons = {
    DropdownIcon: <DropdownIcon width={size} height={10} />,
  };
  return <span style={{ width: size, height: size }}>{icons[name]}</span>;
};
