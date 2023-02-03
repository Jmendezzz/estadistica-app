import React, { useState } from "react";

import style from"./ErrorModal.module.css";

const ErrorModal = ( props) => {


  return (
    <>
      
        <div className={style.modal__background}>
          <div className={style.modal__container}>
            <h3 className={style.modal__title}>Error</h3>
            <p className={style.modal__message}>{props.errorMessage}</p>
            <button className={style.modal__close__button} onClick={props.onCloseModal}>
              Close
            </button>
          </div>
        </div>
      
    </>
  );
};

export default ErrorModal;