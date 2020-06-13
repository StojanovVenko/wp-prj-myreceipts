// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
import * as React from "react";
import {useState} from "react";
import FormControl from "react-bootstrap/FormControl";

export const CustomToggleFirmi = React.forwardRef(({ children, onClick, disabled }, ref) => (
    <button
        className={"btn btn-primary btn-block"}
        ref={ref}
        disabled={disabled}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        &#x25bc;
    </button>
));
// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
export const CustomMenuFirmi = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy, props }, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                style={{maxHeight: "60vh", overflow: "auto"}}
                className={className}
                aria-labelledby={labeledBy}
            >
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Пребарај фирма..."
                    onChange={e => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        child =>
                            !value || child.props.children.toString().toLowerCase().includes(value.toLowerCase()) ,
                    )}
                </ul>
            </div>
        );
    },
);
