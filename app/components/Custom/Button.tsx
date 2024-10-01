import React from "react";

interface CustomButtonProps {
  text: string;
  className?: string;
  setIsOpen: (key: boolean) => void;
}
export const CustomButton = ({
  text,
  className,
  setIsOpen,
}: CustomButtonProps) => {
  return (
    <button type="button" onClick={() => setIsOpen(true)} className={className}>
      {text}
    </button>
  );
};
