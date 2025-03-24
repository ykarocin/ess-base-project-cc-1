import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
}

export default function Input({ type, placeholder }: InputProps) {
  return (
    <input 
        type={type}
        placeholder={placeholder}
        className="bg-gray-200 p-2 rounded w-full" 
    />
  );
}