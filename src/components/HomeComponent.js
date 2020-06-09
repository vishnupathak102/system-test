
import React, {useState} from 'react';
import SearchComponent from './SearchComponent';
import ToDoList from './ToDoList';
import AddNewButton from './AddNewButton';
import TabTracker from './TabTracker';


const HomeComponent = (props)=>{
    const [tab,setTab]  = useState("all_tasks");
    const [groupBy,setGroupBy]   = useState("none");
    const [sorting , setSorting] = useState({type:"none",order:"asc"});
    const [searchKey,setSearch]  = useState("");

    const changeTab = (newTab)=>{ // When tab is changed 
        setTab(newTab);
    }

    let timer = '';

    const setSearchKey = (value)=>{ //Debouncing method
        clearTimeout(timer)
        timer = setTimeout(()=>{setSearch(value)},300); //Only set if user waits for 300ms
    }

    const changeGroupBy = (group)=>{  // When group by is chnaged
        setGroupBy(group);
    }

    const changeSorting = (sort)=>{  // when sorting clicked 
        if(sort == sorting.type){
            setSorting({type:sort,order:sorting.order == "asc" ? "desc" : "asc"}); 
        }
        else{
            setSorting({type:sort,order:"asc"});
        }
       
    }
   
    
 return(
    <>
       <SearchComponent changeGroupBy = {changeGroupBy} groupBy = {groupBy} setSearchKey = {setSearchKey}/> 
       <ToDoList tab={tab} groupBy = {groupBy} changeSorting = {changeSorting} sorting = {sorting} searchKey = {searchKey}/>
       <AddNewButton/>
       <TabTracker changeTab={changeTab} tab = {tab}/>
    </>
  )
}

export default HomeComponent;