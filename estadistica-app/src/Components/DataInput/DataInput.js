import style from "./DataInput.module.css";
import { Input } from "../../UI/Input/Input";
import { Button } from "../../UI/Button/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { dataActions } from "../../store/user-data";
import ErrorModal from "../../UI/Modal/ErrorModal";
export const DataInput = ()=>{
    const [dataInput, setDataInput ]= useState ("");
    const [showModal,setShowModal]=useState(false);
    const onCloseModal=()=>setShowModal(false);
    const inputChange = (event) =>{
        setDataInput(event.target.value);
        console.log(event.target.value);
    }
    const dispatch = useDispatch();

    const addHandler = ()=>{
        console.log(validation(dataInput))
        if (validation(dataInput)) {
            console.log(validation(dataInput))
            setShowModal(true);
            return;
        }
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
            {showModal&&<ErrorModal errorMessage={"Datos ingresados no son validos"} onCloseModal={onCloseModal}></ErrorModal>}
            <p>Ingresa los datos</p>
            <div className={style.content__inputs}>
                <Input value={dataInput} onKeyDown={handleKeyDown} onChange={inputChange}></Input>
                <Button onClick={addHandler}>Añadir</Button>
            </div>

        </div>
    );
}

function validation(num){
    return isNaN(parseFloat(num));
    //validacion lista
}