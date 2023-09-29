import { styled } from "styled-components";

export const Button = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  transition: all 0.2s ease;
  color: white;

  &::after,
  &::before {
    position: absolute;
    content: "";
    border-top: 2px solid white;
    border-bottom: 2px solid white;
    width: 50%;
    height: 100%;
    transition: all 0.2s ease-out;
  }

  &::after {
    top: 0;
    right: 0;
    border-right: 2px solid white;
  }
  &::before {
    top: 0;
    left: 0;
    border-left: 2px solid white;
  }

  &:hover {
    background-color: #fff;
    color: var(--dark-clr);
    cursor: pointer;

    &::after {
      transform: translateX(25%);
    }
    &::before {
      transform: translateX(-25%);
    }
  }
`;
