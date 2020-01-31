import React from 'react';

import './Modal.css';

const Modal = (props) => {

    return (
        <>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
               <div className="modal-header">
                  <h3>{props.action}</h3>
                </div>
                <div className="modal-body">
                        {props.children}
                </div>
                <div >
                    <button className="btn-cancel" onClick={props.cancel}>CLOSE</button>
                    <button className="btn-continue"  onClick={props.submit}>CONTINUE</button>
                </div>
            </div>
        </>
    )
}

export default Modal;

