import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render = () => {      
    return (
      <React.Fragment>
      <header className="header">
      <Link to="/">
        <img
          src="https://fontmeme.com/permalink/190707/fd4735271a0d997cbe19a04408c896fc.png"
          alt="netflix-font"
          border="0"
        />
      </Link>
      <div id="navigation" className="navigation">
        <nav>
          <ul>
            <li>
              <Link to="/myList">My List</Link>
            </li>
          </ul>
        </nav>
      </div>
      <form id="search" className="search">
        <input type="search" placeholder="Search for a title..." 
        value={this.props.value}
        onChange={this.props.onChange} />
        
         <div id="searchResults" className="searchResults">Found {this.props.results} movies with  "{this.props.value}"</div>
      </form>
    </header>
    </React.Fragment>
    );
  };
}

export default Header;