import React from 'react';

const Movies = (props) => {
  return (
    <React.Fragment>
    {props.genres.map((genre) => (
      <div className="titleList" key={genre.id}>
        <div className="title">
          <h1>{genre.name}</h1>
          <div className="titles-wrapper"> 
          {props.movies.map((movie) => {
            if(movie.genre_ids.includes(genre.id)){
            return (<div key={movie.id} className="movie">
          <img src={movie.poster_path} alt="poster" />
          <div className="overlay">
            <div className="title">{movie.title}</div>
            <div className="rating">{movie.vote_average}/10</div>
            <div className="plot">{movie.overview}</div>
            <div id={movie.id} data-toggled={movie.my_list} className="listToggle"
            onClick={props.onClick}>
              <div>
                <i className="fa fa-fw fa-plus"></i>
                <i className="fa fa-fw fa-check"></i>
              </div>
            </div>
          </div>
        </div>)
            } else {
              return null;
            }
    })}
          </div>
        </div>
      </div>
    ))}
    </React.Fragment>
  );
};

export default Movies;
