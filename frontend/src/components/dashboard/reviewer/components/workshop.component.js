import React, { Component } from "react";
import WorkshopDataService from "../services/workshop.service";

export default class Workshop extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getWorkshop = this.getWorkshop.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateWorkshop = this.updateWorkshop.bind(this);
    this.deleteWorkshop = this.deleteWorkshop.bind(this);

    this.state = {
      currentWorkshop: {
        id: null,
        title: "",
        presenter: "",
        reviewdate:"",
        phone:"",
        email:"",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getWorkshop(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentWorkshop: {
          ...prevState.currentWorkshop,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentWorkshop: {
        ...prevState.currentWorkshop,
        description: description
      }
    }));
  }

  getWorkshop(id) {
    WorkshopDataService.get(id)
      .then(response => {
        this.setState({
          currentWorkshop: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentWorkshop.id,
      title: this.state.currentWorkshop.title,
      presenter: this.state.currentWorkshop.presenter,
      published: status
    };

    WorkshopDataService.update(this.state.currentWorkshop.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentWorkshop: {
            ...prevState.currentWorkshop,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateWorkshop() {
    WorkshopDataService.update(
      this.state.currentWorkshop.id,
      this.state.currentWorkshop
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The workshop was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteWorkshop() {    
    WorkshopDataService.delete(this.state.currentWorkshop.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/workshops')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentWorkshop } = this.state;

    return (
      <div>
        {currentWorkshop ? (
          <div className="edit-form">
            <h4>Workshop</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentWorkshop.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentWorkshop.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentWorkshop.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentWorkshop.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteWorkshop}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateWorkshop}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Workshop...</p>
          </div>
        )}
      </div>
    );
  }
}