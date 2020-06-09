import _ from 'lodash';

export const editTask = (task,state)=>{
    
       
    return (dispatch,getState)=>{
        let list = getState().list.list
        list[task.index] = {currentState:task.currentState,title:task.title,description:task.description,createdAt:task.createdAt,dueDate:task.dueDate,priority:task.priority} 
        dispatch({
            type:'EDIT_TASK',
            payload:[...list]
        })

    }
  }