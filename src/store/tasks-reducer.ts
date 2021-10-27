import {TasksType, TaskType} from "../App";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";
import {v1} from "uuid";


export  type FirstActionType = {
    type: "REMOVE_TASK",
    taskId: string,
    todoListId: string
}
export  type SecondActionType = {
    type: "ADD_TASK",
    todoListId: string,
    title: string
}
export  type changeTaskStatusActionType = {
    type: "CHANGE_TASK_STATUS",
    taskID: string
    isDone: boolean
    todoListID: string
}
export  type changeTaskTitleActionType = {
    type: "CHANGE_TASK_TITLE",
    taskID: string
    title: string
    todoListID: string
}
let initialState: TasksType = {}

export type ActionType = FirstActionType | SecondActionType | changeTaskStatusActionType
    | changeTaskTitleActionType | AddTodoListActionType | RemoveTodoListActionType

export const tasksReducer = (state: TasksType = initialState, action: ActionType): TasksType => {
    switch (action.type) {
        case "REMOVE_TASK":
            // state[action.todoListId] = state[action.todoListId].filter(t => t.id !== action.taskId)
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        case "ADD_TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
        case "CHANGE_TASK_STATUS":
            return {...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case "CHANGE_TASK_TITLE":
            return {...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case "ADD-TODOLIST" :
            return {...state, [action.todoListId]: []}
        case "REMOVE-TODOLIST" :
            let copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        default:
            return state
    }
}
export const removeTaskAC = (taskId: string, todoListId: string): FirstActionType => {
    //do something
    return {
        type: "REMOVE_TASK",
        taskId,
        todoListId
    }
}
export const addTaskAC = (title: string, todoListId: string): SecondActionType => {
    //do something
    return {
        type: "ADD_TASK",
        title,
        todoListId,
    }
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): changeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        taskID,
        isDone,
        todoListID
    }
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): changeTaskTitleActionType => {
    return {
        type: 'CHANGE_TASK_TITLE',
        taskID,
        title,
        todoListID
    }
}
