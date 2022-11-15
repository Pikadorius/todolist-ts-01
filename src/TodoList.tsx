import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import Input from './Components/Input';
import EditableSpan from './Components/EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTodolist: (todolistId: string, newTitle: string) => void
    updateTask: (todolistId: string, taskId: string, newTitle: string) => void

}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const updateTodolist = (newTitle: string) => {
        props.updateTodolist(props.id, newTitle)
    }

    const updateTaskHandler = (updatedTitle: string, taskId: string) => {
        props.updateTask(props.id, taskId, updatedTitle)
    }

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <h3><EditableSpan title={props.title} callBack={()=>updateTodolist}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <div>
            <Input callBack={addTask}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    // const updateTaskHandler = (updatedTitle: string) => {
                    //     props.updateTask(props.id, t.id, updatedTitle)
                    // }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan callBack={(updatedTitle)=>updateTaskHandler(updatedTitle, t.id)} title={t.title}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


