import style from "./PresentationApp.module.css";

export const PresentationApp = ()=>{
    return (
        <div className={style.content}>
            <p>Esta app cuenta con:</p>
            <ul>
                <li>Tablas de frecuencias</li>
                <li>Organización de datos</li>
                <li>Graficos</li>
            </ul>
        </div>
    );
} 