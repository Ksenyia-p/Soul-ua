import React from 'react';
import clsx from 'clsx';
import inputStyles from './SmallInputField.module.css';

const SmallInputField = ( { onChange, label, type, name, id, children, wrapperClass, animationClass } ) => {
    return (
        <div className={clsx(inputStyles.wrapper, wrapperClass, animationClass)}>
            <label htmlFor={id}><h3>{label}</h3></label>
            <input type={type} name={name} id={id} onChange={onChange} />
            {children}
        </div>
    );
};

export default SmallInputField;