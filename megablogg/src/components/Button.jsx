import React from "react";

function Button({
    children,
    type = 'button',
    bgColor = "bg-blue-600",
    textColor = 'text-white',
    className = '',
    ...props
}) {
    // Remove bgColor from props so it is not passed to the DOM
    const { bgColor: _bgColor, ...rest } = props;
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}
export default Button