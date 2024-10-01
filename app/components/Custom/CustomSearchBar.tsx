"use client"

import React from "react";

interface CustomSearchBarProps {
  onSearch: () => void;
}
const CustomSearchBar = ({ onSearch }: CustomSearchBarProps) => {
  return (
    <div>
      <label htmlFor=""></label>
      <input
        type="text"
        placeholder="Search for your favourite"
        onChange={onSearch}
      />
    </div>
  );
};

export default CustomSearchBar;