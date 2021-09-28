import {Button, IconButton, TextField} from '@material-ui/core';
import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {ControlPoint} from "@material-ui/icons";


type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(title)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false)
        }
        setTitle(e.currentTarget.value)
    }
    return (
        <div>
            <TextField
                size={'small'}
                multiline
                maxRows={4}
                id="outlined-basic"
                label="Text area"
                variant="outlined"
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                // className={error ? "error" : ""}
                error={!!error}
                helperText={error && 'ERROR!!!'}
            />
            <IconButton onClick={addItem}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
}