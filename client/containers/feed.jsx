const React = require('react');
import Nav from '../components/Nav.jsx';
import DropDown from '../components/Dropdown.jsx';
import styles from '../styles/feed.scss';

const Feed = () => {
  const dropDownopt = ['Friends', 'Pending', 'Requests'];
  return (
    <div>
      <Nav />
      <DropDown
        options={dropDownopt}
        current={'Friends'}
        handleChange={() => {
          console.log('change');
        }}
      />
    </div>
  );
};

export default Feed;
