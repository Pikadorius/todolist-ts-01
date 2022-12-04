import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from './ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './reducers/todolistsReducer';
import {
    addTaskAC,
    addTasksToTodolistAC, changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTasksFromTodolistAC,
    removeTaskAC,
    tasksReducer
} from './reducers/tasksReducer';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function removeTask(id: string, todolistId: string) {
        dispatchTasks(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchTasks(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchTasks(changeTaskStatusAC(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchTasks(changeTaskTitleAC(id, newTitle,todolistId))
    }


    function addTodolist(title: string) {
        let newTodolistId = v1();
        dispatchTodolists(addTodolistAC(title,newTodolistId))
        dispatchTasks(addTasksToTodolistAC(newTodolistId))
    }

    function removeTodolist(id: string) {
        dispatchTodolists(removeTodolistAC(id))
        dispatchTasks(deleteTasksFromTodolistAC(id))
    }

    function changeTodolistTitle(id: string, title: string) {
        dispatchTodolists(changeTodolistTitleAC(id, title))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchTodolists(changeTodolistFilterAC(value, todolistId))
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container spacing={3}>
                    <Paper style={{margin: '20px'}}  elevation={3}><AddItemForm addItem={addTodolist}/></Paper>
                    <button onClick={()=> {
                        console.log(tasks)
                        console.log(todolists)
                    }}>log</button>
                </Grid>
                <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        let tasksForTodolist = allTodolistTasks;

                        if (tl.filter === "active") {
                            tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                        }

                        return <Grid item key={tl.id} padding={'20px'}>
                            <Paper  elevation={3} style={{padding: '20px'}}><Todolist
                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            /></Paper>
                        </Grid>
                    })
                }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
