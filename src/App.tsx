import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "completed" | "active";


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

    let [tasks, setTasks] = useState(initTasks);
    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodoList = tasks;
    if (filter === "completed") {
        tasksForTodoList = initTasks.filter(elem => elem.isDone);
    }
    if (filter === "active") {
        tasksForTodoList = initTasks.filter(elem => !elem.isDone);
    }

    const changeFilter = (value: FilterValuesType) => setFilter(value);

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(elem => elem.id !== id);
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