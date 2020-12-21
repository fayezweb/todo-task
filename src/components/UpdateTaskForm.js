import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { tasksContext } from '../App';
import { useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const UpdateTaskForm = () => {
    const { id } = useParams();
    const history = useHistory();

    const [task, setTask] = useContext(tasksContext);
    const { register, handleSubmit, errors } = useForm();

    //load single event
    const [singleTodo, setSingleTodo] = useState({});
    useEffect(() => {
        fetch('https://todo-app37.herokuapp.com/singleTodo?id=' + id)
            .then(res => res.json())
            .then(data => setSingleTodo(data))
    }, [])
    console.log(singleTodo)

    //update todo task
    const handleUpdateTask = (data) => {
        fetch('https://todo-app37.herokuapp.com/updateTodo?id=' + id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert("Task updated successfully");
                    history.push('/');
                }
            })
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center mt-S">
                <div className="col-md-8 bg-light p-4">
                    <h1 className="text-center pb-3">Update Your Task</h1>
                    <form onSubmit={handleSubmit(handleUpdateTask)}>
                        <input
                            className="form-control"
                            name="Title"
                            placeholder="Task Title"
                            defaultValue={singleTodo && singleTodo.Title}
                            ref={register({ required: true })}
                        /> <br></br>
                        <span className="text-danger">
                            {errors.Title && "Task Title is required"}
                        </span>
                        <select className="form-control" name="Priority" ref={register} defaultValue={singleTodo && singleTodo.Priority}>
                            <option value="Low">Low</option>
                            <option value="Mediun">Medium</option>
                            <option value="High">High</option>
                        </select>
                        {errors.Priority && "Task Priority is required"}
                        <br></br>
                        <input className="btn btn-success" type="submit" value="Confirm Update" />
                    </form>
                    <div className="text-right">
                        <Link to='/home'>
                            <button className="btn btn-secondary">Go Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTaskForm;