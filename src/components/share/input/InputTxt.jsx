import { useEffect, useState } from "react";
import axios from "axios";

function InputTxt({ onChangeTxt }) {
    const [value, setValue] = useState("");

    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    const handelCreateMessage = (e) => {
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
                        placeholder="메시지입력"
                    ></input>
                    <button onClick={handelCreateMessage}>입력</button>
                </form>
            </div>
        </>
    );
}

export default InputTxt;
