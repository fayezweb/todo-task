
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";
import NotMatch from "./components/NotMatch";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import UpdateTaskForm from "./components/UpdateTaskForm";

//create task context
export const tasksContext = createContext();

function App() {
  const [task, setTask] = useState([]);
  useEffect(() => {
    fetch('https://todo-app37.herokuapp.com/loadTodo')
      .then(res => res.json())
      .then(todoData => setTask(todoData))
  }, [task]);

  return (
    <tasksContext.Provider value={[task, setTask]} className="apps">
      <Router>
        <Switch>
          <Route exact path="/">
            <Task />
          </Route>
          <Route exact path="/home">
            <Task />
          </Route>
          <Route path='/taskForm'>
            <TaskForm />
          </Route>
          <Route path='/update/:id'>
            <UpdateTaskForm />
          </Route>
          <Route path='*'>
            <NotMatch />
          </Route>
        </Switch>
      </Router>
    </tasksContext.Provider>
  );
}

export default App;
