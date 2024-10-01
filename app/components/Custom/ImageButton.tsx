"use client";

import Image from "next/image";
import React from "react";
import Icon from "@mdi/react";
import { mdiSquareEditOutline } from "@mdi/js";

interface CustomImageButtonProps {
  path: string;
  size: number;
  onClick: () => void;
}
const CustomImageButton = ({
  path,
  size,
  onClick,
}: CustomImageButtonProps) => {
  return (
    <button onClick={onClick} className="focus:outline-none h-5">
      <Icon path={path} size={size} />
    </button>
  );
};

export default CustomImageButton;
