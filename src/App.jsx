import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import './App.css';

function App() {
  const [isCompleteScreen, setIsCompletescreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDiscription,setNewDescription] = useState("");
  const[completedTodos,setCompletedTodos] = useState([]);

  const handleAddTodo = ()=>{
    let newTodoItem = {
      title : newTitle,
      description:newDiscription
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
  };

  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleDeleteCompletedTodo = (index)=>{
  let reducedTodo = [...completedTodos];
  reducedTodo.splice(index,1);
  
  localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
  setCompletedTodos(reducedTodo);
  };



  const handleCompleted = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let CompletedOn = dd + '/' + mm + '/' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      CompletedOn:CompletedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

 

  useEffect(()=>{
     let savedTodo = JSON.parse(localStorage.getItem('todolist'));
     let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
     if(savedTodo){
      setTodos(savedTodo);
     }
     if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
     }
  },[])

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder=" task title" />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDiscription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="task description" />
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'} `} onClick={() => setIsCompletescreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'} `} onClick={() => setIsCompletescreen(true)}>Completed</button>
        </div>
        <div className='todo-list'>
          {isCompleteScreen===false && allTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <div>
              <MdDelete className='icon' onClick={()=>handleDeleteTodo(index)} title='delete'/>
              <FaCheck className='check-icon' onClick={()=>handleCompleted(index)} title='check'/>
            </div>
            
          </div>
            );
          })}
          
          {isCompleteScreen===true && completedTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><small>Completed on: {item.CompletedOn}</small></p>
            </div>

            <div>
              <MdDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title='delete'/>
              
            </div>
          </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
