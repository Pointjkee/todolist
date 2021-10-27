import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditSpan} from "./EditSpan";
import {Button, Checkbox, IconButton, List, ListItem} from '@material-ui/core';
import {Delete, DeleteOutline} from '@material-ui/icons';
import {Task} from "./Task";


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

const TodoList = React.memo((props: TodoListPropsType) => {

    const setAllFilter = () => props.changeTodoListFilter("all", props.id)
    const setActiveFilter = () => props.changeTodoListFilter("active", props.id)
    const setCompletedFilter = () => props.changeTodoListFilter("completed", props.id)

    const removeTask = useCallback((taskID: string) => props.removeTask(taskID, props.id), [])
    const changeTaksTitle = useCallback((taskID: string, title: string) => props.changeTaksTitle(taskID, title, props.id), [])
    const changeTaskStatus = useCallback((taskID: string, isDone: boolean) => props.changeTaskStatus(taskID, isDone, props.id), [])

    let tasksForRender = props.tasks
    if (props.filter === "active") {
        tasksForRender = tasksForRender.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForRender = tasksForRender.filter(t => t.isDone)
    }

    let allBtnClass = "";
    if (props.filter === "all") {
        allBtnClass = "active-filter"
    }
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const changeTodoTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id])

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
                {tasksForRender.map(t => {
                    return (
                        <Task
                            key={t.id}
                            task={t}
                            changeTaskStatus={changeTaskStatus}
                            changeTaksTitle={changeTaksTitle}
                            removeTask={removeTask}
                        />
                    )
                })
                }
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
})

export default TodoList;