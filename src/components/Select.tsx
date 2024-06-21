import React, { ChangeEvent } from "react";

interface SelectInputProps {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
  placeholder?: string; 
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  value,
  onChange,
  options,
  className = "",
  placeholder = "Selecione a Editora",
}) => {

    const allOptions = [
    { value: "", label: placeholder },
    ...options,
  ];

  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background ${className}`}
    >
      {allOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
