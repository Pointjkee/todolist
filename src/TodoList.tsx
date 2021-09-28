import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditSpan} from "./EditSpan";
import {Button, Checkbox, IconButton, List, ListItem} from '@material-ui/core';
import {Delete, DeleteOutline} from '@material-ui/icons';


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
            <ListItem
                style={{padding:'0px', margin:'0px'}}
                key={t.id}
                className={!t.isDone ? "notCompleted" : ""}>
                <Checkbox
                    size={'small'}
                    defaultChecked
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <EditSpan title={t.title} changeTitle={changeTitle}/>
                <IconButton onClick={() => props.removeTask(t.id, props.id)}>
                    <Delete/>
                </IconButton>
            </ListItem>
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
                <IconButton onClick={() => props.removeTodoList(props.id)}>
                    <DeleteOutline/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksList}
            </List>
            <div>
                <Button
                    size={"small"}
                    className={allBtnClass}
                    onClick={setAllFilter}
                    variant={props.filter === "all" ? "contained" : "outlined"}
                >All
                </Button>
                <Button
                    size={"small"}
                    style={{margin: '0 3px'}}
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    className={activeBtnClass}
                    onClick={setActiveFilter}>Active
                </Button>
                <Button
                    size={"small"}
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    onClick={setCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;