import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { ProfileCard } from './components/ProfileCard';
import { Button } from './components/Button';
interface ApiResponse {
  results: User[];
}
export interface Id {
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
export interface Location {
  country: string;
  city: string;
  street: Street;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
export interface User {
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
