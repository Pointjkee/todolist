import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditSpanType = {
    title: string
    changeTitle: (title: string) => void
}
export const EditSpan = (props: EditSpanType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.changeTitle(title)
        }
    }
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }
    const onEditMode = () => {
        props.changeTitle(title)
        setEditMode(true)
    }
    return (
        editMode
            ? <TextField
                size={'small'}
                id="outlined-basic"
                label="Text area"
                variant="outlined"
                onBlur={offEditMode}
                autoFocus={true}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}/>
            : <span onDoubleClick={onEditMode}>
                {props.title}
        </span>
    )
}