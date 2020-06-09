import React from 'react';
import {allowSearching} from  '../config';

const SearchComponent = (props)=>{

const handleClick = (e)=>{
  props.changeGroupBy(e.target.id);
}

 return(
    <div className="wrap">
      {
          allowSearching ? 
          <div className="search">
          <input autoFocus type="text" className="searchTerm" placeholder="Search here..." onChange = {(e)=>props.setSearchKey(e.target.value)}/>
         </div>
         :
         ""
      }
      <div className="dropdown gropu-by">
        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
            Group By {props.groupBy}
        </button>
        <div className="dropdown-menu" onClick = {handleClick}>
            <a className="dropdown-item" href="#" id = "none">None</a>
            <a className="dropdown-item" href="#" id = "createdAt">Created On</a>
            <a className="dropdown-item" href="#" id = "dueDate">Pending On</a>
            <a className="dropdown-item" href="#" id = "priority">Priority</a>
        </div>
       </div>
   </div>
    )
}

export default SearchComponent;