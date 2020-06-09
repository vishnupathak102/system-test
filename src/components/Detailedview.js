
import React from 'react';
import moment from 'moment';


const  DetailedView = (props)=>{
    const {item,handleClose,deleteTask,index}  = props;
    return (
      <>
      <div className="detailed-content">
       <div className="detailed-view"> 
            <p>Summary:</p>
            <p className="detail-value">{item.title}</p>
        </div>

        <div className="detailed-view">
            <p>Description:</p>
            <p className="detail-value">{item.description}</p>
        </div>

        <div className="detailed-view">
            <p>CreatedAt:</p>
            <p className="detail-value">{item.createdAt && moment(item.createdAt).format("YYYY-MM-DD")}</p>
        </div>

        <div className="detailed-view">
            <p>Due Date:</p>
            <p className="detail-value">{item.dueDate && moment(item.dueDate).format("YYYY-DD-MM")}</p>
        </div>

        <div className="detailed-view">
            <p>Priority:</p>
            <p className="detail-value">{item.priority}</p>
        </div>

        <div>
            <p>current State:</p>
            <p className="detail-value">{item.currentState == true ? "Open" : "Closed"}</p>
        </div>

        {
            props.deleteRow ? 
            <div>
                 <button type="button" className="btn btn-primary task-buttons" id ="all_tasks" onClick = {()=>handleClose()}>No</button>
                 <button type="button" className="btn btn-primary task-buttons" onClick = {()=>{deleteTask(index); handleClose()}} id = "completed">Yes</button>
            </div>
            :
            ""
        }
        </div>
      </>
    );
  }

  export default DetailedView;