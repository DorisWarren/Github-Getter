import React from 'react';
import "./App.css";



function App() {
  const [inputValue, setInputValue] = React.useState("")
 
  React.useEffect(() => {
    if (!inputValue) {
      return;
    }

    // API Call 

    fetch("https://api.github.com/search/repositories?q=doris" + inputValue)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      });
  }, [inputValue])

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
