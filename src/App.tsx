import React, {useEffect, useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed";

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    useEffect(()=>{
        const listsData=localStorage.getItem('todolists')
        const tasksData=localStorage.getItem('tasks')
        if (listsData && tasksData) {
            setTodolists(JSON.parse(listsData))
            setTasks(JSON.parse(tasksData))
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('todolists', JSON.stringify(todolists))
    },[todolists])

    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(tasks))
    },[tasks])


    const removeTodolist = (todolistID: string) => {
        console.log(todolistID)
        setTodolists(todolists.filter(t=>t.id!==todolistID))
        console.log(tasks)
        delete tasks[todolistID]
        console.log(tasks)

    }


    function removeTask(todolistID: string, taskId: string) {
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId)})
    }

    function addTask(todolistID: string, title: string) {
        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        // let task = tasks[todolistID].find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        setTasks({...tasks, [todolistID]:tasks[todolistID].map(el=>el.id===taskId? {...el, isDone: isDone}:el)});
    }


    function changeFilter(todolistid: string, value: FilterValuesType) {
        // setFilter(value);
        setTodolists(todolists.map(el => el.id === todolistid ? {...el, filter: value} : el))
    }


    return (
        <div className="App">
            {todolists.map((el) => {
                    let tasksForTodolist = tasks[el.id];

                    if (el.filter === "active") {
                        tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                    }
                    if (el.filter === "completed") {
                        tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                    }

                    return (
                        <Todolist
                            removeTodolist={removeTodolist}
                            key={el.id}
                            todolistId={el.id}
                            title={el.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={el.filter}/>
                    )
                }
            )}
        </div>
    );
}

export default App;
