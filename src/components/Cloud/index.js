import React, { useState, useEffect } from "react";
import "./index.css";
import "../bootstrap/bootstrap.min.css";
import "./loadingbar.css";
import Header from "../header";

const Cloud = () => {
  const [value, setValue] = useState(localStorage.getItem("inputValue"));
  const [username, setUsername] = useState(localStorage.getItem("user"));
  const [check, setCheck] = useState(true);
  const showProgress = () => {
    console.log("showing progress...");
    document.getElementById("progress").style.display = "block";
    //document.getElementById("value").disabled = true;
    // document.getElementById("submit-button").innerText = "Check Status";
    //document.getElementById("submit-button").setAttribute( "onClick", getProgress );
    refreshTable();
    getProgress();
    setCheck(false);
  };

  // const imgUrls={
  //   completed: "/completed.", 
  //   idle: "/idle.webp",
  //   running: ""
  // }

  const handleChange = (e) => {
    setValue(e.target.value);
    localStorage.setItem("inputValue", e.target.value);
    console.log(localStorage.getItem("inputValue"));
  };

  const hudson = (data) => {
    console.log("task finished");
    const status = JSON.stringify(data);
    // blurt(
    //     'Task Successfully completed',
    //     'Status: ' + status,
    //     'success'
    // );
    document.getElementById("progress").style.display = "none";
    document.getElementById("value").disabled = false;
    document.getElementById("submit-button").innerText = "Submit";

    //document.getElementById("submit-button").setAttribute( "onClick", showProgress );
    //document.getElementById("statusArea").innerHTML += JSON.stringify(data.status);
  };

  function getTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    return [h, m, s].join(":");
  }

  const changeToIdle = async (name) => {
    console.log("changing to idle for ", name);
    const resetUrl =
      "https://us-central1-healthcarepci.cloudfunctions.net/refresh?message=" +name;
    console.log("In changing to idle:");
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "no-cors",
    };
    const response = await fetch(resetUrl, options)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const selectIcon = (x,stat,name) => {
   console.log("status in icon:",x,stat);
   const table = document.querySelector("#my-refresh-table");
   if(stat === "initial")
    table.rows[Number(x)].cells[4].querySelector("img").src ="/initial.png";
   else if(stat === "running")
    table.rows[Number(x)].cells[4].querySelector("img").src ="/process.gif";
    else if(stat === "idle")
     table.rows[Number(x)].cells[4].querySelector("img").src ="/idle.webp";
     else if(stat === "completed"){
      table.rows[Number(x)].cells[4].querySelector("img").src ="/completed.svg";
      changeToIdle(name)
     }
    else 
    table.rows[Number(x)].cells[4].querySelector("img").src ="/favicon.ico";
    // console.log("status in icon:",stat);
    // let img = "/favicon.ico";
    // if(stat === "initial") {
    //   console.log("initial icon");
    //   img= "/intial.png";
    // }
    // else if (stat === "running") {
    //   img= "/process.gif";
    // }
    // else if (stat === "idle"){
    //   img= "/idle.webp"
    // }
    // else if (stat === "completed") {
    //   img= "/completed.webp";
    // }
    // return img;
  }

  const refreshTable = () => {
    console.log("inside refresh table");
    fetch(
      "https://us-east1-healthcarepci.cloudfunctions.net/StatusCheck?message=humana_pipe"
    )
      .then((response) => {
        // The request was successful
        if (response.ok) {
          // The server returned a 200 status code
          // You can process the response here
          return response.json();
        } else {
          // The server returned a non-200 status code
          // You can handle the error here
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        const table = document.querySelector("#my-refresh-table");
        console.log(data.data[0].status);
        table.rows[1].cells[0].innerHTML = data.data[0].payer;
        table.rows[1].cells[1].innerHTML = data.data[0].processedfiles;
        table.rows[1].cells[2].innerHTML = data.data[0].rate_files;
        table.rows[1].cells[3].innerHTML = data.data[0].last_run;
        selectIcon(1,data.data[0].stat,data.data[0].dag);
        console.log("at table:", String(selectIcon(1,data.data[0].stat,data.data[0].dag)))

        table.rows[2].cells[0].innerHTML = data.data[1].payer;
        table.rows[2].cells[1].innerHTML = data.data[1].processedfiles;
        table.rows[2].cells[2].innerHTML = data.data[1].rate_files;
        table.rows[2].cells[3].innerHTML = data.data[1].last_run;
        selectIcon(2,data.data[1].stat,data.data[1].dag);

        table.rows[3].cells[0].innerHTML = data.data[2].payer;
        table.rows[3].cells[1].innerHTML = data.data[2].processedfiles;
        table.rows[3].cells[2].innerHTML = data.data[2].rate_files;
        table.rows[3].cells[3].innerHTML = data.data[2].last_run;
        selectIcon(3, data.data[2].stat,data.data[2].dag);

        table.rows[4].cells[0].innerHTML = data.data[3].payer;
        table.rows[4].cells[1].innerHTML = data.data[3].processedfiles;
        table.rows[4].cells[2].innerHTML = data.data[3].rate_files;
        table.rows[4].cells[3].innerHTML = data.data[3].last_run;
        selectIcon(4, data.data[3].stat,data.data[3].dag);

        table.rows[5].cells[0].innerHTML = data.data[6].payer;
        table.rows[5].cells[1].innerHTML = data.data[6].processedfiles;
        table.rows[5].cells[2].innerHTML = data.data[6].rate_files;
        table.rows[5].cells[3].innerHTML = data.data[6].last_run;
        selectIcon(5, data.data[6].stat,data.data[6].dag);

        table.rows[6].cells[0].innerHTML = data.data[5].payer;
        table.rows[6].cells[1].innerHTML = data.data[5].processedfiles;
        table.rows[6].cells[2].innerHTML = data.data[5].rate_files;
        table.rows[6].cells[3].innerHTML = data.data[5].last_run;
        selectIcon(6, data.data[5].stat,data.data[5].dag);

        if (
          JSON.stringify(data.status) ==
          "https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/confirm-icon.svg"
        ) {
          changeToIdle();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const checkStatus = () => {
    console.log("inside check status");
    console.log("Check: ", check);

    const userActionq = async (fun) => {
      const StatusUrlCheck =
        "https://us-east1-healthcarepci.cloudfunctions.net/StatusCheck?message=" +
        value;
      console.log("value: " + value);
      const response = await fetch(StatusUrlCheck)
        .then((response) => response.json())
        .then((json) => fun(json))
        .catch((err) => console.log(err));
    };

    const addStatusq = (data) => {
      console.log("data: " + JSON.stringify(data));
      if (JSON.stringify(data.status) == '"initial"') {
        document.getElementById("statusArea").innerHTML =
          "Task successfully added to queue";
      } else if (JSON.stringify(data.status) == '"idle"') {
        alert("Task not started yet. Click submit to start.");
        hudson(data);
        setCheck(true);
      } else if (JSON.stringify(data.status) == '"completed"') {
        alert("Task Completed successfully");
        changeToIdle();
        hudson(data);
        setCheck(true);
      } else if (JSON.stringify(data.status) == '"running"') {
        document.getElementById("statusArea").innerHTML = Number(
          data.processedfiles
        );
        document.getElementById("status-heading").style.display = "inline";
      }
    };

    userActionq(addStatusq);
  };
  const getProgress = () => {
    setCheck(false);
    console.log("inside get progress");
    console.log("Check: ", check);
    const value = document.querySelector("#value").value;

    const userAction = async (fun) => {
      const StatusUrl =
        "https://us-east1-healthcarepci.cloudfunctions.net/test?message=" +
        value;
      console.log("value: " + value);

      const response = await fetch(StatusUrl)
        .then((response) => response.json())
        .then((json) => fun(json))
        .catch((err) => console.log(err));
    };

    const addStatus = (data) => {
      console.log("data: " + JSON.stringify(data));
      if (JSON.stringify(data.status) == '"initial"')
        document.getElementById("statusArea").innerHTML =
          "Task successfully added to queue";
      else if (JSON.stringify(data.status) == '"completed"') {
        alert("Task Completed successfully");
        changeToIdle();
        hudson(data);
      } else if (JSON.stringify(data.status) == '"running"') {
        alert("Task Already running");
        document.getElementById("statusArea").innerHTML = Number(
          data.processedfiles
        );
        document.getElementById("status-heading").style.display = "inline";
      }
      // document.getElementById("statusArea").innerHTML = JSON.stringify(data);
      // document.getElementById("status-heading").style.display = "inline";
      // if(JSON.stringify(data.status)=="\"completed\""){
      //     //hudson(data);
      // }
    };
    userAction(addStatus);
  };

  useEffect(() => {
    console.log("Check: ", check);
    console.log("local value: ", localStorage.getItem("inputValue"));
    console.log("value: ", value);
    console.log("local user: ", localStorage.getItem("user"));
    console.log("username: ", username);
    if (
      localStorage.getItem("inputValue") === "" ||
      !localStorage.getItem("inputValue")
    ) {
      console.log("fresh session");
    } else {
      console.log("continue session");
      checkStatus();
    }
    if (localStorage.getItem("user") === "" || !localStorage.getItem("user")) {
      console.log("new user");
      let person = prompt("Please enter your name", "lokesh");
      //input modal
      setUsername(person);
      localStorage.setItem("user", person);
    } else {
      console.log("existing user: " + username);
    }
  }, []);

  return (
    <React.Fragment>
        <div id="whole">
          <Header />
          <div className="row">
            <div className="column1">
              <div className="container">
                <div className="hellomsz">Hey { username || "User"}</div>
                <form id="form">
                  <h3 id="h3id">Select Payer :</h3>

                  <div id="tot">
                    <div id="dropd">
                      <select
                        className="form-select"
                        id="value"
                        value={value || ""}
                        onChange={handleChange}
                      >
                        <option value="centene_pipe">Centene</option>

                        <option value="Cigna">Cigna</option>

                        <option value="uhc_pipe">UHC</option>

                        <option value="humana_pipe">Humana</option>

                        <option value="Anthem">Anthem</option>

                        <option value="composer_trigger_response_dag">
                          sample
                        </option>

                        <option value="downloadFileToBucketDAG">l2b</option>
                      </select>{" "}
                    </div>

                    <div id="procbtn">
                      <table>
                        <th className="tab">
                          <button
                            className="btn btn-outline-success"
                            type="button"
                            id="submit-button"
                            // onClick={check ? showProgress : checkStatus}
                            onClick={showProgress}
                          >
                            Process
                          </button>
                        </th>

                        <th>
                          <button
                            className="btn btn-outline-success"
                            type="button"
                            id="submit-button"
                            // onClick={check ? showProgress : checkStatus}
                            onClick={refreshTable}
                          >
                            Refresh
                          </button>
                        </th>
                      </table>
                    </div>
                  </div>
                </form>
                <div id="progress">
                  <table className="table" id="my-refresh-table">
                    <thead>
                      <tr>
                        <th id="payer" scope="col">
                          Payer
                        </th>

                        <th id="indexf" scope="col">
                          Index Files Processed
                        </th>

                        <th id="ratef" scope="col">
                          Rate Files Processed
                        </th>

                        <th id="lastrun" scope="col">
                          Last Run Date
                        </th>

                        <th scope="col">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <th scope="row"></th>

                        <td></td>

                        <td></td>

                        <td></td>

                        <td>
                          <img src="" width="30" height="30"></img>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row"></th>

                        <td></td>

                        <td></td>

                        <td></td>
                        <td>
                          <img src="" width="30" height="25"></img>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row"></th>

                        <td></td>

                        <td></td>

                        <td></td>
                        <td colspan="2">
                          <img src="" width="30" height="25"></img>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row"></th>

                        <td></td>

                        <td></td>
                        <td></td>
                        <td colspan="2">
                          <img src="" width="30" height="25"></img>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"></th>

                        <td></td>

                        <td></td>
                        <td></td>
                        <td colspan="2">
                          <img src="" width="30" height="25"></img>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="column2">
              <div className="container">
                <div id="progress">
                  <br />

                  <br />

                  <h6>Please wait...</h6>

                  <div className="loader" id="loadbarid">
                    <div className="loaderBar"></div>
                  </div>

                  <br />

                  <h6 id="status-heading">No. of files processed: </h6>

                  <span id="statusArea"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <img src="/process.gif" alt="image2" /> */}
    </React.Fragment>
  );
};

export default Cloud;

// const options = {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   mode: "no-cors"
// }
