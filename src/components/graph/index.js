import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const x_data = Array.from({ length: 60 }, (_, i) => i + 1);

const Graph = (props) => {
  //const xcoords = props.data.x;
  //const ycoords = props.data.y;
  //console.log("in graph",xcoords,ycoords)

  const titles = props.titles;
  const dataAr = props.dataAr;
  console.log("title of graph comp: ", titles);

  const transformData = (data) => {
    console.log("before transform", data);
    // let plot_data = [];

    let y_data = [];
    data.map((each) => {
      y_data.push(each);
    });
    console.log("in y", y_data);
    return y_data;
  };

  return (
    <React.Fragment>
      <Plot
        data={[
          {
            x: x_data,
            y: transformData(dataAr)[0],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
          { type: "bar" },
        ]}
        layout={{ width: 480, height: 360, title: titles[0] || "Node-1" }}
        // , grid: {rows: 1, columns: 2, pattern: 'independent'} //inside layout
        config={{ displayModeBar: false, scrollZoom: false }}
      />
      <Plot
        data={[
          {
            x: x_data,
            y: transformData(dataAr)[1],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
          { type: "bar" },
        ]}
        layout={{ width: 480, height: 360, title: titles[1] || "Node - 2 " }}
        // , grid: {rows: 1, columns: 2, pattern: 'independent'} //inside layout
        config={{ displayModeBar: false, scrollZoom: false }}
      />
      <Plot
        data={[
          {
            x: x_data,
            y: transformData(dataAr)[2],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
          { type: "bar" },
        ]}
        layout={{ width: 480, height: 360, title: titles[2] || "Node-3" }}
        // , grid: {rows: 1, columns: 2, pattern: 'independent'} //inside layout
        config={{ displayModeBar: false, scrollZoom: false }}
      />
    </React.Fragment>
  );
};

export default Graph;
