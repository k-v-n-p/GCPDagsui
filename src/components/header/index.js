
const Header = () => {
    return (
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
              <a class="navbar-brand" href="/home">
                <img
                  src="http://www.punchittech.com/assets/img/brillio-logo.jpg"
                  alt=""
                  width="100"
                  height="70"
                />
              </a>

              <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                  <li class="nav-item">PCI Data File Processing Tool</li>
                </ul>
                <div
                  class="btn-group"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <input
                    type="radio"
                    class="btn-check  "
                    name="btnradio"
                    id="btnradio1"
                    autocomplete="off"
                    checked
                  ></input>
                  <label class="btn btn-outline-success" for="btnradio1">
                    Monitoring
                  </label>

                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio2"
                    autocomplete="off"
                  ></input>
                  <label class="btn btn-outline-success" for="btnradio2">
                    Cost Explorer
                  </label>
                </div>
              </div>
            </div>
            
          </nav>
    )
} 
export default Header;