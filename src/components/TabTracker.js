
import React from 'react';


const TabTracker = (props)=>{
const {changeTab,tab} = props;
const handleClick = (e)=>{
  changeTab(e.target.id)
}

 return(
    <>
    <div onClick={(e)=>{handleClick(e)}}>
    <button style={{background:tab === "all_tasks" ? "grey" : ""}}  type="button" className="btn btn-primary task-buttons" id ="all_tasks" >All  Tasks</button>
    <button style={{background:tab === "completed" ? "grey" : ""}}  type="button" className="btn btn-primary task-buttons" id = "completed">Completed</button>
    <button style={{background:tab === "pending" ? "grey" : ""}} type="button" className="btn btn-primary task-buttons" id = "pending">Pending</button>
    </div>
  </>
    )
}

export default TabTracker;