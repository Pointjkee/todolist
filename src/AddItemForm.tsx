import React, {useState, KeyboardEvent, ChangeEvent} from 'react';


type AddItemFormType = {
    addItem: (title: string) => void
  }

export const AddItemForm = (props:AddItemFormType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
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
        if(error){
            setError(false)
        }
        setTitle(e.currentTarget.value)
    }
    return (
        <div>
            <input
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div style={{color: "red"}}>Title is required!</div>}
        </div>
    )
}