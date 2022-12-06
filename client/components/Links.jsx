import React from "react";

const Links = (props) => {
  return (
    <div className="nav-links">
      { props.loggedIn ? 
        <>
          <a href="">Explore</a>
          <a href="">Home Page</a>
          <a href="">Profile</a>
        </> :
        <>
          <a href="">Login</a>
          <a href="">Sign Up</a>
        </>
      }

    </div>
  )
}

export default Links;