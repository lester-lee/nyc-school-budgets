import * as React from "react";
import styled from "@emotion/styled";

const Viz = styled("div")`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  margin: 0;
  padding: 0;
  padding-top: 12.5vh;

  display: flex;
  justify-content: center;
`;

const boxWidth = 30;
const gap = 1;
const WaffleChart = styled("figure")`
  width: 70vw;
  max-width: ${10 * boxWidth + 11 * gap}px;
  height: 70vw;
  max-height: ${10 * boxWidth + 11 * gap}px;

  display: grid;
  grid-template: repeat(10, 1fr) / repeat(10, 1fr);
  gap: ${gap}px;

  border: 5px solid var(--text-color);
  border-radius: 3px;
  padding: ${gap + 3}px;
  margin: 0;
`;

const Waffle = styled("div")`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  transition: all 500ms;
  &:hover {
    cursor: pointer;
  }
`;

//====================
// Data Progression
//====================

type Waffle = [category: string, color: string, count: number];
const waffleData: Waffle[][] = [
  [["all", `var(--base)`, 100]],
  [["all", `var(--base)`, 100]],
  [["all", `var(--base)`, 100]],
  [["all", `var(--base)`, 100]],
  [["all", `var(--base)`, 100]],
  [
    ["federal", `var(--federal)`, 15],
    ["state", `var(--state)`, 34],
    ["city", `var(--city)`, 51],
  ],
  [
    ["operating-budget", `var(--operating-budget)`, 80],
    ["debt", `var(--debt)`, 20],
  ],
  [
    ["operating-budget", "var(--operating-budget)", 25],
    ["transportation", "var(--transportation)", 4],
    ["food", "var(--food)", 3],
    ["admin", "var(--admin)", 8],
    ["teachers", "var(--teachers)", 40],
  ],
  [["district", "var(--district)", 50]],
  [["district", "var(--district)", 50]],
  [
    ["fsf", "var(--fsf)", 26],
    ["district", "var(--district)", 24],
  ],
  [["fsf", "var(--fsf)", 26]],
  [["fsf", "var(--fsf)", 100]],
  [
    ["fsf-base", "var(--fsf-base)", 5],
    ["fsf", "var(--fsf)", 95],
  ],
  [
    ["fsf-grade", "var(--fsf-grade)", 60],
    ["fsf-add", "var(--fsf-add)", 40],
  ],
  [
    ["fsf-grade", "var(--fsf-grade)", 21],
    ["fsf-add", "var(--fsf-add)", 8],
    ["blank", "#fff", 71],
  ],
  [
    ["fsf-grade", "var(--fsf-grade)", 20],
    ["fsf-add2", "var(--fsf-add2)", 8],
    ["fsf-add", "var(--fsf-add)", 5],
    ["blank", "#fff", 67],
  ],
  [["fsf", "var(--fsf)", 100]],
  [
    ["fsf", "var(--fsf)", 26],
    ["operating-budget", "var(--operating-budget)", 54],
  ],
];

// Convert active page waffle data into array of colors
const getWaffles = (pageIdx: number) => {
  if (pageIdx >= waffleData.length) return [];
  const rawWaffles = waffleData[pageIdx];
  const waffles: Waffle[] = Array(100).fill(["", `var(--empty)`, 0]);
  let i = 0;
  rawWaffles?.forEach((waffle: Waffle) => {
    for (let j = 0; j < waffle[2]; j++) {
      waffles[99 - i++] = waffle;
    }
  });

  return waffles;
};

// Return the first index where the color is different
const getIndexOfFirstDifference = (
  prevWaffles: Waffle[],
  waffles: Waffle[]
) => {
  let i = 0;
  while (
    i < prevWaffles.length &&
    i < waffles.length &&
    prevWaffles[i][1] == waffles[i][1]
  ) {
    i++;
  }
  return i;
};

//====================
// Markup
//====================

type Props = {
  activePage: number;
  previousPage: number;
};

const Visualization = ({ activePage, previousPage }: Props) => {
  // Find where the colors are changing
  const prevWaffles = getWaffles(previousPage);
  const waffles = getWaffles(activePage);
  const differentIdx = getIndexOfFirstDifference(prevWaffles, waffles);

  return (
    <Viz>
      <WaffleChart>
        {waffles.map(([category, color], i) => (
          <Waffle
            className={category}
            color={color}
            key={i}
            style={{
              transitionDelay: `${Math.max(0, (i - differentIdx) * 10)}ms`,
            }}
          />
        ))}
      </WaffleChart>
    </Viz>
  );
};

export default Visualization;
