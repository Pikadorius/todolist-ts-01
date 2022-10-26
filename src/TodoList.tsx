import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import Button from './Button';

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>("")

    const addNewTask = () => {
        const trimmedTitle = title.trim()
        trimmedTitle ? props.addTask(trimmedTitle) : setTitle("");
        setTitle("")
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value);

    const changeFilterHandlerCreator = (filter: FilterValuesType) => {
        return (
            () => props.changeFilter(filter)
        )
    }

    const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        event.ctrlKey && event.key === "Enter" && addNewTask()  //работает как if, прерывается на false
    }

    /*const setFilterAll=()=>props.changeFilter("all")
    const setFilterActive=()=>props.changeFilter("active")
    const setFilterCompleted=()=>props.changeFilter("completed")*/

    const tasksJSXItemsList = props.tasks.length ?
        <ul>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(task.id);
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={removeTask}>x</button>
                            <Button name={'х'} callBack={removeTask}/>
                        </li>
                    )
                })
            }
        </ul> : <span>Your list is empty!</span>;

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyDown={onEnter}/>
                <button onClick={addNewTask}>+</button>
            </div>
            {tasksJSXItemsList}
            <div>
                <button onClick={changeFilterHandlerCreator('all')}>All</button>
                <button onClick={changeFilterHandlerCreator('active')}>Active</button>
                <button onClick={changeFilterHandlerCreator('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;
