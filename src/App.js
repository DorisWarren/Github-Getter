import React from 'react';
import "./App.scss";
import Header from "./Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons'


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
    
    fetch("https://api.github.com/search/repositories?q=" + inputValue)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data)
        setIsLoading(false);
        setRepos(data.items)
    }).catch(err => {
        setIsLoading(false);
        setError(true);
    });
  }, [inputValue])

  console.log(repos)

  return (
    <div className="Container">
      <Header />
        <div className="form-container">
          <form onSubmit={evt => {
            evt.preventDefault();
            setInputValue(evt.target.elements.query.value);
          }}>
           <FontAwesomeIcon className="search_icon"icon={faSearch} />
            <input 
              type="text" 
              name="query" 
              className="search_bar"
              placeholder="Search..."
              autoComplete="off"
            />
            </form>
              </div>
                <div className="result-container">
                  <div className="isLoading">
                  {isLoading && <div className="searching">Searching...</div>}
                    {error && (
                      <div>
                        Unexpected Error Occurred. Please Try again
                      </div>)}
                  </div>
                  <div className="result-list">
                    {repos.sort((a, b) => {
                      if (a.stargazers_count < b.stargazers_count) return 1
                      else if (a.stargazers_count > b.stargazers_count) return -1
                      return 0
                    }).map((repo) => {         
                      return (
                        <div className="repo_items"key={repo.id}>
                          <div className="info">
                            <div className="box">
                              <div>
                                <a href={repo.html_url} target="_blank" className="link">{repo.full_name}</a>
                              </div>
                              <div>
                                <FontAwesomeIcon className="star" icon={faStar}/>{repo.stargazers_count}
                              </div>
                            </div>
                          </div>
                          <div className="info">
                            <p className="description">{repo.description}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
    </div>
  );
}


export default App;


