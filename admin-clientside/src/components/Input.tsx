import React, { forwardRef } from 'react';
type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
  id: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
};
const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  placeholder,
  type = 'text',
  error,
  id,
  name,
  required = false,
  disabled = false,
  className = '',
  onChange,
  onBlur,
  value
}, ref) => {
  return <div className={`w-full ${className}`}>
        {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>}
        <input ref={ref} type={type} id={id} name={name} placeholder={placeholder} required={required} disabled={disabled} onChange={onChange} onBlur={onBlur} value={value} className={`
            w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-gray-300'}
          `} />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>;
});
Input.displayName = 'Input';
export default Input;