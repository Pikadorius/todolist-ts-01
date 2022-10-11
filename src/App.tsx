import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

function App() {
    //BLL
    const todoListTitle : string = "What to learn";
    const tasks1 : Array<TaskType> = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS & ES6", isDone: true},
        {id: 3, title: "REACT & TS", isDone: false},
        {id: 4, title: "REDUX", isDone: false},
        {id: 5, title: "ANGULAR", isDone: false},
    ];


    //GUI
    return (
        <div className="App">
            <TodoList title={todoListTitle} tasks={tasks1}/>
        </div>
    );
}
export default App;