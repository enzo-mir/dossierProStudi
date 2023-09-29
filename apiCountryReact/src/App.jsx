import "./App.css";
import FetchData from "./FetchData";
import styled from "styled-components";

function App() {
  return (
    <Wrapper>
      <Card>
        <FetchData />
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  display: grid;
  place-items: center;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Card = styled.div`
  background: white;
  backdrop-filter: blur(5px);
  width: clamp(300px, 50vw, 500px);
  aspect-ratio: 1/1;
  border-radius: 5px;
  padding: 1em;
  display: grid;
  place-items: center;
  animation getin .5s cubic-bezier(0,1.27,1,1.2) forwards;

  & h1 {
    font-size: clamp(18px, 2vw, 35px);
  }

  & img {
    width: 60%;
    object-fit: cover;
  }

  & .info {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 150px));
    gap: 2vw;
    place-items: center;
    justify-content: center;
    width: 100%;
    & p {
      width: max-content;
      font-size: clamp(12px, 1vw, 18px);
      font-weight: bold;
    }
  }

  @keyframes getin{
    from{
      transform:translateY(-50%)
    }
    to{
      transform:translateY(0%)
    }
  }
`;

export default App;
