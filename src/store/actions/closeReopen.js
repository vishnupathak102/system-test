import _ from 'lodash';

export const closeReopenTask = (userAction,state)=>{
    
    
    return (dispatch,getState)=>{
       let list = [];
        if(_.isArray(userAction)){
             list = _.map(getState().list.list,(val)=>{
                if(userAction.includes(val.index)){
                  val.currentState = !val.currentState;
                }
                return val;
            })
        }
        else{
             list = _.map(getState().list.list,(val,index)=>{
                if(index == userAction.index){
                  val.currentState = userAction.open;
                }
                return val;
            })
        }
    
    
        dispatch({
            type:'OPEN_CLOSE_TASK',
            payload:[...list]
        })

    }
  }