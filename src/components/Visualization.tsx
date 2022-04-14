import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Viz = styled('div')`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  z-index: -1;
`;

const WaffleChart = styled('figure')`
  width: 80vw;
  max-width: 300px;
  height: 80vw;
  max-height: 300px;

  margin: 5vh auto;
  margin-top: 10vh;

  display: grid;
  grid-template: repeat(10, 1fr) / repeat(10, 1fr);
  gap: 2px;

  border: 5px solid #333;
  padding: 2px;
`;

const Waffle = styled('div')`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  transition: all 500ms;
`;

//====================
// Data Progression
//====================

type Waffle = [color: string, count: number];
const waffleData: Waffle[][] = [
  [[`var(--dark-blue)`, 100]],
  [
    [`var(--dark-blue)`, 80],
    [`var(--red)`, 20],
  ],
  [[`var(--dark-blue)`, 80]],
  [
    [`var(--dark-blue)`, 53],
    [`var(--red)`, 6],
    [`var(--yellow)`, 21],
  ],
];

// Convert active page waffle data into array of colors
const getPageColors = (pageIdx: number) => {
  const waffles = waffleData[pageIdx];
  const colors = Array(100).fill(`var(--light-gray)`);
  let i = 0;
  waffles?.forEach(([color, count]) => {
    for (let j = 0; j < count; j++) {
      colors[i++] = color;
    }
  });

  return colors;
};

// Given two arrays of colors where order matters,
// return [same colors, changed colors]
const getDifferenceInColors = (previousColors: string[], colors: string[]) => {
  const sameColors: string[] = [];

  let i = 0;
  while (i < previousColors.length && previousColors[i] == colors[i]) {
    sameColors.push(previousColors[i++]);
  }

  return [sameColors, colors.splice(i)];
};

//====================
// Markup
//====================

type Props = {
  activePage: number;
  previousPage: number;
};

const Visualization = ({ activePage, previousPage }: Props) => {
  const previousColors = getPageColors(previousPage);
  const colors = getPageColors(activePage);

  const [sameColors, newColors] = getDifferenceInColors(previousColors, colors);
  console.log(newColors);
  

  return (
    <Viz>
      {activePage}
      <WaffleChart>
        {sameColors.map((color, i) => (
          <Waffle color={color} key={color + i} />
        ))}
        {newColors.map((color, i) => (
          <Waffle
            color={color}
            key={100+color + i}
            style={{ transitionDelay: `${i * 75}ms` }}
          />
        ))}
      </WaffleChart>
    </Viz>
  );
};

export default Visualization;
