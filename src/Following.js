import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import User from "./User";
import { CardContainer, CenterContainer } from "./globalStyles";

const Following = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const githubClient = useSelector((state) => state?.githubClient);
  const { followees } = githubClient;
  const [activeFollowees, setactiveFollowees] = useState(followees);

  useEffect(() => {
    setactiveFollowees(
      followees.filter((followee) => followee.login.includes(searchTerm))
    );
  }, [searchTerm, followees]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <CenterContainer>
      <div className="search-container">
        <label>Search: </label>
        <input
          type="text"
          placeholder="Login Name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <CardContainer>
        {activeFollowees.map((user) => {
          return <User key={user.id} user={user} />;
        })}
      </CardContainer>
    </CenterContainer>
  );
};

export default Following;
