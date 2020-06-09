export const createTask = (task,state)=>{
    return (dispatch,getState)=>{
        const list = getState().list.list
        dispatch({
            type:'ADD_TASK',
            payload:[...list, {
                currentState:true,title:task.title,description:task.description,createdAt:new Date(),dueDate:task.dueDate,priority:task.priority,index:list.length
             }]
        })

    }
  }