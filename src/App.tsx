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
    console.log("App rendering")
    //BLL
    const todoListTitle: string = "What to learn";

    let [tasksForTodoList, setTasksForTodolist] = useState([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS & ES6", isDone: true},
        {id: v1(), title: "REACT & TS", isDone: false},
        {id: v1(), title: "REDUX", isDone: false},
        {id: v1(), title: "ANGULAR", isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterValuesType>("all");


    const changeFilter = (value: FilterValuesType) => setFilter(value);

    const removeTask = (id: string) => {
        setTasksForTodolist(tasksForTodoList.filter(elem => elem.id !== id));
    };

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false,
        }
        setTasksForTodolist([newTask, ...tasksForTodoList])
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filterValue: FilterValuesType) => {
        let filteredTasks = tasksForTodoList;
        if (filterValue === "completed") {
            filteredTasks = tasksForTodoList.filter(elem => elem.isDone);
        }
        if (filterValue === "active") {
            filteredTasks = tasksForTodoList.filter(elem => !elem.isDone);
        }
        return filteredTasks;
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        /*let task = tasksForTodoList.find(i => i.id === id)
        task ? task.isDone = isDone : alert("This task is no exist")
        setTasksForTodolist([...tasksForTodoList])*/
        setTasksForTodolist(tasksForTodoList.map(t => t.id === id ? {...t, isDone: isDone} : t))
    }

    //GUI
    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={getFilteredTasks(tasksForTodoList, filter)}
                      filter={filter}

                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

export default App;