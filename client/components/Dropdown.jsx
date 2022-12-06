import React, { useState, useEffect, useRef } from 'react';

const DropDown = ({ options, current, handleChange }) => {
  //react hook to open/close the dropdown
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  //creates array of html button elements of each namespaces
  const optionsArr = [];
  options.forEach((name) => {
    optionsArr.push(
      <li key={`li` + name} className='menu-item'>
        <button
          key={'li-but' + name}
          onClick={() => {
            handleMenu(name);
            handleChange(name);
          }}
        >
          {name}
        </button>
      </li>
    );
  });

  //function to close menu after selection click
  const handleMenu = (name) => {
    setOpen(false);
  };

  const ref = useOutsideClick(() => {
    setOpen(false);
  });

  return (
    <div id='dropdown'>
      <button id='dropdown-but' ref={ref} onClick={handleOpen}>
        {current}
      </button>
      {open ? <ul className='menu'>{optionsArr}</ul> : null}
    </div>
  );
};

//helper function to close dropdown if click is outside of the dropdown
const useOutsideClick = (cb) => {
  const ref = useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  return ref;
};

export default DropDown;
