import style from "./Button.module.css";

export const Button = (props) => {

    return (
        <button className={style.button} onClick={props.onClick}>
            {props.children}
            </button>
    );

}