import React from "react";
import { Link } from "react-router-dom";

const TaskTaskDetails = (props) => {
  const { Tasks, onDeleteTask } = props;
  const { Title, Priority, id } = Tasks;
  const editURL = `/update/${id}`;
  console.log(props)

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
            <button className="btn btn-danger" onClick={onDeleteTask}> Delete</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TaskTaskDetails;
