import { styled } from "styled-components";
import { Button } from "./components/Button";
import { useNavigate } from "react-router-dom";

const Undefined = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <h1>Page introuvable</h1>
      <Button onClick={() => navigate("/")}>
        Revenir à la page d&apos;accueil
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  position: relative;
  display: grid;
  text-align: center;
  place-items: center;
  grid-template-rows: auto 0.5fr;
  padding: 1rem;
  width: clamp(350px, 50vw, 1000px);
  aspect-ratio: 2/1;
  border: 3px solid white;
  border-radius: 10px;
  color: white;

  h1 {
    font-size: var(--font-size-l);
  }
`;

export default Undefined;
