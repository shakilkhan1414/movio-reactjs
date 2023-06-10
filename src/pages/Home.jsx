import React, {useState} from 'react'
import HeroSlide from '../components/hero-slide/HeroSlide'
import MovieList from '../components/movie-list/MovieList'
import { Link } from 'react-router-dom'
import { OutlineButton } from '../components/button/Button'
import { category, movieType, tvType } from '../api/tmdbApi'

export const Home = () => {

    const [showContent,setShowContent]=useState(false)

    const setContent=()=>{
        setShowContent(true)
    }

  return (
    <>
        <HeroSlide showContent={setContent} />

        {showContent && 
        <div className="container">
        <div className="section mb-3">
            <div className="section__header mb-2">
                <h2>Trending Movies</h2>
                <Link to="/movie">
                    <OutlineButton className="small">View more</OutlineButton>
                </Link>
            </div>
            <MovieList category={category.movie} type={movieType.popular}/>
        </div>

        <div className="section mb-3">
            <div className="section__header mb-2">
                <h2>Top Rated Movies</h2>
                <Link to="/movie">
                    <OutlineButton className="small">View more</OutlineButton>
                </Link>
            </div>
            <MovieList category={category.movie} type={movieType.top_rated}/>
        </div>

        <div className="section mb-3">
            <div className="section__header mb-2">
                <h2>Trending TV</h2>
                <Link to="/tv">
                    <OutlineButton className="small">View more</OutlineButton>
                </Link>
            </div>
            <MovieList category={category.tv} type={tvType.popular}/>
        </div>

        <div className="section mb-3">
            <div className="section__header mb-2">
                <h2>Top Rated TV</h2>
                <Link to="/tv">
                    <OutlineButton className="small">View more</OutlineButton>
                </Link>
            </div>
            <MovieList category={category.tv} type={tvType.top_rated}/>
        </div>
    </div>
        
        }
        
    </>
  )
}
