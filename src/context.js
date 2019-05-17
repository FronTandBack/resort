import React, { Component } from 'react';
import items from './data';
import Client from './Contentful';

// async function getData() {
//   const response = await Client.getEntries({
//     content_type: 'resortBeachRoom'
//   });
//   console.log(response.items);
//   // return response.items;
// }

const RoomContext = React.createContext();
//
const { Consumer: RoomConsumer } = RoomContext;
class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
    type: 'all'
  };

  getData = async () => {
    try {
      const response = await Client.getEntries({
        content_type: 'resortBeachRoom'
      });

      console.log(response.items);

      const rooms = this.formatData(response.items);
      const featuredRooms = rooms.filter((room) => room.featured === true);

      const maxPrice = Math.max(...rooms.map((item) => item.price));
      const maxSize = Math.max(...rooms.map((item) => item.size));
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      });
    } catch (err) {
      console.error(err);
    }

    // return response.items;
  };

  formatData = (items) => {
    const tempItems = items.map((item) => {
      const id = item.sys.id;
      const img = item.fields.img.map((item) => item.fields.file.url);

      const room = { ...item.fields, img, id };

      return room;
    });
    return tempItems;
  };

  handleChange = (event) => {
    const target = event.target;

    // const type = event.target.type;
    const name = event.target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(target.value);
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;
    // all ther rooms
    let tempRooms = [...rooms];
    // transform value
    console.log('Room', rooms);
    capacity = parseInt(capacity);
    price = parseInt(price);
    minSize = parseInt(minSize);
    maxSize = parseInt(maxSize);
    // filter by type
    if (type !== 'all') {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    // filter price
    tempRooms = tempRooms.filter((room) => room.price <= price);

    // filter size for min and max
    tempRooms = tempRooms.filter((room) => {
      return room.size >= minSize && room.size <= maxSize;
    });

    // filter by breafast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }

    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }
    // update state
    this.setState({
      sortedRooms: tempRooms
    });
  };

  componentDidMount() {
    console.log('component did mount context');
    this.getData();
    // const rooms = this.formatData(items);
    // const featuredRooms = rooms.filter((room) => room.featured === true);

    // const maxPrice = Math.max(...rooms.map((item) => item.price));
    // const maxSize = Math.max(...rooms.map((item) => item.size));
    // this.setState({
    //   rooms,
    //   featuredRooms,
    //   sortedRooms: rooms,
    //   loading: false,
    //   price: maxPrice,
    //   maxPrice,
    //   maxSize
    // });
  }

  getRoom = (slug) => {
    const tempRooms = [...this.state.rooms];

    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  render() {
    console.log('Render context');
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

export const withRoomConsumer = (Component) => {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
};

export { RoomProvider, RoomConsumer, RoomContext };
