import React from 'react';
import {TaskType} from "./App";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>
}

const TodoList = (props: TodoListPropsType) => {
    debugger
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
                                <button>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;
