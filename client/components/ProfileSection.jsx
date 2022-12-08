import React from "react";
import DropDown from "./Dropdown.jsx";
import ProfileWidget from '../components/ProfileWidget.jsx';
import '../styles/profile.scss';

const ProfileSection = ({edit, handleAdd, handleRemove, options, current, info, type, name, id}) => {
  return ( 
    <section id={id} className="profile-section">
      <p className="unbold-title">{name}</p>
      <div className="profile-selections">
        {info.map((e, i) => {
            return <ProfileWidget key={`pw_${i}`} edit={edit} handleRemove={handleRemove} type={type} name={e} i={i}/>
        })}
      </div>
        {edit?<DropDown 
          type={type} 
          handleChange={handleAdd} 
          options={options} 
          current={current} 
          fromProfile={true}
        /> :<></>}
    </section>
  )
}
export default ProfileSection;