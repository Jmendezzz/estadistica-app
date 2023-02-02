import style from "./DataInput.module.css";
import { Input } from "../../UI/Input/Input";
import { Button } from "../../UI/Button/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { dataActions } from "../../store/user-data";

export const DataInput = ()=>{
    const [dataInput, setDataInput ]= useState ("");

    const inputChange = (event) =>{
        setDataInput(event.target.value);
        console.log(event.target.value);
    }
    const dispatch = useDispatch();

    const addHandler = ()=>{

        dispatch(dataActions.addData(dataInput));
        setDataInput("");

    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          dispatch(dataActions.addData(dataInput));
          setDataInput("");

        }
      };
    

    return (
    
        <div className={style.content}>
            <p>Ingresa los datos</p>
            <div className={style.content__inputs}>
                <Input value={dataInput} onKeyDown={handleKeyDown} onChange={inputChange}></Input>
                <Button onClick={addHandler}>Añadir</Button>
            </div>

        </div>
    );
}