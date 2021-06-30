import React, { Component } from "react";
import WorkshopDataService from "../services/workshop.service";
import { Link } from "react-router-dom";

export default class WorkshopList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveWorkshops = this.retrieveWorkshops.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveWorkshop = this.setActiveWorkshop.bind(this);
    this.removeAllWorkshops = this.removeAllWorkshops.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      workshops: [],
      currentWorkshop: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveWorkshops();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveWorkshops() {
    WorkshopDataService.getAll()
      .then(response => {
        this.setState({
          workshops: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveWorkshops();
    this.setState({
      currentWorkshop: null,
      currentIndex: -1
    });
  }

  setActiveWorkshop(workshop, index) {
    this.setState({
      currentWorkshop: workshop,
      currentIndex: index
    });
  }

  removeAllWorkshops() {
    WorkshopDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentWorkshop: null,
      currentIndex: -1
    });

    WorkshopDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          workshops: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, workshops, currentWorkshop, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Workshop List</h4>

          <ul className="list-group">
            {workshops &&
            workshops.map((workshop, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveWorkshop(workshop, index)}
                  key={index}
                >
                  {workshop.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllWorkshops}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentWorkshop ? (
            <div>
              <h4>Workshops</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentWorkshop.title}
              </div>
              <div>
                <label>
                  <strong>Presenter:</strong>
                </label>{" "}
                {currentWorkshop.presenter}
              </div>
              <div>
                <label>
                  <strong>Phone:</strong>
                </label>{" "}
                {currentWorkshop.phone}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentWorkshop.email}
              </div>

              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentWorkshop.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/workshops/" + currentWorkshop.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Workshop...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
