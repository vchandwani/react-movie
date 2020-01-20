import react from 'react';

const DEFAULT_POSTER = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({props}) => {
    const poster = 
        props.poster === 'N/A' ? DEFAULT_POSTER : props.poster;

    return (
        <div className="movie">
            <h2>{props.Title}</h2>
            <div>
                <img width="200" alt={"Movie : " + props.Title} src={poster}/>
            </div>
            <p>{props.Year}</p>
        </div>
    )
}
export default Movie;