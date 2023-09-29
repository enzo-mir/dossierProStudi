import { styled } from "styled-components";
import svgTopRight from "../assets/images/svgTopRight.svg";
import svgBottomLeft from "../assets/images/svgBottomLeft.svg";
import { useRef } from "react";
import { stateAdmin } from "../store/state.store";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/Button";
import { useState } from "react";
import { stateMode } from "../store/mode.sore";

const Home = () => {
  const word = useRef(null);
  const setWord = stateAdmin((state) => state.setWord);
  const setCount = stateAdmin((state) => state.setCount);
  const mode = stateMode((state) => state.mode);
  const setMode = stateMode((state) => state.setMode);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    const wordRegex = /^([a-zA-Z])+$/g;
    if (new RegExp(wordRegex).test(word.current) && word.current) {
      setWord(word.current);
      setErrorMessage("");
      navigate("/pendus");
      setCount(0);
    } else {
      setErrorMessage(
        "Veuillez renseigner un mot uniquement composé de lettres"
      );
    }
  }

  return (
    <Wrapper>
      <span className="shapeTopRight">
        <img src={svgTopRight} alt="" />
      </span>
      <span className="shapeBottomLeft">
        <img src={svgBottomLeft} alt="" />
      </span>
      <h1>Jeu du Pendu</h1>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <div className="textInput">
        <label htmlFor="textChoice">Mot choisis : </label>
        <input
          type="text"
          name="textChoice"
          autoFocus
          onChange={(e) => (word.current = e.target.value.toUpperCase())}
        />
      </div>
      <label htmlFor="mode">
        <span></span>
        <input
          type="checkbox"
          checked={mode == "normale" ? false : true}
          name="mode"
          id="mode"
          onChange={(e) => {
            e.target.checked ? setMode("difficile") : setMode("normale");
          }}
        />
      </label>
      <Button onClick={handleSubmit}>Commencer</Button>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: clamp(400px, 50vh, 800px);
  color: white;

  h1 {
    font-size: var(--font-size-l);
  }
  p {
    color: #ff7373;
    font-size: var(--font-size-m);
    text-align: center;
    width: 80vw;
  }
  .textInput {
    & label {
      font-size: var(--font-size-m);
      font-weight: 100;
    }
    & input {
      position: relative;
      background-color: transparent;
      outline: none;
      border: none;
      border-bottom: 2px solid white;
      border-radius: 0px;
      color: white;
      font-size: var(--font-size-m);
      font-weight: 100;
      padding: 0.2em 0;
    }
  }

  & > label {
    position: relative;
    width: 20vw;
    max-width: 100px;
    aspect-ratio: 3/1;
    background-color: #fff;
    border-radius: 50px;
    transition: all 0.5s ease;

    &::before {
      position: absolute;
      content: "Normale";
      top: 50%;
      transform: translateY(-50%);
      left: -100%;
      color: white;
    }
    &::after {
      position: absolute;
      content: "Difficile";
      top: 50%;
      transform: translateY(-50%);
      right: -90%;
      color: #ffffff50;
    }

    &:hover {
      cursor: pointer;
    }

    & span {
      position: absolute;
      left: .5em;
      top: 50%;
      transform: translateY(-50%);
      height: calc(100% - .5em);
      aspect-ratio: 1/1;
      background: var(--dark-clr);
      border-radius: 50%;
      transition: all 0.2s ease-out;
    }

    input {
      display: none;
    }
    &:has(input:checked) {
      &::after {
        color: white;
      }
      &::before {
        color: #ffffff50;
      }
      & span {
        transform: translate(250%,-50%);
      }
    }
  }

  & > span {
    position: absolute;
    height: clamp(400px, 60vh, 100%);
    z-index: -1;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &.shapeTopRight {
      top: 0;
      right: 0;
      transform: translateX(20%);
    }
    &.shapeBottomLeft {
      bottom: 0;
      left: 0;
      transform: translateX(-20%);
    }
  }
`;

export default Home;
