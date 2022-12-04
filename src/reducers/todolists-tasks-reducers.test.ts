import {TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {addTodolistAC, todolistsReducer} from './todolistsReducer';
import {addTasksToTodolistAC, tasksReducer} from './tasksReducer';

let todolists:TodolistType[]
let tasks:TasksStateType
let todo1=v1()
let todo2=v1()

beforeEach(()=>{
    todolists=[
        {id: todo1, title: "What to learn", filter: "all"},
        {id: todo2, title: "What to buy", filter: "all"}
    ]

    tasks = {
        [todo1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        [todo2]: [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true}
        ]
    }
})

test('reducers should add new todolist and tasks', ()=>{
    let newId=v1()

    let newTodo=todolistsReducer(todolists,addTodolistAC('Test', newId))
    let newTasks=tasksReducer(tasks, addTasksToTodolistAC(newId))

    const keys=Object.keys(newTasks)
    const idFromTasks=keys[0]
    const idFromTodo=newTodo[0].id

    expect(idFromTasks).toBe(idFromTodo)
    expect(idFromTasks).toBe(newId)
    expect(idFromTodo).toBe(newId)
})