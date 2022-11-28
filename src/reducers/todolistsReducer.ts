import {FilterValuesType, TodolistType} from '../App';

export const todolistsReducer = (state: TodolistType[], action: ActionsType):TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            let newTodolist:TodolistType = {id: action.payload.newTodolistId, title: action.payload.title, filter: 'all'};
            return [newTodolist, ...state];
        }
        case 'REMOVE-TODOLIST': {
            return state.filter((t=>t.id!==action.payload.id))
        }
        case 'CHANGE-TODOLIST-TITLE': {
            // const todolist = state.find(tl => tl.id === action.payload.id);
            // if (todolist) {
            //     // если нашёлся - изменим ему заголовок
            //     todolist.title = action.payload.title;
            //     return [...state]
            return state.map(t=>t.id===action.payload.id?{...t, title: action.payload.title}:t)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            // let todolist = state.find(tl => tl.id === action.payload.id);
            // if (todolist) {
            //     todolist.filter = action.payload.filter;
            //     return [...state]
            // }
            // else return state;
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

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, newTodolistId: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            newTodolistId
        }
    } as const
}

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
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





