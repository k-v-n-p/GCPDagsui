import React, { useState, useEffect } from "react";
import Graph from "../graph";

import Header from "../header";

const Dashboard = () => {
  const [coordsAr, setCoordsAr] = useState([]);
  const [titles, setTitles] = useState([]);

  //uncomment for using with json data after converting from backend

  //const [coords, setCoords] = useState({});

  // const getDataJson = async () => {
  //   console.log("in get data")
  //       const CordinatesUrl ="http://localhost:3001/dashboard";
  //       const response = await fetch(CordinatesUrl, {
  //         method: "GET",
  //         headers: {"Content-Type": "application/json"},
  //         })
  //         .then((response) => {
  //           if (response.ok) {
  //             return response.json();
  //           } else {
  //             throw new Error(response.statusText);
  //           }
  //         })
  //         .then((data) => {
  //           setCoordsAr(data);
  //           console.log(coordsAr)
  //         })
  //         .catch((err) => console.log(err));
  // }

  const getData = async () => {
    console.log("in get data");
    const CordinatesUrl = "http://localhost:3001/dashboard";
    const response = await fetch(CordinatesUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        console.log("data", data.points);
        let title = [];
        data.points.map((each) => {
          title.push(each.shift());
        });
        console.log("title: ", title);
        setTitles(title);
        setCoordsAr(data.points);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    // fetch("http://localhost:3001/")
    // .then((response) => response.json())
    // .then((data) => setCoords(data));
  }, []);

  return (
    <div id="whole">
      <Header />
      <br />
      <br />
      <button onClick={getData}>refresh</button> <br />
      <Graph dataAr={coordsAr} titles={titles} />
    </div>
  );
};
export default Dashboard;
