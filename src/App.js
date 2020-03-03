import React from 'react';
import "./App.css";
import { TiStar} from 'react-icons/ti';
import { IoMdSearch} from 'react-icons/io';


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
      <div className="wrapper">
        <form onSubmit={evt => {
          evt.preventDefault();
          setInputValue(evt.target.elements.query.value);
        }}>
       
        <i class="fas fa-search"></i>
          <input 
            type="text" 
            name="query" 
            className="github_search_bar"
            placeholder="Search Github Repositories"
            autoComplete="off"
          />
        </form>
        {isLoading && <div>Searching...</div>}
        {error && (
          <div>
            Unexpected Error Occurred. Please Try again
          </div>)}
       
            <ul className="repo_list">
              {repos.map((repo) => {
            
                return (
                  <li className="repo_items"key={repo.id}>
                    <a href={repo.html_url} target="_blank" className="list_details">
                    {repo.name}
                    </a>
                    
                    <p><TiStar/>{repo.stargazers_count} </p>
                    <p>{repo.description}</p>
                    {/* {repo.owner.map((owner) => ( 
                      <p key={owner.id}> 
                      <p>{owner.id}</p>{owner.login}
                      </p>))} */}
                    
                  </li>
      
                );
              })}
            </ul>
         
        </div>     
    </div>
  );
}


export default App;
