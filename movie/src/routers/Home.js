import React from "react";
import { useState, useEffect } from "react";
import Movie from "../components/Movie";
function Home(props) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
    // const json = await (
    //   await fetch(
    //     "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
    //   )
    // ).json(); 로 작성도 가능
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div style={{ padding: "30px" }}>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              coverImg={movie.medium_cover_image}
              id={movie.id}
              title={movie.title}
              year={movie.year}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
