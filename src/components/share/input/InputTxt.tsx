import { useState, ChangeEvent, FormEvent } from "react";

interface IInputTxt {
    onChangeTxt: (value: string) => void;
    placeholderValue: string;
}

function InputTxt({ onChangeTxt, placeholderValue }: IInputTxt) {
    const [value, setValue] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handelCreateMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onChangeTxt(value);
        setValue("");
    };

    return (
        <>
            <div>
                <form onSubmit={handelCreateMessage}>
                    <input
                        autoFocus
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
