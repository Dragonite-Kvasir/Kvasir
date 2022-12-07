import React from "react";

const ProfileWidget = ({type, name, i, handleRemove, edit}) => {

  return ( 
    <div id={`${type}_${name}`} className="pb" key={`${type[0]}_${i}`}>
      <button className="profile-button">{name}</button>
      {edit?<a id={`${name}`} className={`${type} remove-link`} onClick={handleRemove}>x</a>:<></>}
    </div>
  )
}

export default ProfileWidget;
