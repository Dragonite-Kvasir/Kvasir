import React from "react";
import '../styles/profile.scss';


const ProfileWidget = ({type, name, i, handleRemove, edit}) => {

  return ( 
    <div id={`${type}_${name}`} className="pb" key={`${type[0]}_${i}`}>
      <h3 className='profile-btn'>{name}</h3>
      {edit?<a id={`${name}`} className={`${type} remove-link`} onClick={handleRemove}>x</a>:<></>}
    </div>
  )
}

export default ProfileWidget;
