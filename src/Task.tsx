import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditSpan} from "./EditSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./App";

type TaskPropsType = {
    task: TaskType,
    changeTaskStatus: (taskID: string, isDone: boolean) => void,
    changeTaksTitle: (taskID: string, title: string) => void,
    removeTask: (taskID: string) => void,
}

export const Task = React.memo((props: TaskPropsType) => {
    const changeStatus =
        useCallback((e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus
        (props.task.id, e.currentTarget.checked), [props.changeTaskStatus, props.task.id])
    const changeTitle = useCallback((title: string) => {
        props.changeTaksTitle(props.task.id, title)
    }, [props.changeTaksTitle, props.task.id])
    const removeTask = useCallback(() => props.removeTask(props.task.id), [props.removeTask, props.task.id])

    return (
        <ListItem
            style={{padding: '0px', margin: '0px'}}
            // key={t.id}
            className={!props.task.isDone ? "notCompleted" : ""}>
            <Checkbox
                size={'small'}
                defaultChecked
                checked={props.task.isDone}
                onChange={changeStatus}
            />
            <EditSpan title={props.task.title} changeTitle={changeTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
})