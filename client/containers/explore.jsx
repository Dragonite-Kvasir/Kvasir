import React from "react";
import { useState, useEffect } from "react";
import DropDown from "../components/Dropdown.jsx";

const Explore = () => {
  const [learnOptions, setLearnOptions] = useState([]);
  const [teachOptions, setTeachOptions] = useState([]);
  const [learn, setLearn] = useState('Select a Language');
  const [teach, setTeach] = useState('Select a Language');
  const [profiles, setProfiles] = useState([]);
  
  useEffect(() => {
    // query the database to grab matching users/profiles
  }, [])

  return ( 
    <div id="explore-page">
      <aside>
        <div className="filter">
          <label className="filter-heading">I want to learn: </label>
          <DropDown 
            options={learnOptions} 
            current={learn}
            handleChange={(e) => setLearn(e)}/>
        </div>
        <div className="filter">
          <label className="filter-heading">I want to teach: </label>
          <DropDown 
            options={teachOptions} 
            current={teach}
            handleChange={(e) => setTeach(e)}/>
        </div>
      </aside>
      <div className="explore-main">

      </div>
    </div>
  )
};

export default Explore;
