import TodoTask from "./TodoTask";
import { Component } from "react";
import { MouseEvent } from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

type Task = {
  id: number;
  description: string;
  status: string;
};

function App() {
  let [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const url = "http://127.0.0.1:5001/tasks";
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTasks(data.tasks);
      });
  }, []);

  const handleClick = (evt: Event) => {
    console.log("click happens...");
  };

  const deleteClickGenerator = (n: Number) => {
    const mouseClickHandler = (e: MouseEvent) => {
      const urlString = "http://127.0.0.1:5001/deletetask/" + n;

      fetch(urlString, { method: "DELETE" })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("ID of task deleted: " + n);
          fetch("http://127.0.0.1:5001/tasks")
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setTasks(data.tasks);
            });
        });
    };

    return mouseClickHandler;
  };

  return (
    <>
      <div className="container">
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
