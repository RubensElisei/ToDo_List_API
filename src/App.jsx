import React from 'react';
import MyComponent from './MyComponent'; 
import './index.css'; 

function App() {
  return (
    <div className="App">
      <MyComponent /> {/* Renderiza o MyComponent que já inclui o TaskForm e a lista de tarefas */}
    </div>
  );
}

export default App;
