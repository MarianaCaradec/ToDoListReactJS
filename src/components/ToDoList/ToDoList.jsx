import React, { useState } from 'react'

import './ToDoList.css'

import { v4 as uuidv4 } from 'uuid';


const ToDoList = () => {
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState('')

    const addTask = () => {
        if(task.trim()) {
            const newTask = {
                id: uuidv4(),
                text: task,
                isNotDone: true
            }
            setTasks([...tasks, newTask])
            setTask('')
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            addTask()
        }
    }

    const taskDone = (id) => {
        const currentTasks = tasks.map(task => task.id === id ? 
            {...task, isNotDone: !task.isNotDone} 
            : task)
        setTasks(currentTasks)
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    return (
        <div className= 'form'>
            <div>
                <label>Tarea</label>
                <input type="text" value={task} 
                onChange={(e) => setTask(e.target.value)} 
                onKeyDown={handleKeyDown}/>
                <button className='buttonAdd' onClick={()=>addTask()} >Agregar tarea</button>
            </div>
            <div>
                <ul className='list'>
                    {tasks.length > 0 ? tasks.map((task) => (
                            <li key={task.id}>
                                <button className={!task.isNotDone ? 'taskDone' : 'task'}  
                                onClick={() => taskDone(task.id)}> {task.text} </button> 
                                <button onClick={() => deleteTask(task.id)}>Eliminar tarea</button>
                            </li>
                    )) : <p>No hay tareas añadidas en este momento</p>}
                </ul>
            </div>
        </div>
    )
}

export default ToDoList