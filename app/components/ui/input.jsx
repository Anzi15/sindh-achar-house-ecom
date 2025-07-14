import React from 'react';

const Input = React.forwardRef(
    ({ type = 'text', className = '', ...props }, ref) => (
        <input
            type={type}
            ref={ref}
            className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        />
    )
);

Input.displayName = 'Input';

export default Input;