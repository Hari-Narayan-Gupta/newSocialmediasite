import {React, useState} from 'react';
import './TrendCard.css';
import { TrendData } from '../../Data/TrendData.js';
import { getTrendingHashtags } from '../../api/PostRequest.js';
import { useEffect } from "react";


const TrendCard = () => {
    const [trendingHashtags, setTrendingHashtags] = useState([]);

    useEffect(() => {
        const fetchTrendingHashtags = async () => {
            try {
                const response = await getTrendingHashtags();
                setTrendingHashtags(response.data); // Assuming your API response contains trending hashtags data
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching trending hashtags:', error);
            }
        };

        fetchTrendingHashtags();
    }, []);


    return (
        <div className="TrendCard">
            <h3>Trends for your</h3>


            {trendingHashtags.map((trend, id) => {
                return (
                    <div className="trend" key={id}>
                        <span>{trend.hashtag}</span>
                        <span>{trend.count} shares</span>
                    </div>
                )
            })}
        </div>
    )
}

export default TrendCard