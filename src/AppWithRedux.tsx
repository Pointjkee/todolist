import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListActionCreator,
    changeTodoListFilterActionCreator,
    changeTodolistTitleActionCreator, removeTodoListActionCreator,

} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

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

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }, [dispatch])
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }, [dispatch])
    const changeTaksTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }, [dispatch])

    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterActionCreator(todoListID, filter))
    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        const action = removeTodoListActionCreator(todoListID)
        dispatch(action)
    }, [dispatch])
    const changeTodolistTitle = useCallback((tID: string, title: string) => {
        dispatch(changeTodolistTitleActionCreator(tID, title))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        const action = addTodoListActionCreator(title)
        dispatch(action)
    }, [dispatch])

    const todoListsComponents = todoLists.map(tl => {
        /*  let tasksForRender = tasks[tl.id]
          if (tl.filter === "active") {
              tasksForRender = tasks[tl.id].filter(t => !t.isDone)
          }
          if (tl.filter === "completed") {
              tasksForRender = tasks[tl.id].filter(t => t.isDone)
          }*/
        return (
            <Grid item key={tl.id}>
                <Paper elevation={4} style={{padding: '5px 15px 10px', maxWidth: '280px'}}>
                    <TodoList // TodoList()
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasks[tl.id]}
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

export default AppWithRedux