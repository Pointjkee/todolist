import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

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
            <TodoList // TodoList()
                id={tl.id}
                key={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForRender}
                addTask={addTask}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeTaksTitle={changeTaksTitle}
                changeTaskStatus={changeTaskStatus}
                changeTodoListFilter={changeTodoListFilter}
                changeTodolistTitle={changeTodolistTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoListsComponents}
        </div>
    );
}

export default App;
