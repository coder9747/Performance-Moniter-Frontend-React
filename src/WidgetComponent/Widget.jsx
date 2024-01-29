import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressBar from "@ramonak/react-progress-bar";
import "./style.css";
import socket from "../Socket/Socket";

const Widget = ({
  cpuPercentage,
  user,
  memInfo,
  numberOfCors,
  netStat,
  operatingSystem,
  ip,
  arc,
  type,
  hostName,
  id,
}) => {
  console.log('hey');
  const [isAlive, setAlive] = useState(false);
  useEffect(() => {
    socket.on("isAlive", ({machineId}) => {
      window.location.reload();
    });
  }, []);
  return (
    <div className="widget-box">
      <h3 className="header">{user?.toUpperCase()}</h3>
      <p className="info">CPU</p>
      <CircularProgressbar
        value={cpuPercentage}
        text={cpuPercentage}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          rotation: 0,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: "butt",

          // Text size
          textSize: "16px",

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          pathColor:
            cpuPercentage < 25
              ? "green"
              : cpuPercentage >= 25 && cpuPercentage <= 50
              ? "yellow"
              : "red",
          textColor: "#f88",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
      <div className="container" id={id}>
        <div>
          <h3>Cpu Info</h3>
          <p>Number of Cors : {numberOfCors}</p>
          <p>Architecture : {arc}</p>
        </div>
        <div>
          <h3>Operating System </h3>
          <p>System : {operatingSystem}</p>
          <p>Type : {type}</p>
          <p>HostName : {hostName}</p>
          <p>IP : {ip}</p>
        </div>
        <div>
          <h3>Net Stat</h3>
          <p>Input : {netStat?.total?.inputMb}</p>
          <p>Input : {netStat?.total?.outputMb}</p>
        </div>
        <div>
          <h3>Memory Info</h3>
          <p>Total : {memInfo?.totalGb} GB</p>
          <p>Used : {memInfo?.usedGb} GB</p>
          <p>Free : {memInfo?.freeGb} GB</p>
        </div>
      </div>
    </div>
  );
};

export default Widget;

function GridEle(props) {
  const { heading, child } = props;
  return (
    <div>
      <h3>{heading}</h3>
      {Object.keys(child).map((item) => {
        return <div>{child[item]}</div>;
      })}
    </div>
  );
}
