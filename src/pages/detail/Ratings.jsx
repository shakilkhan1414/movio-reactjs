import React,{useState,useEffect} from 'react'
import imdb from '../../assets/imdb.png';
import rotten_tomatoes from '../../assets/rotten_tomatoes.png';
import metacritic from '../../assets/metacritic.png';

export const Ratings = (props) => {
    const[ratings,setRatings]=useState([])

    useEffect(()=>{
        if(props.details.Ratings){
            setRatings(props.details.Ratings)
        }
    },[])

    const details=(item)=>{
        if(item.Source== "Internet Movie Database"){
            return (
                <div key={item.Source} className='ratings-wrapper'>
                    <img src={imdb} alt="" />
                    <h3>{item.Value}</h3>
                </div>
            )
        }
        else if(item.Source== "Rotten Tomatoes"){
            return(
                <div key={item.Source} className='ratings-wrapper'>
                    <img style={{width: '30px'}} src={rotten_tomatoes} alt="" />
                    <h3>{item.Value}</h3>
                </div>
            )
        }
        else if(item.Source== "Metacritic"){
            return(
                <div key={item.Source} className='ratings-wrapper'>
                    <img style={{width: '28px'}} src={metacritic} alt="" />
                    <h3>{item.Value}</h3>
                </div>
            )
        }
    }

  return (
    <>
    {
        ratings.map(item=>(
            details(item)
        ))
    }
        
    </>
  )
}
