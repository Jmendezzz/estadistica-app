import style from "./DataInput.module.css";
import { Input } from "../../UI/Input/Input";
import { Button } from "../../UI/Button/Button";

export const DataInput = ()=>{
    return (
        <div className={style.content}>

            <p>Ingresa los datos</p>
            <div className={style.content__inputs}>
                <Input></Input>
                <Button>Añadir</Button>
            </div>

        </div>
    );
}