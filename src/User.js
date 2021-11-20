import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFolloweeAction } from "./redux/slices/githubSlices";
import { config } from "./config";
import Modal from "./Modal.js";
import './scss/User.scss';
import { PrimaryButton, Card } from "./globalStyles";


const User = (props) => {
  const [user, setUser] = useState({});
  const [isFollowee, setIsFollowee] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const githubClient = useSelector((state) => state?.githubClient);
  const { followees } = githubClient;
  const dispatch = useDispatch();

  function checkIfIsFollowee() {
    if(followees.some(followee => followee.id === props.user.id)) {
      setIsFollowee(true);
      return;
    }
    setIsFollowee(false);
  }

  function addToFollowees() {
    dispatch(fetchFolloweeAction({followee: props.user, addFlag: true}));
    setIsFollowee(true);
  }

  function removeFromFollowees() {
    dispatch(fetchFolloweeAction({followee: props.user, addFlag: false}));
    setIsFollowee(false);
  }

  useEffect(() => {
    checkIfIsFollowee()
    fetchUserInformation(props.user?.login);
  }, [props.user]);


  function showModal() {
    setOpenModal(true);
  };

  function hideModal() {
    setOpenModal(false);
  };

  async function fetchUserInformation(login) {
    try {
      const response = await fetch(
        `https://api.github.com/users/${login}`,
        config
      );
      const user = await response.json();
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
        <img src={user?.avatar_url} alt="" />
        <h3 className="name">{user?.name}</h3>
        <h4>
          Login Name: <span>{user?.login}</span>
        </h4>
        <h4>
          Location: <span>{user?.location}</span>
        </h4>
        <h4>
          Public Repositories: <span>{user?.public_repos}</span>
        </h4>
        <h4>
          Public Gists: <span>{user?.public_gists}</span>
        </h4>
        <h4>
          Following Users: <span>{user?.following}</span>
        </h4>
        <div className="buttons-container">
           {openModal && <Modal show={openModal} handleClose={hideModal} login={props.user?.login}/>}
          <PrimaryButton
            onClick={showModal}
          >
            View repos
          </PrimaryButton>
          {!isFollowee && <PrimaryButton onClick={addToFollowees}>
            Follow
          </PrimaryButton>}
          {isFollowee && <PrimaryButton onClick={removeFromFollowees}>
            Unfollow
          </PrimaryButton>}
        </div>
    </Card>
  );
};

export default User;
