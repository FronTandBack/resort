import React, { Component, Fragment } from 'react';
import defaultBcg from '../img/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';
import StyledHero from '../components/StyledHero';

export default class SingleRoom extends Component {
  static contextType = RoomContext;

  state = {
    slug: this.props.match.params.slug,
    defaultBcg
  };

  constructor(props) {
    super(props);
    // console.log(this.props.match.params.slug);
  }

  componentDidMount() {}

  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);

    if (!room) {
      return (
        <div className="error">
          <h3>no such room could be found</h3>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      img
    } = room;

    const [mainImg, ...defaultImg] = img;

    const images = img.map((item, index) => {
      return <img key={index} src={item} alt={name} />;
    });
    const peopleOrPerson =
      capacity > 1 ? `${capacity} people` : `${capacity} person`;
    return (
      <Fragment>
        <StyledHero img={mainImg || this.state.defaultBcg}>
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">{images}</div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price: ${price}</h6>
              <h6>size: ${size} SQFT</h6>
              <h6>max capacity: {peopleOrPerson}</h6>
              <h6>{pets ? 'pets allowed' : 'no  pets allowed'}</h6>
              <h6>{breakfast && 'free breakfast included'}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}>- {item}</li>;
            })}
          </ul>
        </section>
      </Fragment>
    );
  }
}
