
import React, {Component,useState} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import ModalComponent from './Modal'
import moment from 'moment'
import {closeReopenTask} from '../store/actions/closeReopen';
import {deleteTask} from '../store/actions/deleteTask';
import {allowSorting} from '../config'


const ToDoList = (props)=>{
    
    const [show, setShow] = useState(false);
    const [item, setItem] = useState({});
    const [edit, setEdit] = useState(false);
    const [deleteRow, setDelete] = useState(false);
    const [index, setIndex] = useState(0);
    const [bulkItems , setbulkItems] = useState([]);

    const {list,tab,groupBy,sorting,searchKey,changeSorting}  = props;
    let showList = _.cloneDeep(list); //cloning the array So that original list array does not change when chnaged are made in showList array

    if(searchKey){ // For search purpose
        showList = _.filter(showList,val=>{
            return val.title.includes(searchKey) || val.description.includes(searchKey); // if title OR description contains search substring then return those
        })
    }

    if(tab == "pending"){  // pending tab tasks
      showList = _.filter(list,val=>{return val.currentState})
    }
    if(tab == "completed"){ // Completed tab tasks
        showList = _.filter(list,val=>{return !val.currentState})
    }

    if(sorting.type != "none"){
        showList = _.orderBy(showList,sorting.type,sorting.order) // Sorting will be done for column which is clicked
    }

    if(!(groupBy === "none")){   // For group by 
        showList = _.groupBy(showList,groupBy);
    }

   
    const selectBulk = (index,e)=>{
        e.stopPropagation();
        setbulkItems([...bulkItems,index]);
    }

    const handleClose = () => setShow(false);
    const handleShow = (val) => {
        setItem(val);
        setShow(true);
        setEdit(false);
    };

    const handleClick = (e,index)=>{
      e.stopPropagation();
      if(e.target.id === "close" || e.target.id === "reopen"){ // Close reopen action call
        props.closeReopenTask({index,open:list[index].currentState == true ? false : true})
      }

      if(e.target.id === "delete"){ // delete action call
        setDelete(true);
        setItem(list[index]);
        setIndex(index)
        setShow(true);
        //props.deleteTask(index)
      }

      if(e.target.id === "edit"){ // Edit action call
        setEdit(true);
        setShow(true);
        setItem(list[index])
        setIndex(index)
      }
     
      }
  
    
      const handleBulk = (e)=>{
          if(e.target.id === "delete"){
              props.deleteTask(bulkItems);
          }
          else{
              props.closeReopenTask(bulkItems);
          }

          setbulkItems([]);

      }

    return(
       <div className="content-table">
           {
               !_.isEmpty(bulkItems) ? 
               <div className="dropdown bulk-dropdown" >
               <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                   Select Action
               </button>
               <div className="dropdown-menu" onClick = {(e)=>handleBulk(e)}>
                   <a className="dropdown-item" href="#" id = "delete">Delete</a>
                   <a className="dropdown-item" href="#" id = "close">Close</a>
                   {/* <a className="dropdown-item" href="#" id = "reopen">Reopen</a> */}
               </div>
              </div>
               :
               ""
           }
            <table className = "table table-bordered">
        <thead>
          <tr>
            <th onClick={()=>changeSorting("title")} scope="col"><span>Summary</span> {allowSorting ?  <i className = "fas fa-sort"></i> : ""}</th>
            <th onClick={()=>changeSorting("priority")} scope="col"><span>Priority</span>{allowSorting ?  <i className = "fas fa-sort"></i> : ""}</th>
            <th onClick={()=>changeSorting("createdAt")} scope="col"><span>Created On</span>{allowSorting ?  <i className = "fas fa-sort"></i> : ""}</th>
            <th onClick={()=>changeSorting("dueDate")} scope="col"><span>Due Date</span>{allowSorting ?  <i className = "fas fa-sort"></i> : ""}</th>
            <th scope="col">Actions</th>
            <th scope="col">Bulk</th>
          </tr>
        </thead>
        <tbody>

        {   groupBy == "none" ? 
            _.map(showList,(val,index)=>(
            <tr style={{background:val.currentState ? "" : "grey"}} onClick={()=>{handleShow(val)}}>
                <td scope="col">{val.title}</td>
                <td scope="col">{val.priority}</td>
                <td scope="col">{val.createdAt && moment(val.createdAt).format("YYYY-MM-DD")}</td>
                <td scope="col">{val.dueDate && moment(val.dueDate).format("YYYY-MM-DD")}</td>
                <td scope="col" className="action-container" onClick={(e)=>handleClick(e,val.index)}>
                <i title="edit" className = "fas fa-edit" id = "edit"></i>
                <i title = "delete" className = "far fa-trash-alt" id = "delete"></i>
                {
                    val.currentState ?
                    <i title = "close" className = "far fa-times-circle" id = "close"></i>
                    :
                    <i title ="Reopen" className = "fas fa-lock-open" id = "reopen"></i>
                }
               
              
                </td>
                <td><i class="far fa-check-circle" style = {{color:bulkItems.includes(val.index) ? "green" : "grey"}} onClick = {(e)=>selectBulk(val.index,e)}></i></td>
            </tr>
            ))

            :
            _.map(showList,(val,index)=>(  // For group by
                <>
                <tr>
                    <td>{groupBy === "createdAt" || groupBy == "dueDate" ? moment(index).format("YYYY-MM-DD") : index  }</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                {
                     _.map(val,val1=>(
                        <tr style={{background:val1.currentState ? "" : "grey"}} onClick={()=>{handleShow(val)}}>
                        <td scope="col">{val1.title}</td>
                        <td scope="col">{val1.priority}</td>
                        <td scope="col">{val1.createdAt && moment(val1.createdAt).format("YYYY-MM-DD")}</td>
                        <td scope="col">{val1.dueDate && moment(val1.dueDate).format("YYYY-MM-DD")}</td>
                        <td scope="col" className="action-container" onClick={(e)=>handleClick(e,val1.index)}>
                        <i title ="edit" className = "fas fa-edit" id = "edit"></i>
                        <i title = "delete" className = "far fa-trash-alt" id = "delete"></i>
                        {
                            val1.currentState ?
                            <i title ="close" className = "far fa-times-circle" id = "close"></i>
                            :
                            <i title = "Reopen" className = "fas fa-lock-open" id = "reopen"></i>
                        }
                       
                      
                        </td>
                        <td><i style = {{color:bulkItems.includes(val.index) ? "green" : "grey"}}  onClick = {(e)=>selectBulk(val1.index,e)} class="far fa-check-circle"></i></td>
                    </tr>
                       ))
                }
               </>

               
             ))

        }

        </tbody>
      </table> 
        <ModalComponent show={show} deleteRow = {deleteRow}  deleteTask = {props.deleteTask}  handleClose={handleClose} index={index}  handleShow = {handleShow} edit = {edit} item = {item} view={true}/>
       </div>
    )
}


const mapStateToProps = (state)=>{
    return{
      list:state.list.list
    }
  }


  const mapDispatchToProps = (dispatch)=>{
    return{
      closeReopenTask:(userAction)=>dispatch(closeReopenTask(userAction)),
      deleteTask:(index)=>dispatch(deleteTask(index))
    }
  }
  

  
  export default connect(mapStateToProps,mapDispatchToProps)(ToDoList);