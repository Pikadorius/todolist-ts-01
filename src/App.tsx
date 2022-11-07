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

type TodoListType = {
    title: string
    id: string
    filter: FilterValuesType
}


function App() {
    console.log("App rendering")
    //BLL
    const todolistId1 = v1();
    const todolistId2 = v1();
    const [todolists, setTodolists] = useState<TodoListType[]>([
        {
            id: todolistId1,
            title: 'What to learn:',
            filter: 'active'
        },
        {
            id: todolistId2,
            title: 'What to buy:',
            filter: 'completed'
        }
    ]);

    const [tasksForTodoList, setTasksForTodolist] = useState({
        [todolistId2]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS & ES6", isDone: true},
            {id: v1(), title: "REACT & TS", isDone: false},
            {id: v1(), title: "REDUX", isDone: false},
            {id: v1(), title: "ANGULAR", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Sugar", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Water", isDone: false},
        ]
    })


    const todoListTitle: string = "What to learn";

   /* let [tasksForTodoList, setTasksForTodolist] = useState([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS & ES6", isDone: true},
        {id: v1(), title: "REACT & TS", isDone: false},
        {id: v1(), title: "REDUX", isDone: false},
        {id: v1(), title: "ANGULAR", isDone: false},
    ]);*/
    /*let [filter, setFilter] = useState<FilterValuesType>("all");*/


    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        console.log(value, todolistId)
        const todolist = todolists.find(t => t.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    const removeTask = (id: string, todolistId: string) => {
        let tasks=tasksForTodoList[todolistId];
        let filterasks=tasks.filter(t=>t.id!==id)
        tasksForTodoList[todolistId]=filterTasks;
        setTasksForTodolist({...tasksForTodoList})
    };

    const addTask = (title: string, todolistId:string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false,
        }
        setTasksForTodolist([newTask, ...tasksForTodoList])
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
            {
                todolists.map((tl) => {

                    const getFilteredTasks = (tasks: TaskType[], filterValue: FilterValuesType) => {
                        let filteredTasks = tasksForTodoList[tl.id];
                        if (filterValue === "completed") {
                            filteredTasks = tasksForTodoList[tl.id].filter(elem => elem.isDone);
                        }
                        if (filterValue === "active") {
                            filteredTasks = tasksForTodoList[tl.id].filter(elem => !elem.isDone);
                        }
                        return filteredTasks;
                    }

                    return (
                        <TodoList key={tl.id}
                                  id={tl.id}
                                  title={tl.title}
                                  tasks={getFilteredTasks(tasksForTodoList[tl.id], tl.filter)}
                                  filter={tl.filter}

                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}/>
                    )
                })
            }

            {/*<TodoList title={todoListTitle}
                      tasks={getFilteredTasks(tasksForTodoList, filter)}
                      filter={filter}

                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}/>*/}
        </div>
    );
}

export default App;