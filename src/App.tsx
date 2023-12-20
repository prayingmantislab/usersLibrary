import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

interface ApiResponse {
  results: User[];
}
interface Id {
  name: string;
  value: string;
}

interface Name {
  title: string;
  first: string;
  last: string;
}

interface Street {
  number: number;
  name: string;
}
interface Location {
  country: string;
  city: string;
  street: Street;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
interface User {
  name: Name;
  login: string;
  id: Id;
  location: Location;
  picture: Picture;
}
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateRows: 'repeat(4, 1fr)',
  gap: '1rem',
};
const ProfileCard = ({
  imageUrl,
  title,
  firstName,
  lastName,
  id,
  location,
}: {
  imageUrl: string;
  title: string;
  firstName: string;
  lastName: string;
  id: Id;
  location: Location;
}) => (
  <div style={{ position: 'relative', height: '350px', width: '350px' }}>
    <img
      src={imageUrl}
      style={{
        filter: 'grayscale(100%)',
        width: '100%',
        height: '100%',
        // position: 'absolute',
        zIndex: 1,
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'end',
        color: 'white',
        flexDirection: 'row',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div className='flex-column'>
        <h2 className='text-xl font-bold text-white'>
          {title} {firstName} {lastName}
        </h2>
        <h3 style={{ color: '#bdb9b9' }}>ID: {id ? id.value : 'No ID'}</h3>
        <h3 style={{ color: '#bdb9b9' }}>
          {' '}
          {location.street.number} {location.street.name} | {location.city} |{' '}
          {location.country}
        </h3>
      </div>
    </div>
  </div>
);
const Button = () => (
  <button
    style={{
      width: '100%',
      height: '50px',
      backgroundColor: '#85957a',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '0px',
    }}
  >
    Button
  </button>
);
function App() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get<ApiResponse>(
        'https://randomuser.me/api/?results=8'
      );
      setUsers(response.data.results);
    };
    console.log(users);
    fetchUsers();
  }, []);
  return (
    <div style={{ ...gridStyle, justifyContent: 'center' }}>
      {users.map((user: User, index: number) => (
        <div key={`${user.id.value}-${index}`}>
          <div key={`${user.id.value}-${index}`}>
            <ProfileCard
              imageUrl={user.picture.large}
              title={user.name.title}
              firstName={user.name.first}
              lastName={user.name.last}
              id={user.id}
              location={user.location}
            />
          </div>
          <Button />
        </div>
      ))}
    </div>
  );
}

export default App;
