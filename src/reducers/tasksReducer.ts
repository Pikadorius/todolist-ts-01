import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {TaskType} from '../TodoList';

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'ADD-TASK': {
            let task:TaskType = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId],task]}
        }
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t=>t.id!==action.payload.id)}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t=>t.id===action.payload.id? {...t, isDone: action.payload.isDone }:t)}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t=>t.id===action.payload.id? {...t, title: action.payload.newTitle}:t)}
        }
        case 'ADD-TASKS-TO-NEW-TODOLIST': {
            return {[action.payload.newTodolistId]: [], ...state}
        }
        case 'DELETE-TASKS': {
            let newState={...state}
            delete newState[action.payload.id]
            return newState
        }
        default: return state;
    }
}

export type ActionsType =
    RemoveTaskACType |
    AddTaskACType |
    ChangeTaskStatusACType |
    ChangeTaskTitleACType |
    AddTasksToTodolistACType |
    DeleteTasksFromTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id,
            todolistId
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}


type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            id,
            isDone,
            todolistId
        }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            id,
            newTitle,
            todolistId
        }
    } as const
}

type AddTasksToTodolistACType = ReturnType<typeof addTasksToTodolistAC>
export const addTasksToTodolistAC = (newTodolistId: string) => {
    return {
        type: 'ADD-TASKS-TO-NEW-TODOLIST',
        payload: {
            newTodolistId
        }
    } as const
}

type DeleteTasksFromTodolistACType = ReturnType<typeof deleteTasksFromTodolistAC>
export const deleteTasksFromTodolistAC = (id: string) => {
    return {
        type: 'DELETE-TASKS',
        payload: {
            id
        }
    } as const
}