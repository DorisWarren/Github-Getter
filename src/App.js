import React from 'react';
import "./App.css";


function App() {
  return (
    <div>
      <form onSubmit={(evt) => {
        console.log("onSubmit took place")
      }}>
        <input 
          type="text" 
          name="query" 
          placeholder="Search Github Repositories"
        />
      </form>
    </div>
  );
}

export default App;
