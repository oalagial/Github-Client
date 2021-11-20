import { useEffect, useState } from "react";
import { config } from "./config";
import "./scss/Modal.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import { PrimaryButton, Card, CardContainer } from "./globalStyles";

const Modal = ({ handleClose, show, login }) => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  function decreasePage() {
    setPage(page - 1);
  }

  function increasePage() {
    setPage(page + 1);
  }

  useEffect(() => {
    fetchReposOfUser(login);
  }, [login, page]);

  async function fetchReposOfUser(login) {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/users/${login}/repos?&sort=updates&order
        =desc&page=${page}&per_page=10`,
        config
      );
      const repos = await response.json();
      setRepos(repos);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <AiFillCloseCircle className="close-button" size={35} onClick={handleClose}/> 
        <h1 className="repo-user">Repositories of {login}</h1>
        <div className="underline"></div>
      {loading ? <h2>Loading...</h2> : (
      <CardContainer>
        {console.log(repos)}
        {repos.map((repo) => {
          return (
            <Card key={repo?.id}>
              <h3 className="repo-name">{repo?.name}</h3>
              <h5 className="repo-detail">
                Description: <span>{repo?.description}</span>
              </h5>
              <h5 className="repo-detail">
                License Name: <span>{repo?.license?.name}</span>
              </h5>
              <h5 className="repo-detail" >
                Stars: <span>{repo?.stargazers_count}</span>
              </h5>
              <h5 className="repo-detail">
                Wathcers: <span>{repo?.watchers_count}</span>
              </h5>
              <h5 className="repo-detail">
                Forks: <span>{repo?.forks_count}</span>
              </h5>
            </Card>
          );
        })}
        </CardContainer>
        )}
        <div className="buttons-container">
          {page !== 1 && (
            <PrimaryButton
              className="mr-4"
              onClick={decreasePage}
            >
              Previous
            </PrimaryButton>
          )}
          {/* TODO: remove next button when there is not a next page */}
          <PrimaryButton onClick={increasePage}>
            Next
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
};

export default Modal;
