import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { tasksContext } from '../App';
import TaskTaskDetails from './TaskDetails';
import TaskHeader from './TaskHeader';
import axios from 'axios'
import './Css/Task.css'
import ReactPaginate from 'react-paginate';
const Task = (props) => {
    const [task, setTask] = useContext(tasksContext);
    const [searchTasks, setSearchTask] = useState([]);
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(2);
    const [pageCount, setPageCount] = useState(0)
    useEffect(() => {
        setSearchTask(task);
    }, [task]);
    console.log(pageCount)
    //handle delete task
    const onDeleteTask = (index) => {
        const tasks = task;
        const deleteTask = tasks.splice(index, 1);
        const filterTasks = task.filter(taskData => taskData.index !== index);
        setTask(filterTasks);
        localStorage.setItem('Tasks', JSON.stringify(task));
    }
    // handle filter task
    const handleOnChange = (e) => {
        const newValue = e.target.value.toLowerCase();
        if (newValue.length > 0) {
            const searchData = task.filter(function (item) {
                const itemData = item.Title + ' ' + item.Priority + ' ' + item.id;
                const textData = newValue;
                return itemData.toLowerCase().indexOf(textData) > -1;
            });
            setSearchTask(searchData);
        } else {
            setSearchTask(task)
        }
    }

    //pagination 
    // const handlePageClick = (e) => {
    //     const selectedPage = e.selected;
    //     setOffset(selectedPage + 1)
    // };
    // const slice = searchTasks.slice(offset, offset + perPage);

    // useEffect(() => {
    //     setPageCount(Math.ceil(searchTasks.length / perPage));
    //     localStorage.setItem('storePageCount', JSON.stringify(pageCount))
    // }, [pageCount]);
    // const getPageCout = () => {
    //     const getPageCount = localStorage.getItem('Tasks');
    //     if (typeof getPageCount !== 'undefined' && getPageCount !== null) {
    //         const page = JSON.parse(getPageCount);
    //         setPageCount(page);
    //     }
    // }
    // useEffect(() => {
    //     getPageCout();
    // }, [])
    return (
        <div>
            <TaskHeader />
            <div className="row justify-content-center pt-3 m-3">
                <div className="col-md-8 mb-3">
                    <div className="d-flex">
                        <input type="text" placeholder="Search by title" className="form-control" onChange={handleOnChange} />
                    </div>
                </div>

                {
                    searchTasks.length ?
                        typeof task !== undefined && task !== null && task.map((data, index) => (
                            <TaskTaskDetails Tasks={data} key={data._id}></TaskTaskDetails>
                        ))
                        :
                        <h1 className="text-success text-center">No task available right now! <br></br>
                            Please add your task or <br></br> Search a valid task
                        </h1>
                }


            </div>
            {
                searchTasks.length > 2 && <div className="row justify-content-center">
                    {/* <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} /> */}
                </div>
            }
        </div >
    );
};

export default Task;