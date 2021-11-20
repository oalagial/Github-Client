import styled from "styled-components";

const CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10vh;
    margin-bottom: 10vh;
`


const PrimaryButton = styled.button`
  border-radius: 30px;
  color: #2d3149;
  font-weight: bold;
  margin: 0 1em;
  padding: 1em 2em;
  background-color: white;
  // background-image: linear-gradient(to right, LightSlateGrey , Silver, Snow);
`;

const CardContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;

  @media (min-width: 1000px) {
    grid-template-columns: repeat(2, 400px);
  }

  @media (min-width: 1500px) {
    grid-template-columns: repeat(3, 400px);
  }
`;

const Card = styled.div`
  background-color: #2d3149;
  color: white;
  margin: 1rem;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 4%;
`;

export { PrimaryButton, CardContainer, Card, CenterContainer };
