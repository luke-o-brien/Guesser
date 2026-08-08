import { useState } from "react";
import Classes from "./Game.module.scss";
import { OperatorBadge } from "../SubComponents/OperatorBadge/operatorBadge";

export const Game = () => {
  const [guessedStations, setGuessedstations] = useState(0);

  const [guess, setGuess] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(guess);
    const matchedStation = castleLine.find(
      (station) =>
        station.name.toLowerCase() === guess.toLowerCase() ||
        station.displayName.toLowerCase() === guess.toLowerCase(),
    );
    if (matchedStation) {
      setGuessedstations(guessedStations + 1);
      matchedStation.found = true;
      setCastleLine(
        castleLine.map((station) =>
          station === matchedStation ? { ...station, found: true } : station,
        ),
      );
      setGuess("");
    } else {
      console.log("not found");
    }
  };
  const [castleLine, setCastleLine] = useState([
    {
      name: "Lincoln Central",
      displayName: "Lincoln",
      operators: ["LNER", "EMR", "northern"],
      managedBy: "EMR",
      location: {
        lat: "53.2265",
        lon: "-0.5401",
      },
      found: false,
    },
    {
      name: "Hykeham",
      displayName: "Hykeham",
      operators: ["EMR"],
      managedBy: "EMR",
      location: {
        lat: "53.1952",
        lon: "-0.5999",
      },
      found: false,
    },
    {
      name: "Swinderby",
      displayName: "Swinderby",
      operators: ["EMR"],
      managedBy: "EMR",
      location: {
        lat: "53.1694",
        lon: "-0.7027",
      },
      found: false,
    },
    {
      name: "Collingham",
      displayName: "Collingham",
      operators: ["EMR"],
      managedBy: "EMR",
      location: {
        lat: "53.1441",
        lon: "-0.7504",
      },
      found: false,
    },
    {
      name: "Newark Castle",
      displayName: "Newark Castle",
      operators: ["EMR"],
      managedBy: "EMR",
      location: {
        lat: "53.0800",
        lon: "-0.8132",
      },
      found: false,
    },
    {
      name: "Newark Northgate",
      displayName: "Newark Northgate",
      operators: ["LNER", "EMR"],
      managedBy: "LNER",
      location: {
        lat: "",
        lon: "",
      },
      found: false,
    },
    {
      name: "Rolleston",
      displayName: "Rolleston",
      operators: ["EMR"],
      managedBy: "EMR",
      location: {
        lat: "",
        lon: "",
      },
      found: false,
    },
    {
      name: "Fiskerton",
      displayName: "Fiskerton",
      operators: ["EMR"],
      managedBy: "EMR",
      location: {
        lat: "",
        lon: "",
      },
      found: false,
    },
    {
      name: "Bleasby",
      displayName: "Bleasby",
      operators: ["EMR"],
      managedBy: "EMR",
      location: {
        lat: "",
        lon: "",
      },
      found: false,
    },
    {
      name: "Thurgarton",
      displayName: "Thurgarton",
      operators: ["EMR"],
      managedBy: "EMR",
      location: {
        lat: "",
        lon: "",
      },
      found: false,
    },
    {
      name: "Lowdham",
      displayName: "Lowdham",
      operators: ["EMR"],
      managedBy: "EMR",
      location: {
        lat: "",
        lon: "",
      },
      found: false,
    },
    {
      name: "Burton Joyce",
      displayName: "Burton Joyce",
      operators: ["EMR"],
      managedBy: "EMR",
      location: {
        lat: "",
        lon: "",
      },
      found: false,
    },
    {
      name: "Carlton",
      displayName: "Carlton",
      operators: ["EMR"],
      managedBy: "EMR",
      location: {
        lat: "",
        lon: "",
      },
      found: false,
    },
    {
      name: "Nottingham",
      displayName: "Nottingham",
      operators: ["EMR", "crossCountry", "northern" ],
      managedBy: "EMR",
      location: {
        lat: "",
        lon: "",
      },
      found: false,
    },
  ]);
  return (
    <div style={{width: '50vw'}}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        ></input>
      </form>
      <progress
        style={{ accentColor: "purple" }}
        max={14}
        value={guessedStations}
      ></progress>
      <p>{guessedStations}/14</p>
      {castleLine.map((station, idx) => (
        <div
          key={idx}
          style={station.found ? { backgroundColor: "green" } : {}}
          className={Classes.StationPoint}
        >
          {station.found && station.displayName}
          {station.found && (
            <div className={Classes.BadgeContainer}>
              {station.operators.map((Operator, idx) => (
                <OperatorBadge key={idx} operator={Operator} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
