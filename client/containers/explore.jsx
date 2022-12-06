const React = require('react');
import Nav from '../components/Nav.jsx';

const Explore = () => {
  return (
    <div id="explore-page">
    <aside>
      <div className="filter">
        <label className="filter-heading">I want to learn: </label>
      </div>
      <div className="filter">
        <label className="filter-heading">I want to teach: </label>
      </div>
    </aside>
    <div className="explore-main">

    </div>
  </div>
  );
};

export default Explore;
