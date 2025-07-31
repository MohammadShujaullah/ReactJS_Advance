import React, { useId } from "react";

const Input = React.forwardRef(function Input({ ///  forwardRef hook is used in , e.g==(like login page has input field ,and we use same input filed in my username, password, and more , but on login page , we want to access the state of input field ,so we have to give reference to login page , so here forward refrence is used to give refrence)
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();           //// id is passing to label and also in input , so that when user clcik on input , the cursor show to write inside it 



    return (<div className="w-full">
        {label && <label

            className="inline-block  mb-1 pl-1"

            htmlFor={id}
        >
            {label}</label>

        }

        <input                                              /// we have to pass the reference  and then take the state of it 
            type={type}
            className={`px-3 py-2 rounded-lg bg-white
         text-black outline-none focus:bg-gray-50
          duration-200 border border-gray-200 w-full       
          ${className}`}
            ref={ref}
            {...props}
            id={id}
        ></input>

    </div>)


})

export default Input