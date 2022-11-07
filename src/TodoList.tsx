import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string>("")
    // const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addNewTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
            setError("")
            setTitle("");
        } else {
            setError("Error! Write something")
            setTitle(title)
        }
    }

    const changeFilterHandlerCreator = (filter: FilterValuesType) => {
        return (
            () => props.changeFilter(filter, props.id)
        )
    }

    const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        setError("")
        event.ctrlKey && event.key === "Enter" && addNewTask()  //работает как if, прерывается на false
    }

    const onBlurHandler = () => {
        if (title.trim()) {
            setTitle(title)
            setError("")
        } else {
            setError('Error! Write something')
        }
    }

    /*const setFilterAll=()=>props.changeFilter("all")
    const setFilterActive=()=>props.changeFilter("active")
    const setFilterCompleted=()=>props.changeFilter("completed")*/

    const tasksJSXItemsList = props.tasks.length ?
        <ul>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(task.id);
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)

                    return (
                        <li key={task.id} className={task.isDone ? "isDone" : ""}>
                            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatus}/>
                            <span>{task.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })
            }
        </ul> : <span>Your list is empty!</span>;

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyDown={onEnter} onBlur={onBlurHandler}
                       className={error ? `errorInput` : `input`}/>
                <button onClick={addNewTask}>+</button>
            </div>
            {
                error && <div className={"error"}>{error}</div>
            }
            {tasksJSXItemsList}
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={changeFilterHandlerCreator('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={changeFilterHandlerCreator('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={changeFilterHandlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;
