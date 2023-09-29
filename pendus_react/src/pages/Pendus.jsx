import { styled } from "styled-components";
import SvgPendus from "../assets/images/svgPendus";
import { stateAdmin } from "../store/state.store";
import GameOver from "./components/GameOver";
import Victory from "./components/Victory";
import { useRef, useEffect, useState } from "react";
import { stateMode } from "../store/mode.sore";

const Pendus = ({ word }) => {
  const setCount = stateAdmin((state) => state.setCount);
  const [over, setOver] = useState(false);
  const [win, setWin] = useState(false);
  const counterWinTrade = useRef(0);
  const counterWin = useRef(0);
  const counter = stateAdmin((state) => state.counter);
  const mode = stateMode((state) => state.mode);
  const [table, setTable] = useState([]);
  let tableAlphabet = "abcdefghijklmnopqrstuvwxyz";

  function handleSelectLetters(e, w) {
    let countFaultIncrement = mode == "normale" ? 1 : 2;
    e.target.classList.add("picked");
    if (!table.includes(w)) {
      setTable([...table, w]);
      if (word.indexOf(w) == -1) {
        setCount(counter + countFaultIncrement);
      } else {
        counterWin.current += 1;
      }
    }

    word.split("").map((wo) => {
      if (wo == w) counterWinTrade.current += 1;
    });

    if (counterWinTrade.current == word.length) setWin(true);
  }

  useEffect(() => {
    if (counter >= 10) {
      setTimeout(() => {
        setOver(true);
      }, 250);
    }
  }, [counter]);

  return (
    <Wrapper>
      {over ? (
        <GameOver />
      ) : win ? (
        <Victory winCounter={counterWin.current} />
      ) : (
        <>
          <SvgPendus />
          <div className="lineWord">
            {word.split("").map((w, i) => {
              return (
                <div key={i}>
                  <p>{table.includes(w) ? w : "."}</p>
                  <span></span>
                </div>
              );
            })}
          </div>
          <div className="keyboard">
            {tableAlphabet.split("").map((w, i) => {
              return (
                <button
                  key={i}
                  onClick={(e) => handleSelectLetters(e, w.toUpperCase())}
                >
                  {w.toUpperCase()}
                </button>
              );
            })}
          </div>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  position: relative;
  height: 100svh;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 800px) {
    width: 100%;
    padding-inline: 20px;
  }

  svg {
    width: clamp(200px, 40vw, 300px);
    line {
      transition: all 0.2s ease;
      opacity: 0;
      &.active {
        opacity: 1;
      }
    }
    circle {
      transition: all 0.2s ease;
      opacity: 0;
      &.activeCircle {
        opacity: 1;
      }
    }
  }

  .lineWord {
    display: flex;
    gap: 20px;

    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p {
        color: white;
        font-size: var(--font-size-l);
        line-height: 100%;
      }
      span {
        background-color: #fff;
        width: var(--font-size-l);
        height: 2px;
      }
    }
  }

  .keyboard {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow: auto;
    height: 40vh;
    gap: 20px;

    button {
      width: calc(100% / 13 + 20px);
      border: 2px solid white;
      background-color: transparent;
      color: white;
      border-radius: 10px;

      &.picked {
        background-color: #fff;
        color: var(--dark-clr);
      }
    }
  }
`;
export default Pendus;
