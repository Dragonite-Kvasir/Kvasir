import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DropDown from "../components/Dropdown.jsx";
import Card from "../components/Card.jsx";
import '../styles/explore.scss';
import { updateExplore } from "../rootReducer.js";

const Explore = () => {
  const dispatch = useDispatch();
  const learnOptions = useSelector((state) => state.userInfo.canLearn);
  const teachOptions = useSelector((state) => state.userInfo.canTeach);
  const learn = useSelector((state) => {
    if(!state.exploreCurrent.willLearn) return 'Select';
    else return state.exploreCurrent.willLearn;
  });
  const teach = useSelector((state) => { 
    if(!state.exploreCurrent.willTeach) return 'Select';
    else return state.exploreCurrent.willTeach;
  });
  const [cards, setCards] = useState([])



  useEffect(() => {
    // CHANGE -- query the database to grab matching users/profiles
    setCards([
      <Card name="Kate" imgUrl="https://media-exp1.licdn.com/dms/image/D5603AQHSp4HQWIqk3Q/profile-displayphoto-shrink_800_800/0/1669852886544?e=1675900800&v=beta&t=gXRgilH66Ve0RurZ3SqpIrneAV-3PkONwtK85WWfzko" willTeach={['Russian']} willLearn={['Cantonese', 'Norwegian']}/>,
      <Card name="Kelly" imgUrl="https://media-exp1.licdn.com/dms/image/D4E03AQH2Qn7l9oEW7Q/profile-displayphoto-shrink_800_800/0/1669423518618?e=1675900800&v=beta&t=_jn6ZDTiFlh7SbSzuk19EFBjm7nT1uguz3tE7rNiIXU" willTeach={['Japanese']} willLearn={['Korean', 'German']}/>,
      <Card name="Emily" imgUrl="https://media-exp1.licdn.com/dms/image/C4E03AQGoCiZlHk4INg/profile-displayphoto-shrink_800_800/0/1586788791685?e=1675900800&v=beta&t=pfrHp3Ilczx7Qn4EgNAX4qiTB58PmgpSqTDQjmuq2x4" willTeach={['German']} willLearn={['Cantonese', 'English']}/>,
      <Card name="Cassidy" imgUrl="https://media-exp1.licdn.com/dms/image/D4E03AQF3Vc4LC38e6g/profile-displayphoto-shrink_800_800/0/1669821402564?e=1675900800&v=beta&t=C0IU8x638VYRfUxG0_vSbBoO4IU1s1uSxRwH0wtO51w" willTeach={['Arabic']} willLearn={['English', 'Spanish']}/>
    ]);
  }, [])

  return ( 
    <div id="explore-page">
      <aside id="explore-aside">
        <div className="filter">
          <label className="filter-heading">I want to learn: </label>
          <DropDown 
            options={learnOptions} 
            current={learn}
            handleChange={(e) => {
              dispatch(updateExplore({willTeach: teach, willLearn: e}))
              console.log('changed learn to ' + e);
            }}/>
        </div>
        <div className="filter">
          <label className="filter-heading">I want to teach: </label>
          <DropDown 
            options={teachOptions} 
            current={teach}
            handleChange={(e) => {
              dispatch(updateExplore({willTeach: e, willLearn: learn}))
              console.log('changed teach to ' + e);
            }}/>
        </div>
      </aside>
      <div className="card-holder">
        {cards}
      </div>
    </div>
  )
};

export default Explore;
