import { createPortal } from "react-dom";

const Modal = ({isOpen, open, title, body, children}) => {
    return (
        <>
        {isOpen && createPortal(<div>show modal</div>, document.getElementById('modal'))}
        </>
    );
}
 
export default Modal;