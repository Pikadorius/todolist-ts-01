import React from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: Function
    changeFilter: (value: FilterValuesType) => void
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((elem) => {
                        return (
                            <li>
                                <input type="checkbox" checked={elem.isDone}/>
                                <span>{elem.title}</span>
                                <button onClick={ () => props.removeTask(elem.id) }>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={()=>props.changeFilter("all")}>All</button>
                <button onClick={()=>props.changeFilter("active")}>Active</button>
                <button onClick={()=>props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;
