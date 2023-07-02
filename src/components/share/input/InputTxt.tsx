import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";

interface IInputTxtProps {
    onChangeTxt: (value: string) => void;
    placeholderValue: string;
}

function InputTxt({ onChangeTxt, placeholderValue }: IInputTxtProps) {
    const ref = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handelCreateMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onChangeTxt(value);
        setValue("");
    };

    useEffect(() => {
        ref.current?.focus();
    }, []);

    return (
        <>
            <div>
                <form onSubmit={handelCreateMessage}>
                    <input
                        ref={ref}
                        onChange={handleInputChange}
                        value={value}
                        placeholder={placeholderValue}
                        className="txt-input"
                    ></input>
                    <button type="submit">입력</button>
                </form>
            </div>
        </>
    );
}

export default InputTxt;
