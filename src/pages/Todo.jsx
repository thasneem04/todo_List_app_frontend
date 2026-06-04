import React, { useEffect, useState } from "react";
import axios from "axios";

function Todo() {
  const [todos, setTodos] = useState([]);

  const [text, setText] = useState("");

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  async function getTodos(signal) {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/todos",
        {
          signal: signal,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodos(response.data);
    } catch (err) {
      if (err.name !== "CanceledError") {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    getTodos(controller.signal);

    return () => {
      controller.abort();
      console.log("Request Abort");
    };
  }, []);

  async function addTodo() {
    if (text === "") return;

    const newTodo = {
      text: text,
    };

    await axios.post(
      "http://localhost:5000/api/todos",
      newTodo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setText("");

    getTodos();
  }

  async function deleteTodo(id) {
    await axios.delete(
      `http://localhost:5000/api/todos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getTodos();
  }

  async function editTodo(todo) {
    setText(todo.text);

    setEditId(todo._id);
  }

  async function updateTodo() {
    const updatedTodo = {
      text: text,
    };

    await axios.put(
      `http://localhost:5000/api/todos/${editId}`,
      updatedTodo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setText("");

    setEditId(null);

    getTodos();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>CRUD Operation</h1>

      <input
        type="text"
        placeholder="Enter todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {editId ? (
        <button onClick={updateTodo}>Update</button>
      ) : (
        <button onClick={addTodo}>Add</button>
      )}

      {todos.map((todo) => (
        <h1 key={todo._id}>
          {todo.text}

          <button onClick={() => editTodo(todo)}>
            Edit
          </button>

          <button
            onClick={() => deleteTodo(todo._id)}
          >
            Delete
          </button>
        </h1>
      ))}
    </div>
  );
}

export default Todo;