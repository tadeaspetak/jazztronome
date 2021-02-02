export interface Tune {
  measures: { [key: string]: string }; // { "measure1": "HLLHLLHL" }
  groups: { [key: string]: [string, number][] }; // {"group1" : [["measure1", count], ["measure2", count]]...}
  track: {
    name: string;
    groups: [string, number][];
    tempo: number;
  };
}

export interface Parsed {
  total: number;
  rows: {
    strokes: string;
    min: number;
    max: number;
  }[];
}

const range = (count: number) => Array.from({ length: count });

export const getStrokes = (tune: Tune): Parsed => {
  const groups = tune.track.groups.map((refs) =>
    range(refs[1]).map(() => tune.groups[refs[0]]),
  );
  const strokes = groups
    .flat()
    .map((group) =>
      group.map((beat) => range(beat[1]).map(() => tune.measures[beat[0]])),
    )
    .flat()
    .flat();

  let total = 0;
  const rows = strokes.map((strokes) => {
    const min = total;
    const max = min + strokes.length - 1;
    total += strokes.length;
    return { strokes, min, max };
  });
  return { rows, total };
};
