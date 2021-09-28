import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TasksType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListID_1, title: 'todo1', filter: 'all'},
        {id: todoListID_2, title: 'todo2', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
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
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks({...tasks})
    }
    const changeTaksTitle = (taskID: string, title: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        setTasks({...tasks})
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(f => f.id !== todoListID))
        delete tasks[todoListID]
    }
    const changeTodolistTitle = (tID: string, title: string) => {
        setTodoLists(todoLists.map(t => t.id === tID ? {...t, title} : t))
    }
    const addTodoList = (title: string) => {
        const todoListID = v1()
        const todolist: TodoListsType = {
            id: todoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, todolist])
        setTasks({...tasks, [todoListID]: []})
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

                <Paper elevation={4} style={{padding: '5px 15px 10px', maxWidth:'280px'}} >
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
                <Grid container={true} spacing={5} >
                    {todoListsComponents}
                </Grid>
            </Container>

        </div>
    );
}

export default App;
