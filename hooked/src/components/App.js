import React, { useReducer, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import ModalInfo from "./ModalInfo";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";


const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
  modalInfo:null
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        modalInfo:null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload,
        modalInfo:null
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
        modalInfo:null
      };
      case "SEARCH_MOVIE_INFO_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        modalInfo:null
      };
    case "SEARCH_MOVIE_INFO_SUCCESS":
      return {
        ...state,
        loading: false,
        modalInfo: action.payload
      };
    case "SEARCH_MOVIE_INFO_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    case "MODAL_CLOSE":{
      return {
        ...state,
        modalInfo:null
      }
    }
    default:
      return state;
  }
};



const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
    
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
        
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
        	});
      	});
  	}, []);

    const search = searchValue => {
    	dispatch({
      	type: "SEARCH_MOVIES_REQUEST"
    	});
	
        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      	.then(response => response.json())
      	.then(jsonResponse => {
        	if (jsonResponse.Response === "True") {
          	dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
          	});
        	} else {
          	dispatch({
                type: "SEARCH_MOVIES_FAILURE",
                error: jsonResponse.Error
          	});
          }
      	});
    };
    const modal = movieTitlte => {
    	dispatch({
      	type: "SEARCH_MOVIE_INFO_REQUEST"
    	});
	
        fetch(`https://www.omdbapi.com/?t=${movieTitlte}&apikey=4a3b711b`)
      	.then(response => response.json())
      	.then(jsonResponse => {
        	if (jsonResponse.Response === "True") {
          	dispatch({
                type: "SEARCH_MOVIE_INFO_SUCCESS",
                payload: jsonResponse
          	});
        	} else {
          	dispatch({
                type: "SEARCH_MOVIE_INFO_FAILURE",
                error: jsonResponse.Error
          	});
          }
      	});
    };
    const modalToggle = () => {
      console.log('gere');
      dispatch({
        type:"MODAL_CLOSE"
      })
    }

    const { movies, errorMessage, loading,modalInfo } = state;
    console.log(modalInfo);
    return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} modal={modal}/>
          ))
        )}
      </div>
      {modalInfo && 
      <div id="modal">
         <ModalInfo modalInfo={modalInfo} modalToggle={modalToggle} /> 
      </div>
      }
    </div>
  );
};

export default App;