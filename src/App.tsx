import TodoTask from "./TodoTask";
import { Component } from "react";
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
                </tr>
                {tasks.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
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
