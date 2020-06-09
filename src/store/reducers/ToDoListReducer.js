
const initState = {
    list:[]
};
const ToDoListReducer = (state = initState,action)=>{
    switch(action.type){
       case 'ADD_TASK':
        return {list:action.payload};
        case 'OPEN_CLOSE_TASK' :
          return {list:action.payload};
        case 'DELETE_TASK' :
           return {list:action.payload};
        case 'EDIT_TASK' :
            return {list:action.payload};
        default:
            return state
    }
}

export default ToDoListReducer