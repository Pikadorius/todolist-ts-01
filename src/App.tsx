import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

function App() {
    //BLL
    const todoListTitle: string = "What to learn";

    let initTasks: Array<TaskType> = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS & ES6", isDone: true},
        {id: 3, title: "REACT & TS", isDone: false},
        {id: 4, title: "REDUX", isDone: false},
        {id: 5, title: "ANGULAR", isDone: false},
    ];

    let arr=useState(initTasks);

    let tasks=arr[0];
    let setTasks=arr[1];

    const removeTask = (id: number) => {
        debugger
        let filteredTasks = tasks.filter(elem => elem.id!==id);
        setTasks(filteredTasks);
        console.log(tasks);
    };


    //GUI
    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={tasks}
                      removeTask={removeTask}/>
        </div>
    );
}

export default App;