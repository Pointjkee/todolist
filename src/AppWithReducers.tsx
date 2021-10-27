import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListActionCreator,
    changeTodoListFilterActionCreator,
    changeTodolistTitleActionCreator, removeTodoListActionCreator,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"

function AppWithReducers() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: 'todo1', filter: 'all'},
        {id: todoListID_2, title: 'todo2', filter: 'all'},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]:
            [
                {id: v1(), title: "JS", isDone: false},
                {id: v1(), title: "CSS", isDone: false},
                {id: v1(), title: "HTML", isDone: true},
            ],
        [todoListID_2]:
            [
                {id: v1(), title: "Milk", isDone: false},
                {id: v1(), title: "Bread", isDone: false},
                {id: v1(), title: "Meat", isDone: true},

            ]
    })
    const removeTask = (taskID: string, todoListID: string) => {
        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }
    const addTask = (title: string, todoListID: string) => {
        dispatchToTasks(addTaskAC(title, todoListID))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListID))
    }
    const changeTaksTitle = (taskID: string, title: string, todoListID: string) => {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatchToTodoLists(changeTodoListFilterActionCreator(todoListID, filter))
    }
    const removeTodoList = (todoListID: string) => {
        const action = removeTodoListActionCreator(todoListID)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    const changeTodolistTitle = (tID: string, title: string) => {
        dispatchToTodoLists(changeTodolistTitleActionCreator(tID, title))
    }
    const addTodoList = (title: string) => {
        const action = addTodoListActionCreator(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const todoListsComponents = todoLists.map(tl => {
        let tasksForRender = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForRender = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForRender = tasks[tl.id].filter(t => t.isDone)
        }
        return (
            <Grid item key={tl.id}>
                <Paper elevation={4} style={{padding: '5px 15px 10px', maxWidth: '280px'}}>
                    <TodoList // TodoList()
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForRender}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeTaksTitle={changeTaksTitle}
                        changeTaskStatus={changeTaskStatus}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTodoListFilter={changeTodoListFilter}
                    />
                </Paper>

            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge={"start"} color="inherit">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button
                        variant={"outlined"}
                        color="inherit"
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container
                fixed>
                <Grid container={true} style={{justifyContent: 'center', padding: '10px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {todoListsComponents}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithReducers