import React from "react";
import DropDown from "./Dropdown.jsx";
import ProfileWidget from '../components/ProfileWidget.jsx';

const ProfileSection = ({edit, handleAdd, handleRemove, options, current, info, type, name, id}) => {
  return ( 
    <section id={id} className="profile-section">
      <p className="profile-title">{name}</p>
      <div className="profile-selections">
        {info.map((e, i) => {
            return <ProfileWidget edit={edit} handleRemove={handleRemove} type={type} name={e} i={i}/>
        })}
      </div>
        {edit?<DropDown type={type} handleChange={handleAdd} options={options} current={current} fromProfile={true}/> :<></>}
    </section>
  )
}
export default ProfileSection;