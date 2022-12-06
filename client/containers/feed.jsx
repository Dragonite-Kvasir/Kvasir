const React = require('react');
import DropDown from '../components/Dropdown.jsx';
import styles from '../styles/feed.scss';

const Feed = () => {
  const dropDownopt = ['Friends', 'Pending', 'Requests'];
  return (
    <div>
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
