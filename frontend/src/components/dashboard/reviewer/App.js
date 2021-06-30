import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";

import AddWorkshop from "./components/add-workshop.component";
import Workshop from "./components/workshop.component";
import WorkshopList from "./components/workshop-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tutorials"} className="navbar-brand">
           Reviewer Page
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Research Papers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/workshops"} className="nav-link">
                Workshops
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Research
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/addWorkshop"} className="nav-link">
                Add Workshop
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/tutorials/:id" component={Tutorial} />
            
            <Route exact path={["/", "/workshops"]} component={WorkshopList} />
            <Route path="/workshops/:id" component={Workshop} />
            <Route exact path="/addWorkshop" component={AddWorkshop} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
