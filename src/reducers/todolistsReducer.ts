import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export const todolistsReducer = (state: TodolistType[], action: ActionsType):TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            let newTodolist:TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'};
            return [newTodolist, ...state];
        }
        case 'REMOVE-TODOLIST': {
            return state.filter((t=>t.id!==action.payload.id))
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t=>t.id===action.payload.id?{...t, title: action.payload.title}:t)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t=>t.id===action.payload.id?{...t, filter:action.payload.filter}:t)
        }
        default:
            throw new Error('Bad action!')
    }
}

export type ActionsType =
    AddTodolistACType
    | RemoveTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistId: v1()
        }
    } as const
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
}

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            filter,
            id
        }
    } as const
}





