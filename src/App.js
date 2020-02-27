import React from 'react';
import "./App.css";


// https://api.github.com/search/repositories?q=doris

function App() {
  const [inputValue, setInputValue] = React.useState("")
  console.log(inputValue)
 
  return (
    <div>
      <form onSubmit={evt => {
        evt.preventDefault();
        setInputValue(evt.target.elements.query.value);
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
