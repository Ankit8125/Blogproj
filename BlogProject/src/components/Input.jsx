import React, {useId} from 'react'

const Input = React.forwardRef(function Input({
    label, 
    type = 'text',
    className = "",
    ...props
}, ref){ // we have pass a reference also 
    const id = useId()
    return(
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1'
            htmlFor={id}
            >
                {label}    
            </label>
            }
            <input 
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full
            ${className}`}
            ref = {ref} //this is only the main thing which references to parent component
            {...props}
            id = {id}
            />
        </div>    
    )
})

export default Input