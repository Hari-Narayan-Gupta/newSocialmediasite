import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser } from "../../api/UserRequest";
import User from "../User/User";
import { useSelector } from "react-redux";

const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);


  useEffect(() => { 
    const fetchPersons = async () => {
      try {
        const { data } = await getAllUser();
        const filteredPersons = data.filter(person => {
          return !user.following.some(followedUser => followedUser === person._id);
        });
        // console.log(data);
        // console.log(filteredPersons);
        setPersons(filteredPersons);
      } catch (error) {
        console.error("Error fetching persons:", error);
      }
    };
  
    fetchPersons();
  }, []);


  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>

      {persons.map((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} />;
      })}
      {!location ? (
        <span onClick={() => setModalOpened(true)}>Show more</span>
      ) : (
        ""
      )}

      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
};

export default FollowersCard;

