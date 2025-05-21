import React from "react";

type CheckboxProps = {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  id,
  disabled = false,
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2)}`;

  return (
    <label
      htmlFor={checkboxId}
      className="flex items-center gap-2 cursor-pointer"
    >
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="w-4 h-4 text-primary bg-gray-100 rounded-full border-gray-300 focus:ring-1 focus:ring-primary disabled:opacity-50"
      />
      {label && <span className="text-xs md:text-sm">{label}</span>}
    </label>
  );
};

export default Checkbox;
