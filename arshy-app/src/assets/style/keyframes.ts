import { keyframes } from 'styled-components';

/* keyframes */
export const arrowStr2 = keyframes`
  0%,
  100% {
    top: 3px;
  }
  50% {
    top: -2px;
  }
`;

export const fromB2 = keyframes`
  0% {
    opacity: 0;
    bottom: -30px;
  }
  100% {
    opacity: 1;
    bottom: 0;
  }
`;

export const toB2 = keyframes`
  100% {
    opacity: 0;
    bottom: -30px;
  }
  0% {
    opacity: 1;
    bottom: 0;
  }
`;

export const fromL = keyframes`
  0% {
    opacity: 0;
    right: 15px;
  }
  100% {
    opacity: 1;
    right: 0;
  }
`;

export const fromR = keyframes`
  0% {
    opacity: 0;
    left: 15px;
  }
  100% {
    opacity: 1;
    left: 0;
  }
`;

export const fromT = keyframes`
  0% {
    opacity: 0;
    top: -15px;
  }
  100% {
    opacity: 1;
    top: 0;
  }
`;

export const fromB = keyframes`
  0% {
    opacity: 0;
    top: 15px;
  }
  100% {
    opacity: 1;
    top: 0;
  }
`;

export const toL = keyframes`
  100% {
    opacity: 0;
    right: 15px;
  }
  0% {
    opacity: 1;
    right: 0;
  }
`;

export const toR = keyframes`
  100% {
    opacity: 0;
    left: 15px;
  }
  0% {
    opacity: 1;
    left: 0;
  }
`;

export const toT = keyframes`
  100% {
    opacity: 0;
    top: -15px;
  }
  0% {
    opacity: 1;
    top: 0;
  }
`;

export const toB = keyframes`
  100% {
    opacity: 0;
    top: 15px;
  }
  0% {
    opacity: 1;
    top: 0;
  }
`;

export const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const zoomIn = keyframes`
  0%,
  10%,
  20%,
  30%,
  100% {
    transform: scale(1);
  }
  5%,
  15%,
  25% {
    transform: scale(1.1);
  }
`;

export const show = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const rotationY = keyframes`
  0% {
    opacity: 0;
    transform: rotateY(0deg);
  }
  33% {
    opacity: 1;
    transform: rotateY(360deg);
  }
  66% {
    opacity: 1;
    transform: rotateY(0deg);
  }
  100% {
    opacity: 1;
    transform: rotateY(360deg);
  }
`;

export const shake = keyframes`
  0%,
  50%,
  100% {
    transform: rotate3D(10, 10, 10, 0deg);
  }
  25% {
    transform: rotate3D(10, 10, 10, 10deg);
  }
  75% {
    transform: rotate3D(50, 10, 30, 35deg);
  }
`;

export const nabi = keyframes`
  0% {
    top: calc(50% - 230px);
    transform: rotateX(0deg);
  }
  50% {
    top: calc(50% - 224px);
    transform: rotateX(30deg);
  }
  100% {
    top: calc(50% - 230px);
    transform: rotateX(0deg);
  }
`;
