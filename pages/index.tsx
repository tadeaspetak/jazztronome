import { useEffect, useState } from "react";

import { Tune, getStrokes, Parsed } from "../lib";
import { useInterval } from "../lib/useInterval";

import heavyClickFile from "../sounds/click1.wav";
import lightClickFile from "../sounds/click2.wav";

import song1File from "../song1.json";
import song2File from "../song2.json";
import song3File from "../song3.json";

const tunes: { [key: string]: Tune } = {
  sunshine: (song1File as unknown) as Tune,
  breeze: (song2File as unknown) as Tune,
  cupcakes: (song3File as unknown) as Tune,
};

const WelcomePage = () => {
  const [tune, setTune] = useState<string>("sunshine");
  const [heavyClick, setHeavyClick] = useState<HTMLAudioElement | null>(null);
  const [lightClick, setLightClick] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [position, setPosition] = useState(-1);
  const [currentRow, setCurrentRow] = useState(-1);
  const [strokes, setStrokes] = useState<Parsed>({ total: 0, rows: [] });

  const [tempo, setTempo] = useState(tunes[tune].track.tempo);

  useEffect(() => {
    setHeavyClick(new Audio(heavyClickFile));
    setLightClick(new Audio(lightClickFile));
  }, []);

  useEffect(() => {
    const t = tunes[tune];
    setStrokes(getStrokes(t));
    // setTempo(t.track.tempo);
  }, [tune]);

  const playAndAdvance = () => {
    if (!heavyClick || !lightClick) throw new Error("clicks not available");
    heavyClick.pause();
    heavyClick.currentTime = 0;
    lightClick.pause();
    lightClick.currentTime = 0;

    const newPosition = position < strokes.total - 1 ? position + 1 : 0;
    setPosition(newPosition);

    const rowIndex = strokes.rows.findIndex(
      (r) => r.min <= newPosition && r.max >= newPosition,
    );
    if (rowIndex < 0) throw new Error(`No stroke at position ${newPosition}`);
    setCurrentRow(rowIndex);
    const row = strokes.rows[rowIndex];

    const stroke = row.strokes[newPosition - row.min];
    console.log({ stroke });
    // heavyClick.pause();
    // lightClick.pause();
    if (stroke === "H") heavyClick.play();
    else if (stroke === "L") lightClick.play();
    else throw new Error(`Unknown stroke type ${stroke}.`);
  };
  useInterval(() => playAndAdvance(), isPlaying ? 60000 / tempo : null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 min-w-screen">
      <div className="flex flex-col items-center max-w-xl space-y-4 cursor-pointer">
        <select
          value={tune}
          onChange={(e) => {
            console.log({ e, ct: e.currentTarget, v: e.target.value });
            setTune(e.target.value);
          }}
        >
          <option value="sunshine">Sunshine</option>
          <option value="breeze">Breeze</option>
          <option value="cupcakes">Cupcakes</option>
        </select>

        <input
          type="number"
          className="w-12"
          value={tempo}
          onChange={(e) => {
            console.log(
              e.currentTarget.value,
              parseInt(e.currentTarget.value, 0),
            );
            setTempo(parseInt(e.currentTarget.value, 10));
          }}
        />
        <div className="w-40 text-3xl border-b-2 border-red-600 hover:border-white xs:w-56 sm:w-auto">
          <button
            onClick={() => {
              setPosition(-1);
              setIsPlaying(!isPlaying);
            }}
          >
            Play me the jazz
          </button>
        </div>
      </div>
      {strokes.rows.map((row, index) => {
        const isCurrentRow = currentRow === index;
        return (
          <span key={index} className={`${isCurrentRow ? "font-bold" : ""}`}>
            {row.strokes.split("").map((c, i) => (
              <span
                key={i}
                className={`${
                  isCurrentRow && position - row.min === i ? "underline" : ""
                }`}
              >
                {c}
              </span>
            ))}
          </span>
        );
      })}
    </div>
  );
};

export default WelcomePage;
