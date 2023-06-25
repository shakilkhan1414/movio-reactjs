import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import ProductionList from './ProductionList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';
import { Ratings } from './Ratings';
import { ClipLoader } from 'react-spinners';

import axios from 'axios';

const Detail = () => {

    const { category, id } = useParams();

    const [item, setItem] = useState(null);

    const [itemDetails, setItemDetails]=useState(null)

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}});
            setItem(response);
            window.scrollTo(0,0);
        }
        getDetail();

    }, [category, id]);

    useEffect(()=>{
        if(category == 'movie'){
            if(item && !itemDetails){
                axios.get(`https://api.collectapi.com/imdb/imdbSearchById?movieId=${item.imdb_id}`,{
                    headers:{
                        authorization: "apikey 2d1VKwmNFajkXf4C9M5JOw:4lN1amOLSXwjRIQc1nrtVS"
                    }
                })
                .then(res=>{
                    setItemDetails(res.data.result);
                })
            }
        }
        else{
            if(item && !itemDetails){
                const getImdbId = async () => {
                    try{
                        const response = await tmdbApi.getImdb(id);
                        axios.get(`https://api.collectapi.com/imdb/imdbSearchById?movieId=${response.imdb_id}`,{
                        headers:{
                            authorization: "apikey 2d1VKwmNFajkXf4C9M5JOw:4lN1amOLSXwjRIQc1nrtVS"
                        }
                        })
                        .then(res=>{
                            setItemDetails(res.data.result);
                        })
                    }
                    catch(err){
                        setItemDetails([])
                    }
                    
                }
                getImdbId()
                
            }
        }


    },[item])

    return (
        <>
        {!item || !itemDetails && <div className="loading-spinner loading-space"><ClipLoader color='#ff0000' /></div>}
            {
                item && itemDetails && (
                    <>
                        <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                <h2 className="date">{new Date(item.release_date).getFullYear() || new Date(item.first_air_date).getFullYear()}</h2>

                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>

                                <Ratings details={itemDetails} />

                                <p className="overview">{item.overview}</p>
                                <p className='movie-details'><span>Rated:</span> {itemDetails.Rated}</p>
                                <p className='movie-details'><span>Director:</span> {itemDetails.Director}</p>
                                <p className='movie-details'><span>Writer:</span> {itemDetails.Writer}</p>
                                <p className='movie-details'><span>Language:</span> {itemDetails.Language}</p>
                                {category=='movie' && 
                                <>
                                    <p className='movie-details'><span>Runtime:</span> {item.runtime} minutes</p>
                                    <p className='movie-details'><span>Budget:</span> {item.budget.toLocaleString("en-US")} USD</p>
                                    <p className='movie-details'><span>Revenue:</span> {item.revenue.toLocaleString("en-US")} USD</p>
                                </>
                                }
                                {category=='tv' && 
                                <>
                                    <p className='movie-details'><span>Total Season:</span> {item.number_of_seasons}</p>
                                    <p className='movie-details'><span>Total Episode:</span> {item.number_of_episodes}</p>
                                    <p className='movie-details'><span>Last Air Date:</span> {item.last_air_date}</p>
                                    {item.next_episode_to_air && <p className='movie-details'><span>Next Episode Date:</span> {item.next_episode_to_air.air_date}</p> }
                                    
                                </>
                                }
                                <p className='movie-details'><span>Awards:</span> {itemDetails.Awards}</p>
                                
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={item.id}/>
                                </div>

                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Production Companies</h2>
                                    </div>
                                    <ProductionList companies={item.production_companies}/>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <VideoList id={item.id}/>
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={category} type="similar" id={item.id}/>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default Detail;
