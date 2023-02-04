import style from "./DataInput.module.css";
import { Input } from "../../UI/Input/Input";
import { Button } from "../../UI/Button/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { dataActions } from "../../store/user-data";
import ErrorModal from "../../UI/Modal/ErrorModal";
import Swal from "sweetalert2";
export const DataInput = ()=>{
    const [dataInput, setDataInput ]= useState ("");
    //const [showModal,setShowModal]=useState(false);
    const inputChange = (event) =>{
        setDataInput(event.target.value.trim());
    }
    const dispatch = useDispatch();

    const addHandler = ()=>{
        if (validation(dataInput)) {
            console.log(validation(dataInput))
            //setShowModal(true);
            console.log(Swal);
            Swal.fire({ // Sweetaler2, queda mejor esteticamente y reemplaza el modal creado anteriormente.
                icon: 'error',
                title: 'Oops...',
                text: 'Entrada de datos incorrecta',
                footer: '<p>Debes ingresar solo datos númericos!<p>'
              });
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
}