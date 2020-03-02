import React from 'react';
import "./App.css";



function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [repos, setRepos] = React.useState([])
 
  React.useEffect(() => {
    if (!inputValue) {
      return;
    }

    // API Call 

    fetch("https://api.github.com/search/repositories?q=" + inputValue)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        setRepos(data.items)
      });
  }, [inputValue])

console.log(repos);

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
      <ul>
        {repos.map( repo => {
          return <li key={repo.id}>
            <a href={repo.html_url}>{repo.name}</a>
            <p>{repo.description}</p>
          </li>;
        })}
      </ul>
    </div>
  );
}

export default App;
