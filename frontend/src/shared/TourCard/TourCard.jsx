import React from 'react';
import {Card,CardBody} from "reactstrap";
import {Link} from 'react-router-dom';
import './tour-card.css';
import calculateAvRating from '../../utils/avgRating';

const TourCard = ({tours}) => {
    const { _id, title, city, photo, price,reatured, reviews } = tours ;
    const { totalRating,avgRating} = calculateAvRating (reviews)
    



  return (

    <div className='tour__card'>
      <Card>
        <div className='tour__img'>
          <img src={photo} alt="tour-img"/>
            {reatured&&<span>Featured </span>}
        </div>
        <CardBody>
        <div className="card__top d-flex align-items-center justify-content-between">
          <span className='tour__location d-flex align-items-center gap-1'>
          <i className="ri-map-pin-fill"></i>{city}
          
          </span>
          <span className="tour__rating d-flex align-items-center gap-1">
          <i className="ri-star-half-fill"></i>{avgRating === 0 ? null :avgRating}
          {totalRating === 0 ?(' not rated ') :( <span>({reviews.length})</span> )}
           
          </span>
        </div>

        <h5 className='tour__title'>
          <Link to={`/tours/${_id}`}>{title}</Link>
        </h5>
        <div className='card__bottom d-flex align-item-center justify-content-between mt-3'>
          <h5>
            $ {price}
            <span>/mỗi người</span>
          </h5>
          <button className='btn booking__btn'>
            <Link to={`/tours/${_id}`}>book now</Link>
          </button>
        </div>
      </CardBody>
      </Card>

    </div>
  );
};

export default TourCard;
