
import React, {useState} from 'react';
import ModalComponent from './Modal'

const AddNewButton = ()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

 return(
  <>
     <div className="add-new-button" onClick={handleShow}>
        <span className="circle">
            <div className="vertical"></div>
            <div className="horizontal"></div>
        </span>
     </div>

     <ModalComponent show={show} handleClose={handleClose}  handleShow = {handleShow}  />

  </>

    )
}

export default AddNewButton;