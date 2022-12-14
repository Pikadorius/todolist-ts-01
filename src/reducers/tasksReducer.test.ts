import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './tasksReducer';
import {addTodolistAC, removeTodolistAC} from './todolistsReducer';

let tasks: TasksStateType;
let todoId1 = v1()
let todoId2 = v1()

beforeEach(() => {
    tasks = {
        [todoId1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        [todoId2]: [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true}
        ]
    }
})

test('reducer should delete correct task', () => {

    let newTasks = tasksReducer(tasks, removeTaskAC('1', todoId1))

    expect(newTasks[todoId1][0].title).toBe('JS')
    expect(tasks[todoId1][0].title).toBe('HTML&CSS')
    expect(newTasks[todoId1].every(t=>t.id!=='1')).toBeTruthy()

    expect(newTasks[todoId1].length).toBe(1)
    expect(tasks[todoId1].length).toBe(2)
})

test('reducer should added task to correct todo', () => {

    let newTasks = tasksReducer(tasks, addTaskAC('Meat', todoId2))

    expect(newTasks[todoId2].length).toBe(3)
    expect(tasks[todoId2].length).toBe(2)
    expect(newTasks[todoId2][2].title).toBe('Meat')
    expect(newTasks[todoId2][2].id).toBeDefined()
})

test('reducer should change correct task status in correct todo', () => {

    let newTasks = tasksReducer(tasks, changeTaskStatusAC('2', false, todoId2))

    expect(newTasks[todoId2][1].isDone).toBe(false)
    expect(tasks[todoId2][1].isDone).toBe(true)
})

test('reducer should change correct task title in correct todo', () => {

    let newTasks = tasksReducer(tasks, changeTaskTitleAC('2', 'React', todoId1))

    expect(newTasks[todoId1][1].title).toBe('React')
    expect(tasks[todoId1][1].title).toBe('JS')
})


test('reducer should added empty tasks array', () => {
    let newTodoID=v1()
    let newTasks = tasksReducer(tasks, addTodolistAC(''))

    expect(newTasks[newTodoID]).toStrictEqual([])
    expect(tasks[newTodoID]).toBeUndefined()
})

test('reducer should deleted correct tasks array', () => {

    let newTasks = tasksReducer(tasks, removeTodolistAC(todoId1))

    expect(newTasks[todoId1]).toBeUndefined()
    expect(tasks[todoId1]).toStrictEqual([
        {id: '1', title: "HTML&CSS", isDone: true},
        {id: '2', title: "JS", isDone: true}
    ])
})


test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTaskAC('juice', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})




test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = changeTaskStatusAC('2', false, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(startState['todolistId2'][1].isDone).toBe(true)
})



test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})