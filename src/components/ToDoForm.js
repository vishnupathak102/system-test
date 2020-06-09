
import React,{useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {createTask} from '../store/actions/taskCreator';
import {editTask} from '../store/actions/editTask';
import {connect} from 'react-redux';
import Loader from 'react-loader';
import _ from 'lodash'

const  ToDoForm = (props)=>{
  let item = props.item || {}
  const [summary,setSummary]  = useState(item.title || "");
  const [description,setDescription]  = useState(item.description || "");
  const [priority,setPriority]  = useState(item.priority || "None" );
  const [dueDate,setDueDate]  = useState(item.dueDate ||new Date());
  const [loading,setLoading]  = useState(true);
  const [errors,setError] = useState({});


    const handleSubmit = (e)=>{
        e.preventDefault();
        let allErrors = {}
        if(summary.length < 10 || summary.length > 140){
           allErrors.summary = summary.length < 10 ? "Summary can not be less than 10 characters" : "Summary can not be greater than 140 characters";
        }
        if(description.length < 10 || description.length > 500){
            allErrors.description = description.length < 10 ? "Description can not be less than 10 characters" : "Description can not be greater than 500 characters";
         }
         if(!_.isEmpty(allErrors)){
             setError(allErrors);
         }
         else{
            setLoading(false)
            setTimeout(() => {
                props.handleClose()
                setLoading(true)
            }, 300);
            
            if(props.edit){
                props.editTask({...item,title:summary,description,priority,dueDate,index:props.index});
            }
            else{
                props.createTask({title:summary,description,priority,dueDate});
            }
         }
       
        
    }
  
    const handleChange = (e)=>{
        setDueDate(e);
    }


    console.log(errors,"cece")
    return (
      <>
         <Loader loaded={loading}>
         <form>
            <div className="form-group">
                <label htmlFor = "summary">Summary</label>
                <input type="text" value={summary} onChange = {(e)=> setSummary(e.target.value)} className="form-control" id="summary"  placeholder="Enter Summary"/>
                {errors.summary ? <p className = "error-input">{errors.summary}</p> : ""}
            </div>
            <div className="form-group">
                <label htmlFor = "Description">Description</label>
                <textarea className="form-control" value={description} onChange = {(e)=> setDescription(e.target.value)} id="Description" rows="3"></textarea>
                {errors.description ? <p className ="error-input">{errors.description}</p> : ""}
            </div>

            
            <div className="form-group">
                <label htmlFor = "priority">Priority</label>
                <select defaultValue = "None" className="form-control" value={priority} onChange = {(e)=> setPriority(e.target.value)} id="priority">
                <option > None</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                </select>
            </div>
            <div className="form-group">
            <div htmlFor = "priority" className="due-date">Due Date</div>
            <div>
            <DatePicker
                selected={dueDate}
                onChange={handleChange}
                value ={dueDate}
             />
             </div>
           </div>
           <div className="form-submit-button">
           <button type="cancel" className="btn btn-primary task-buttons" onClick={()=>props.handleClose()}>Cancel</button>
           <button type="submit" className="btn btn-primary task-buttons" onClick={handleSubmit}>Submit</button>
           </div>
        </form>
        </Loader>

      </>
    );
  }


  const mapDispatchToProps = (dispatch)=>{
    return{
      createTask:(project)=>dispatch(createTask(project)),
      editTask:(project)=>dispatch(editTask(project))
    }
  }
  

  
  export default connect(null,mapDispatchToProps)(ToDoForm);