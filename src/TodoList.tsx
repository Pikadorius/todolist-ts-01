import React from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id:string)=>void
    changeFilter: (value: FilterValuesType) => void
}

const TodoList = (props: TodoListPropsType) => {

    const tasksJSXItemsList = props.tasks.length ?
        <ul>
            {
                props.tasks.map((task, index) => {
                    return (
                        <li key={index}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => props.removeTask(task.id)}>x</button>
                        </li>
                    )
                })
            }
        </ul> : <span>Your list is empty!</span>;

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasksJSXItemsList}
            <div>
                <button onClick={()=>props.changeFilter("all")}>All</button>
                <button onClick={()=>props.changeFilter("active")}>Active</button>
                <button onClick={()=>props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;
