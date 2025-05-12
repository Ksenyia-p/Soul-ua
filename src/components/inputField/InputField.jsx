import React from 'react';
import clsx from 'clsx';
import inputStyles from './inputStyles.module.css';

const InputField = ( { label, type, name, id, children, wrapperClass } ) => {
    return (
        <div className={clsx(inputStyles.wrapper, wrapperClass)}>
            <label htmlFor={id}><h3>{label}</h3></label>
            <input type={type} name={name} id={id} />
            {children}
        </div>
    );
};

export default InputField;