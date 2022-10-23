import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from 'uuid';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "completed" | "active";


function App() {
    //BLL
    const todoListTitle: string = "What to learn";

    let initTasks: Array<TaskType> = [
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS & ES6", isDone: true},
        {id: v1(), title: "REACT & TS", isDone: false},
        {id: v1(), title: "REDUX", isDone: false},
        {id: v1(), title: "ANGULAR", isDone: false},
    ];
    console.log(initTasks)

    let [tasks, setTasks] = useState(initTasks);
    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodoList = tasks;
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(elem => elem.isDone);
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(elem => !elem.isDone);
    }

    const changeFilter = (value: FilterValuesType) => setFilter(value);

    const removeTask = (id: string) => {
        let filteredTasks = tasksForTodoList.filter(elem => elem.id !== id);
        setTasks(filteredTasks);
        console.log(tasks);
    };


    //GUI
    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;