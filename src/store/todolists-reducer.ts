import {v1} from "uuid";
import {FilterValuesType, TodoListsType} from "../App";

export  type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST",
    todoListId: string
}
export  type AddTodoListActionType = {
    type: "ADD-TODOLIST",
    title: string,
    todoListId: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    tID: string,
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todoListID: string
}

let initialState: Array<TodoListsType> = []

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodolistTitleActionType
    | ChangeTodoListFilterActionType

export const todolistsReducer = (todoLists: Array<TodoListsType> = initialState, action: ActionType): Array<TodoListsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(f => f.id !== action.todoListId)
        case "ADD-TODOLIST":
            const todolist: TodoListsType = {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            }
            return [...todoLists, todolist]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(t => t.id === action.tID ? {...t, title: action.title} : t)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }
}

export const removeTodoListActionCreator = (todoListId: string): RemoveTodoListActionType => {
    //do something
    return {
        type: "REMOVE-TODOLIST",
        todoListId: todoListId
    }
}
export const addTodoListActionCreator = (title: string): AddTodoListActionType => {
    //do something
    return {
        type: "ADD-TODOLIST",
        title,
        todoListId: v1()
    }
}
export const changeTodolistTitleActionCreator = (todoListId: string, title: string): ChangeTodolistTitleActionType => {
    //do something
    return {
        type: "CHANGE-TODOLIST-TITLE",
        tID: todoListId,
        title
    }
}
export const changeTodoListFilterActionCreator = (todoListId: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    //do something
    return {
        type: "CHANGE-TODOLIST-FILTER",
        filter,
        todoListID: todoListId
    }
}