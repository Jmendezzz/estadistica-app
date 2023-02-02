import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { dataActions } from "../../store/user-data";

import style from "./UserDataTable.module.css";


export const UserDataTable = () => {
    const dispatch = useDispatch();

    const data = useSelector(state => state.data.data);

    const deleteDataHandler = (data) => {

        dispatch(dataActions.deleteData(data));

    }
    return (
        <div className={style.contenedor__principal}>
            <div className={style.contenedor__elementos}>
                {data.map((num, index) => (
                    <div className={style.elemento} key={index} onClick={deleteDataHandler.bind(null, index)}>
                        {num}
                    </div>
                ))}
            </div>


        </div>
    );
}