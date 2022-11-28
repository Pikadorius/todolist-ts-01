import {TodolistType} from "../App";
import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolistsReducer";

let todolists:TodolistType[]
let todolistId1=v1()
let todolistId2=v1()

beforeEach(()=>{

    todolists=[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('reducer should remove correct todolist', ()=>{
    let newTodos=todolistsReducer(todolists, removeTodolistAC(todolistId1))

    expect(newTodos.length).toBe(1)
    expect(newTodos[0].title).toBe("What to buy")
})

test('reducer should add new todolist', ()=>{
    let newId=v1()
    let newTitle='What to do:'
    let newTodos=todolistsReducer(todolists, addTodolistAC(newTitle, newId))

    expect(newTodos.length).toBe(3)
    expect(newTodos[0].id).toBe(newId)
    expect(newTodos[0].title).toBe(newTitle)
    expect(newTodos[0].filter).toBe('all')
})

test('reducer should change correct todolist filter', ()=>{
    let newTodos=todolistsReducer(todolists, changeTodolistFilterAC("active", todolistId1))

    expect(newTodos[0].filter).toBe('active')
    expect(newTodos[1].filter).toBe('all')

    expect(todolists[0].filter).toBe('all')
    expect(todolists[1].filter).toBe('all')
})

test('reducer should change correct todolist title', ()=>{
    let newTodos=todolistsReducer(todolists, changeTodolistTitleAC(todolistId1, 'test'))

    expect(newTodos[0].title).toBe('test')
    expect(newTodos[1].title).toBe('What to buy')

    expect(todolists[0].title).toBe('What to learn')
    expect(todolists[1].title).toBe('What to buy')
})