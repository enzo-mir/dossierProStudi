import { useState } from "react";
import styled from "styled-components";
import postReserv from "./data/postReserv";

function App() {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [data, setData] = useState();

  const handleSubmit = () => {
    if (Object.keys(form).length === 5) {
      setError("");
      if (
        new Date(form.dateArrived).getTime() + 86400000 >
        new Date(form.dateLeave).getTime()
      ) {
        setError(
          "La date d'arrivée doit être d'au moins un jour avant la date de depart"
        );
      } else {
        queryFetching();
      }
    } else {
      setError("Formulaire pas complet");
    }
  };

  function queryFetching() {
    postReserv(form)
      .then((response) => response.json())
      .then((data) => setData(data.message));
    setForm({});
  }
  return (
    <LandingPage>
      {data ? (
        <div id="result">
          <h1>{data}</h1>
          <button onClick={() => location.reload()}>Revenir à l'accueil</button>
        </div>
      ) : null}
      <div className="galery">
        <img src="https://images.unsplash.com/photo-1551298213-de5c034f5d50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80" />
        <img src="https://images.unsplash.com/photo-1617404442853-782e88a135e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" />
        <img src="https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80" />
        <img src="https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
      </div>
      <article className="container">
        <h1>Réservez vos nuits</h1>
        {error ? <h2>{error}</h2> : null}
        <div className="infos">
          <label htmlFor="nickname">Prénom :</label>
          <input
            type="text"
            autoComplete="given-name"
            name="nickname"
            onChange={(e) => {
              setForm({ ...form, nickname: e.target.value });
            }}
          />
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            autoComplete="family-name"
            name="name"
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
          />
        </div>
        <div className="dates">
          <label htmlFor="datearrived">Date d'arrivé :</label>
          <input
            type="date"
            name="datearrived"
            min={new Date().toLocaleDateString("fr-CA")}
            onChange={(e) => {
              setForm({
                ...form,
                dateArrived: new Date(e.target.value).toLocaleDateString(
                  "En-CA"
                ),
              });
            }}
          />
          <label htmlFor="dateleave">Date de départ :</label>
          <input
            type="date"
            name="dateleave"
            min={new Date().toLocaleDateString("fr-CA")}
            onChange={(e) => {
              setForm({
                ...form,
                dateLeave: new Date(e.target.value).toLocaleDateString("En-CA"),
              });
            }}
          />
        </div>
        <div className="person">
          <label htmlFor="persons">Nombre de personne :</label>
          <input
            type="number"
            name="persons"
            onChange={(e) => {
              setForm({ ...form, person: parseInt(e.target.value) });
              !Number.isInteger(parseInt(e.target.value))
                ? setError("Nombre de personnes invalide")
                : null;
            }}
          />
        </div>
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Réserver
        </button>
      </article>
    </LandingPage>
  );
}

const LandingPage = styled.main`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & h2 {
    text-align: center;
    width: 80%;
    font-weight: 100;
  }

  & #result {
    position: absolute;
    z-index: 50;
    background-color: white;
    width: clamp(300px, 50vw, 700px);
    height: clamp(500px, 70vh, 1000px);
    filter: brightness(70%);
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;

    & button {
      padding: 0.5rem;
      :hover {
        cursor: pointer;
      }
    }
  }

  & .galery {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    grid-template-columns: repeat(4, 20%);
    grid-template-rows: 100%;
    place-items: center;
    gap: 4vw;
    width: clamp(0px, 80vw, 100vw);
    z-index: -1;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
      filter: brightness(80%);
    }
  }

  & article {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    place-items: center;
    background-color: #7e7e7e33;
    backdrop-filter: blur(5px);
    width: clamp(300px, 50vw, 700px);
    height: clamp(500px, 70vh, 1000px);
    border-radius: 20px;
    & > div {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      width: 80%;
    }
    & .dates {
    }
    & input {
      outline: none;
      border: none;
      background-color: #000000b1;
      padding: 0.75rem;
      border-radius: 10px;
      font-size: clamp(13px, 3vw, 16px);
      &[autoComplete="family-name"] {
        text-transform: uppercase;
      }

      &[type="date"]:hover {
        cursor: text;
      }
    }
    & button {
      padding: 0.5rem;
      :hover {
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 800px) {
    & .galery {
      height: 100svh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        height: 20%;
        min-height: 130px;
      }
    }
    & #result {
      width: 70%;
      text-align: center;
    }

    & .container {
      background-color: rgba(126, 126, 126, 0.7);
      width: 70%;
      height: max-content;
      padding-block: 1em;
      gap: 10px;
    }
  }
`;

export default App;
