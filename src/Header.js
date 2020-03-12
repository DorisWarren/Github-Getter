import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const Header = () => (
  <header>
    <div className="container">
      <div className="inner-header">
        <div className="logo">
          <a href= "https://github.com/" target="_blank" className="github_getter">GG<FontAwesomeIcon className="circle" color="#C42132"icon={faCircle} /></a>
        </div>
      </div>
    </div>
  </header>
)



export default Header;