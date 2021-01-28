import React, { Component, Fragment } from 'react';
import * as MovieAPI from './lib/MovieAPI';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Movies from './components/Movies';
import MyList from './components/MyList';
import TableView from './components/TableView';

class App extends Component {
  
  state = {
    inputValue:'',
    movies : [],
    genres : [],
    favorites : [],
  }

  componentDidMount() {
    MovieAPI.getAll()
    .then(data => {
      data.forEach(element => {
        element.my_list = "false"
      });
      this.setState({movies : data})
    });
    MovieAPI.genres()
    .then(data => {
      this.setState({genres : data})
    })
  }

  updateInputField = (e) => {
    this.setState({inputValue: e.target.value});
  }

  handleClick = (e) => {
    e.preventDefault(); 
    let selected = e.target.closest('div').parentElement;
   console.log(selected);
    if(selected.getAttribute('data-toggled') === "true") {
      selected.setAttribute("data-toggled", "false")
      MovieAPI.removeFromList(selected)
      .then(data => {
        console.log(data)
        this.setState((prevState) => ({
          favorites: prevState.favorites.filter((fav) => fav.data.id !== data.id),
        }));
      })
    }else {
      selected.setAttribute("data-toggled", "true"); 
      MovieAPI.addToList(selected)
     .then(data => {
      console.log(data)
      this.setState(prevState => {
        return {
          favorites: [...prevState.favorites, {data}], 
        }
      });
     })
    }   
  }

  filterByValue(array, value) {
    return array.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  render = () => {
    
    const sortedGenres = this.state.genres.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    
    const filteredMovies = this.filterByValue(this.state.movies, this.state.inputValue);

    // console.log(filteredMovies)
    

    return (
      <Fragment>
        <Header 
        onChange={this.updateInputField} 
        results={filteredMovies.length}
        value={this.state.inputValue}
        />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Movies 
                value={this.state.inputValue}
                movies={filteredMovies}
                genres={sortedGenres}
                onClick={this.handleClick}
                />
              )}
            />
            <Route
              exact
              path="/myList"
              render={(props) => (
                <MyList 
                favorites = {this.state.favorites}
                onClick={this.handleClick}
                />
              )}
            />
            <Route
              exact
              path="/tableView"
              render={(props) => (
                <TableView 
                favorites = {this.state.favorites}
                onClick={this.handleClick}
                />
              )}
            />
          </Switch>
      </Fragment>
    );
  };
}

export default App;
