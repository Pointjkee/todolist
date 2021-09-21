import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditSpan} from "./EditSpan";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaksTitle: (taskID: string, title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodolistTitle: (tID: string, title: string) => void
}

function TodoList(props: TodoListPropsType) {
    const tasksList = props.tasks.map(t => {
        const changeStatus =
            (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        const changeTitle = (title: string) => {
            props.changeTaksTitle(t.id, title, props.id)
        }

        return (
            <li key={t.id} className={!t.isDone ? "notCompleted" : ""}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <EditSpan title={t.title} changeTitle={changeTitle}/>
                <button onClick={() => props.removeTask(t.id, props.id)}>x</button>
            </li>
        )
    })

    const setAllFilter = () => props.changeTodoListFilter("all", props.id)
    const setActiveFilter = () => props.changeTodoListFilter("active", props.id)
    const setCompletedFilter = () => props.changeTodoListFilter("completed", props.id)


    let allBtnClass = "";
    if (props.filter === "all") {
        allBtnClass = "active-filter"
    }
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodoTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }
    return (
        <div>
            <h3>
                <EditSpan title={props.title} changeTitle={changeTodoTitle}/>
                <button onClick={() => props.removeTodoList(props.id)}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button
                    className={allBtnClass}
                    onClick={setAllFilter}>All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={setActiveFilter}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={setCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;