import React from 'react';

class TableView extends React.Component {
  render = () => {
    return (
      <React.Fragment>
      <div className="table-view">
        <div className="title">
          <div className="titles-wrapper"> 
          {this.props.favorites.map((movie,index) => {
            
            return (<div key={index} className="movie">
          <img src={movie.data.poster_path} alt="poster" />
          <div className="overlay">
            <div className="title">{movie.data.title}</div>
            <div className="rating">{movie.data.vote_average}/10</div>
            <div className="plot">{movie.data.overview}</div>
            <div id={movie.data.id} data-toggled={movie.data.my_list} className="listToggle"
            onClick={this.props.onClick}>
              <div>
                <i className="fa fa-fw fa-plus"></i>
                <i className="fa fa-fw fa-check"></i>
              </div>
            </div>
          </div>
        </div>)
            
    })}
          </div>
        </div>
      </div>
      </React.Fragment> 
    );
  };
}

export default TableView;
