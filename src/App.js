import React from 'react';
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faStar, faCircle } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [repos, setRepos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState (false);
  const [error, setError] = React.useState (false);
 
  React.useEffect(() => {
    if (!inputValue) {
      return;
    }
    setIsLoading(true);

    // API Call 

    fetch("https://api.github.com/search/repositories?q=" + inputValue)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        setIsLoading(false);
        setRepos(data.items)
    }).catch(err => {
        setIsLoading(false);
        setError(true);
        console.log(err);
    });
  }, [inputValue])

console.log(repos);

  return (
    <div className="Container">
      <div className= "header" >
        <a href= "https://github.com/" target="_blank" className="github_getter">GG<FontAwesomeIcon className="circle"icon={faCircle} /></a>
        </div>
          <div className="wrapper">
            <form onSubmit={evt => {
              evt.preventDefault();
              setInputValue(evt.target.elements.query.value);
            }}>
            <FontAwesomeIcon className="search_icon"icon={faSearch} />
              <input 
                type="text" 
                name="query" 
                className="github_search_bar"
                placeholder="Search Keyword..."
                autoComplete="off"
              />
            </form>
            {isLoading && <div className="searching">Searching...</div>}
            {error && (
              <div>
                Unexpected Error Occurred. Please Try again
              </div>)}
            
                <ul className="repo_list">
                  {repos.sort((a, b) => {
                    if (a.stargazers_count < b.stargazers_count) return 1
                    else if (a.stargazers_count > b.stargazers_count) return -1
                    return 0
                  }).map((repo) => {         
                    return (
                    
                      <li className="repo_items"key={repo.id}>
                      <div className="row_one_details"> 
                        <a href={repo.html_url} target="_blank" className="repo_name">
                        {repo.full_name}<p>{repo.language}</p></a>
                        <p><FontAwesomeIcon className="star" icon={faStar}/>
                        {repo.stargazers_count}</p>
                        </div>
                        <p className="description">{repo.description}</p>
                        
                      </li>
                    );
                  })}
                </ul>
            
        </div>     
    </div>
  );
}


export default App;
