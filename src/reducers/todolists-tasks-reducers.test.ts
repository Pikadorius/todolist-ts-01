import {TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {addTodolistAC, removeTodolistAC, todolistsReducer} from './todolistsReducer';
import {tasksReducer} from './tasksReducer';

let todolists: TodolistType[]
let tasks: TasksStateType
let todo1 = v1()
let todo2 = v1()

beforeEach(() => {
    todolists = [
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

test('reducers should add new todolist and tasks', () => {

    let newTodo = todolistsReducer(todolists, addTodolistAC('Test'))
    let newTasks = tasksReducer(tasks, addTodolistAC('test'))

    const keys = Object.keys(newTasks)
    const idFromTasks = keys[0]
    const idFromTodo = newTodo[0].id

    expect(idFromTasks).toBe(idFromTodo)
})

test('reducers should delete correct todolist and tasks', () => {

    let newTodo = todolistsReducer(todolists, removeTodolistAC(todo1))
    let newTasks = tasksReducer(tasks, removeTodolistAC(todo1))
    let keys = Object.keys(newTasks)

    expect(newTodo.length).toBe(1)
    expect(keys.length).toBe(1)
    expect(newTodo[0].id).toBe(todo2)
    expect(keys[0]).toBe(todo2)

})