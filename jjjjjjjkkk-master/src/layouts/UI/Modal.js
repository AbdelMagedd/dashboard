import { Fragment } from "react";
import  ReactDOM  from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseCart}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div>{props.children}</div>
    </div>
  );
};

const protalElement = document.getElementById("overlays");

const Modal = (props) => {
  return <Fragment>
    {ReactDOM.createPortal(<Backdrop onCloseCart={props.onCloseCart} />, protalElement)}
    {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, protalElement)}
  </Fragment>;
};

export default Modal;
