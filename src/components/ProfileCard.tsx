import { Id, Location } from '../App';

export const ProfileCard = ({
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
