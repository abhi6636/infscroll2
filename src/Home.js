import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './styles/Home.css';

const Home = () => {
  let navigate = useNavigate();

  const [users, setUsers] = React.useState([]);

  const getDetails = async () => {
    try {
      const { data } = await axios.get(`https://randomuser.me/api/?results=10`);
      console.log(data.results);
      setTimeout(() => {
        setUsers([...users, ...data.results]);
      },500);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/');
  };

  React.useEffect(() => {
    getDetails();
  },);

  if (!localStorage.user) {
    return (
      <div>
        <p>You are not logged in</p>
        <button onClick={() => navigate('/')}>Login</button>
      </div>
    );
  }

  return (

    <div className='home'>
      <div className='logout-button-container'>
        <button onClick={logout}>Logout</button>
      </div>

      <InfiniteScroll
        dataLength={users.length}
        next={getDetails}
        loader={<h1 className='loading'>Loading...</h1>}
        hasMore={true}
      >
        {users.map((usr, idx) => (
          <div className='user' key={idx}>


<Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src= {usr.picture.large} alt='profile' />
      <Card.Body>
        <Card.Title>{usr.name.first} {usr.name.last}</Card.Title>
        <Card.Text>
        Email: {(usr.email)}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Contact: {usr.cell}</ListGroup.Item>
        <ListGroup.Item>Location: {(usr.location.city)}</ListGroup.Item>
        <ListGroup.Item>State: {(usr.location.state)}</ListGroup.Item>
        <ListGroup.Item>Post code: {(usr.location.postcode)}</ListGroup.Item>
        <ListGroup.Item>Country: {(usr.location.country)}</ListGroup.Item>

      </ListGroup>
    </Card>

          </div>
        ))}
        </InfiniteScroll>
      </div>
    );
  };

export default Home;
