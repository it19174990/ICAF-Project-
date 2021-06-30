import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";

//////

import {Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";

import AddWorkshop from "./components/add-workshop.component";
import Workshop from "./components/workshop.component";
import WorkshopList from "./components/workshop-list.component";
import App from "./App";

//////

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
	<div>
	
      <div style={{ height: "35vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>REVIEWER WELCOME</span> app 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>

			</div>
				

        </div>
      </div>
	  
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
				<Route path="/add" component={AddTutorial} />
				<Route path="/tutorials/:id" component={Tutorial} />
				<Route path="/tutorials" component={TutorialsList} />
				<Route path="/workshops" component={WorkshopList} />
				<Route path="/workshops/:id" component={Workshop} />
				<Route path="/addWorkshop" component={AddWorkshop} />
          </Switch>
        </div>
	  
	
		
		
	</div>
	 
       
      
	  
	  
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
