import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import { useState } from "react";

const TaskTaskDetails = (props) => {
  const { Tasks, onDeleteTask } = props;
  const { Title, Priority, _id } = Tasks;
  const editURL = `/update/${_id}`;
  const [showDelete, setShowDelete] = useState(false)
  const handleDeleteHide = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);
  //handle delete event
  const handleDeleteEvent = (e) => {
    fetch('https://todo-app37.herokuapp.com/deleteTodo?id=' + _id, {
      method: 'DELETE',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setShowDelete(false);
        }
      })
  }
  return (
    <React.Fragment>
      <div className="col-md-8">
        <div className="Task alert alert-primary p-3">
          <h3>Title : {Title}</h3>
          <h5>Priority : {Priority}</h5>
          <div className="text-right">
            <Link to={editURL}>
              <button className="btn btn-success mr-2"> Update</button>
            </Link>
            <button className="btn btn-danger" onClick={handleDeleteShow}> Delete</button>
          </div>
        </div>
      </div>

      <Modal show={showDelete} onHide={handleDeleteHide}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center"> TODO APP </Modal.Title>
        </Modal.Header>
        <Modal.Body> <h3 className="text-danger text-center">Are you sure to delete</h3> </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDeleteEvent()} > Confirm Delete </Button>
          <Button variant="secondary" onClick={handleDeleteHide}> Cancel </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default TaskTaskDetails;
