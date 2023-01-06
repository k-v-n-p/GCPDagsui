import React,{ useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

import Header from "../header";

const Dashboard = () => {


    const getData = async () => {
          const CordinatesUrl ="http://localhost:3001/";
          const response = await fetch(CordinatesUrl, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            })
            .then((response) => {
              console.log(response.ok,response.json())
              if (response.ok) {
                return response.json();
              } else {
                throw new Error(response.statusText);
              }
            })
            .then((data) => {
                console.log(JSON.stringify(data));
            })
    }
    getData();

    return (
        
        <div id="whole">
            <Header />
            
            <Plot
            data={[
            {
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
            },
            {type: 'bar'},
            ]}
            layout={ {width: 480, height: 360, title: 'graph'} }
            // , grid: {rows: 1, columns: 2, pattern: 'independent'} //inside layout
            config={{ displayModeBar : false, scrollZoom: false }}
    
        />
      </div>
    );
}
export default Dashboard;