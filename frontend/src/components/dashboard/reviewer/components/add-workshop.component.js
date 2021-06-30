import React, { Component } from "react";
import WorkshopDataService from "../services/workshop.service";

export default class AddWorkshop extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePresenter = this.onChangePresenter.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.saveWorkshop = this.saveWorkshop.bind(this);
    this.newWorkshop= this.newWorkshop.bind(this);

    this.state = {
      id: null,
      title: "",
      presenter: "", 
      email:"",
      phone:"",
      published: false,
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangePresenter(e) {
    this.setState({
      presenter: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  saveWorkshop() {
    var data = {
      title: this.state.title,
      presenter: this.state.presenter, 
      email:this.state.email,
      phone:this.state.phone
    };
    console.log(data);
    
    WorkshopDataService.create(data)
      .then(response => {
        this.setState({
            id: response.data.id,
            title: response.data.title,
            presenter: response.data.presenter,
            published: response.data.published,
            email:response.data.email,
            phone:response.data.phone,
            submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newWorkshop() {
    this.setState({
      id: null,
      title: "",
      presenter: "",
      phone:"",
      email:"",
      published: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newWorkshop}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="presenter">Presenter</label>
              <input
                type="text"
                className="form-control"
                id="presenter"
                required
                value={this.state.presenter}
                onChange={this.onChangePresenter}
                name="presenter"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                required
                value={this.state.phone}
                onChange={this.onChangePhone}
                name="phone"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>


            <button onClick={this.saveWorkshop} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
