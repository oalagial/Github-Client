import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "./redux/slices/githubSlices";
import User from "./User";
import './scss/GithubUsers.scss';
import { CardContainer, CenterContainer } from "./globalStyles";

const GithubUsers = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("followers");

  const githubClient = useSelector((state) => state?.githubClient);
  const { loading, error, users } = githubClient;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersAction({ page, sortBy }));
  }, [dispatch, page, sortBy]);

  function decreasePage() {
    setPage(page - 1);
  }

  function increasePage() {
    setPage(page + 1);
  }

  function changeSortBy(e) {
    setSortBy(e.target.value);
  }

  return (
    <section>
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>{error?.data?.message}</h1>
      ) : (
        <CenterContainer>
          <div className="sort-by">
            <label>Sort by: </label>
            <select
              style={{fontSize: "1.5rem"}}
              name="sortBy"
              id="sortBy"
              onChange={changeSortBy}
              value={sortBy}
            >
              <option value="followers">Followers</option>
              <option value="repositories">Public Repos</option>
            </select>
          </div>
          <CardContainer>
            {users?.items.map((user) => {
              return <User key={user.id} user={user} />;
            })}
          </CardContainer>

          <div className="buttons-container">
            {page !== 1 && (
              <div className="main-button" onClick={decreasePage}>
                Previous
              </div>
            )}
            {/* TODO: remove next button when there is not a next page */}
            <div className="main-button" onClick={increasePage}>Next</div>
          </div>
        </CenterContainer>
      )}
    </section>
  );
};

export default GithubUsers;
