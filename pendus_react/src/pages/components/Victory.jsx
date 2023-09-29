import { styled } from "styled-components";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { stateAdmin } from "../../store/state.store";
import { stateMode } from "../../store/mode.sore";
const Victory = ({ winCounter }) => {
  const navigate = useNavigate();
  const word = stateAdmin((state) => state.word);
  const counter = stateAdmin((state) => state.counter);
  const mode = stateMode((state) => state.mode);

  return (
    <Wrapper>
      <article>
        <h1>Victoire le mot était : {word}</h1>
        <p>
          Vous avez réussit en :{" "}
          {winCounter + (mode == "normale" ? counter : counter / 2)} coups !
        </p>
      </article>
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
  p {
    font-size: var(--font-size-m);
  }
`;

export default Victory;
