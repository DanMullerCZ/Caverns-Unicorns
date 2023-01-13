import React, { useState, useRef } from 'react'

const Attribute = ({bonus,name,change,defaultAtr}:{bonus:number,name:string,change:any,defaultAtr:number}) => {
    const [atr, setAtr] = useState(defaultAtr + bonus);
    const inputRef = useRef<HTMLInputElement>(null);
    
    const minus = async () => {
        if (atr > 0) {
            await setAtr(atr - 1);
            change(inputRef.current?.value,name)
        }
    }

    const plus = async () => {
        await setAtr(atr + 1);
        change(inputRef.current?.value,name)
    }

    return (
        <div>
            <p>{name}</p>
            <input ref={inputRef} value={atr} readOnly />
            <button type='button' onClick={minus}>-</button>
            <button type='button' onClick={plus}>+</button>
        </div>
    )
}

export default Attribute