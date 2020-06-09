import _ from 'lodash';

export const deleteTask = (index,state)=>{
    
    
    return (dispatch,getState)=>{
    let list = [];
    if(_.isArray(index)){
        list = _.filter(getState().list.list,(val,ind)=>{
            return !(index.includes(val.index))
        })
    }
    else{
         list = _.filter(getState().list.list,(val,ind)=>{
            return ind != index;
        })
    }
    
    
        dispatch({
            type:'DELETE_TASK',
            payload:[...list]
        })

    }
  }