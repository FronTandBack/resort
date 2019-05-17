import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../img/room-1.jpeg';
import PropTypes from 'prop-types';
const Room = ({ room }) => {
  const { name, slug, img, price } = room;
  // console.log(room);
  return (
    <article className="room">
      <div className="img-container">
        <img src={img[0] || defaultImage} alt="Single room" />
        <div className="price-top">
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/rooms/${slug}`} className="btn-primary room-link">
          Features
        </Link>
      </div>
      <p className="room-info">{name}</p>
    </article>
  );
};

Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    img: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired
  })
};

export default Room;
