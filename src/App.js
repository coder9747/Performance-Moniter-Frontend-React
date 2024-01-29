import logo from "./logo.svg";
import "./App.css";
import socket from "./Socket/Socket";
import Widget from "./WidgetComponent/Widget";
import { useEffect, useState } from "react";

function App() {
  const [allData, setData] = useState({});
  useEffect(() => {
    socket.on("welcome", (data) => {
      console.log(data);
    });
    socket.on("react-data", (data) => {
      setData((state) => {
        const obj = { ...state, [data.id]: data };
        return obj;
      });
    });
  }, []);
  return (
    <div className="main-body">
      <h2 className="heading">Performance Moniter</h2>
      <div className="grid">
        {Object.values(allData).map((item) => {
          return <Widget {...item} key={item.id} />;
        })}
      </div>
    </div>
  );
}

export default App;
