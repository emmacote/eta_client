import TodoTask from "./TodoTask";
import { Component } from "react";
import { MouseEvent } from "react";
import { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

type Task = {
  id: number;
  description: string;
  status: string;
};

function App() {
  const [newTask, setNewTask] = useState("");

  let [tasks, setTasks] = useState<Task[]>([]);

  const refreshTaskList = () => {
    const url = "http://127.0.0.1:5001/tasks";
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTasks(data.tasks);
      });
  };

  useEffect(() => {
    refreshTaskList();
  }, []);

  const handleClick = (evt: MouseEvent) => {
    console.log("click happens...");
  };

  const deleteClickGenerator = (n: Number) => {
    const mouseClickHandler = (e: MouseEvent) => {
      const urlString = "http://127.0.0.1:5001/deletetask/";

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskid: n }),
      };

      fetch(urlString, options)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          refreshTaskList();
        });
    };

    return mouseClickHandler;
  };

  const addTaskClickHandler = (e: MouseEvent) => {
    const urlString = "http://127.0.0.1:5001/addtask";

    const json_data = {
      task_name: newTask,
      completion_status: "not yet completed",
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json_data),
    };

    fetch(urlString, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        refreshTaskList();
      });
  };

  const tfTaskChange = (e: ChangeEvent) => {
    // TODO: Property "value" does not exists on type "EventTarget & Element"
    // It technically works but it probably does need to be fixed at some point.
    setNewTask(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="form-group">
              <label htmlFor="tfNewTask">
                <b>New Task: </b>
              </label>
              <input
                type="text"
                name="tfNewTask"
                id="tfnewTask"
                value={newTask}
                onChange={tfTaskChange}
              />
              &nbsp;
              <button
                id="btnAddTask"
                className="btn btn-primary"
                onClick={addTaskClickHandler}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Task</th>
                  <th>Completion Status</th>
                  <th>&nbsp;</th>
                </tr>
                {tasks.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={deleteClickGenerator(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
