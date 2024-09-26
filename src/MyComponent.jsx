import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

const API_URL = 'https://66f2f4e071c84d8058775ceb.mockapi.io/todos';

const MyComponent = () => {
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoTitle, setEditTodoTitle] = useState('');
  const [editTodoPriority, setEditTodoPriority] = useState('Baixa');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };
    fetchTodos();
  }, []);

  const addTask = async (newTask) => {
    try {
      const response = await axios.post(API_URL, {
        task: newTask.task,
        priority: newTask.priority,
        completed: false,
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const updateTask = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, {
        task: editTodoTitle,
        priority: editTodoPriority,
        completed: false,
      });
      setTodos(todos.map(todo => todo.id === id ? { ...todo, task: editTodoTitle, priority: editTodoPriority } : todo));
      setEditTodoId(null);
      setEditTodoTitle('');
      setEditTodoPriority('Baixa');
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Erro ao remover tarefa:', error);
    }
  };

  const startEdit = (todo) => {
    setEditTodoId(todo.id);
    setEditTodoTitle(todo.task);
    setEditTodoPriority(todo.priority);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Baixa':
        return 'green';
      case 'Média':
        return 'orange';
      case 'Alta':
        return 'red';
      default:
        return 'black'; // Cor padrão caso não encontre
    }
  };

  return (
    <div className="todo-container">
      <h1>Lista de Tarefas</h1>
      <TaskForm addTask={addTask} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTodoTitle}
                  onChange={(e) => setEditTodoTitle(e.target.value)}
                />
                <select value={editTodoPriority} onChange={(e) => setEditTodoPriority(e.target.value)}>
                  <option value="Baixa">Baixa Prioridade</option>
                  <option value="Média">Média Prioridade</option>
                  <option value="Alta">Alta Prioridade</option>
                </select>
                <button onClick={() => updateTask(todo.id)}>Salvar</button>
                <button onClick={() => setEditTodoId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <span className="task-text">{todo.task}</span>
                <span className="priority" style={{ color: getPriorityColor(todo.priority) }}>
                  {todo.priority}
                </span>
                <button className="edit-button" onClick={() => startEdit(todo)}>Editar</button>
                <button className="delete-button" onClick={() => handleDeleteTodo(todo.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
