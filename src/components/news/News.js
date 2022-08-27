import React from 'react';
import './news.css';

const News = () => {
  return (
    <div id = "news">
      <div className="title">News</div>
      <div className="news__row">
        <div className="news__row__item">
          <img className="news__row__item__img" src = { require("../../pages/images/news/Ben_Yedder.jpg") } />
          <div className="news__row__item__full">
            <div className="news-type">Focus</div>
            <div className="news-timing">December 17, 2021 -  03:24</div>
          </div>
          <div className="news__row__item__title">Ben Yedder</div>
        </div>
        <div className="news__row__item">
          <img className="news__row__item__img" src = "https://www.getfootballnewsfrance.com/assets/fbl-fra-ligue1-reims-metz-806x537.jpg" />
          <div className="news__row__item__full">
            <div className="news-type">Focus</div>
            <div className="news-timing">December 17, 2021 -  03:24</div>
          </div>
          <div className="news__row__item__title">David Guion</div>
        </div> 
        <div className="news__row__item">
          <img className="news__row__item__img" src = { require("../../pages/images/news/Contract_Extensions.jpg") } />
          <div className="news__row__item__full">
            <div className="news-type">Focus</div>
            <div className="news-timing">December 17, 2021 -  03:24</div>
          </div>
          <div className="news__row__item__title">Contract extensions</div>
        </div>
      </div>
      <div className="news__row">
        <div className="news__row__item">
          <img className="news__row__item__img" src = { require("../../pages/images/news/podcast_logo.png") } />
          <div className="news__row__item__full">
            <div className="news-type">Focus</div>
            <div className="news-timing">December 17, 2021 -  03:24</div>
          </div>
          <div className="news__row__item__title">Ligue 1 Official Podcast</div>
        </div>
      </div>
    </div>
  )
}

export default News