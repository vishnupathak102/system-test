
import React from 'react';
import {Modal} from 'react-bootstrap';
import ToDoForm from './ToDoForm';
import DetailedView from './Detailedview';

const ModalComponent = (props)=>{
    const {view,edit,deleteRow}  = props;
    console.log(props,"edfe")
 return(
     <>
        <Modal show={props.show} onHide={props.handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
          <Modal.Header closeButton>
            <Modal.Title id ="contained-modal-title-vcenter">{deleteRow ? "Are You Sure You Want To Delete This Task"  : edit ? "Edit Task" : view ? "View Full Detail" : "Create Task"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {
                 (view || deleteRow) && !edit ?
                 <DetailedView {...props}/>
                 :
                 <ToDoForm  {...props}/>
              }
            
          </Modal.Body>
        </Modal>

     </>

    )
}

export default ModalComponent;