import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

// {
//   "gender": "male",
//   "name": {
//       "title": "Mr",
//       "first": "Joris",
//       "last": "Marchand"
//   },
//   "location": {
//       "street": {
//           "number": 6634,
//           "name": "Rue Barrème"
//       },
//       "city": "Clermont-Ferrand",
//       "state": "Cher",
//       "country": "France",
//       "postcode": 73223,
//       "coordinates": {
//           "latitude": "-17.3387",
//           "longitude": "-26.0345"
//       },
//       "timezone": {
//           "offset": "-10:00",
//           "description": "Hawaii"
//       }
//   },
//   "email": "joris.marchand@example.com",
//   "login": {
//       "uuid": "691a632b-e907-4791-9454-c09b831617b5",
//       "username": "goldenfish802",
//       "password": "disney1",
//       "salt": "5LdCBKeZ",
//       "md5": "766a7bad80b979430b100e3200bb15e7",
//       "sha1": "47bca47205d6ebe67e50d336351f855dda7bfb70",
//       "sha256": "bba449344adac0b24432ac51fd022a2e1098674ea4c647091a22a97243da92ca"
//   },
//   "dob": {
//       "date": "1947-05-02T07:41:09.431Z",
//       "age": 76
//   },
//   "registered": {
//       "date": "2013-09-06T16:15:36.372Z",
//       "age": 10
//   },
//   "phone": "03-20-41-47-34",
//   "cell": "06-65-00-33-57",
//   "id": {
//       "name": "INSEE",
//       "value": "1470438949344 75"
//   },
//   "picture": {
//       "large": "https://randomuser.me/api/portraits/men/71.jpg",
//       "medium": "https://randomuser.me/api/portraits/med/men/71.jpg",
//       "thumbnail": "https://randomuser.me/api/portraits/thumb/men/71.jpg"
//   },
//   "nat": "FR"
// }
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
const Image = ({ imageUrl }: { imageUrl: string }) => (
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
        alignItems: 'center',
        color: 'white',
      }}
    ></div>
  </div>
);
const Button = () => (
  <button
    style={{
      width: '100%',
      height: '50px',
      backgroundColor: '#90be6d',
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
          <Image imageUrl={user.picture.large} />
          <Button />
          <h1>{user.name.title}</h1>
          {/* <h2>{user.name.first}</h2> */}
          {/* <h6>{user.name.last}</h6> */}
        </div>
      ))}
    </div>
  );
}

export default App;
