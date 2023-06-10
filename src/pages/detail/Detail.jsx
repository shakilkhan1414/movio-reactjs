import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import ProductionList from './ProductionList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';
import { ClipLoader } from 'react-spinners';

const Detail = () => {

    const { category, id } = useParams();

    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}});
            setItem(response);
            console.log(response)
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);

    return (
        <>
        {!item && <div className="loading-spinner loading-space"><ClipLoader color='#ff0000' /></div>}
            {
                item && (
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
                                <p className="overview">{item.overview}</p>
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
                                </>
                                }
                                
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
