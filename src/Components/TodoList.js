import React, { useEffect, useState } from "react";
import "../style/TodoListCSS.css"; // Import CSS for styling
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");

  const { logout } = useAuth();

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/items");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (task.trim()) {
      try {
        let taskObj = { text: task, completed: false };
        const response = await axios.post(
          "http://localhost:8080/items",
          taskObj
        );
        setTasks([...tasks, response.data]);
        setTask("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const updateTodo = async (taskObj) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/items/${taskObj.id}`,
        taskObj
      );
      const updatedTodos = tasks.map((todo) =>
        todo.id === taskObj.id ? response.data : todo
      );
      setTasks(updatedTodos);
      setIsEditing(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/items/${id}`);
      setTasks(tasks.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleComplete = (id, completed) => {
    updateTodo({
      text: tasks.filter((item) => item.id === id)[0].text,
      completed: completed,
      id: id,
    });
  };

  const editTask = (index, id) => {
    let text = tasks.filter((item) => item.id === id)[0].text;
    setEditText(text);
    setIsEditing(index);
  };

  return (
    <div className="todo-container">
      <div style={{ textAlign: "end", cursor: "pointer" }} onClick={logout}>
        Logout
      </div>
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.length > 0 &&
          tasks.map((t, index) => (
            <li key={t.id} className="task-item">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={(e) => toggleComplete(t.id, e.target.checked)}
              />
              {isEditing === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      updateTodo({
                        text: editText,
                        completed: t.completed,
                        id: t.id,
                      })
                    }
                  >
                    Save
                  </button>
                </>
              ) : (
                <span className={t.completed ? "completed" : ""}>{t.text}</span>
              )}
              {!t.completed && isEditing !== index && (
                <button
                  className="edit-btn"
                  onClick={() => editTask(index, t.id)}
                >
                  Edit
                </button>
              )}
              <button className="delete-btn" onClick={() => deleteTodo(t.id)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TodoList;
