import React, {Component} from 'react';
import axios from 'axios';
import TableRow from './ConferenceTableRow';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import empedit from './EditEmployee'


class ViewConferencePage extends Component{


    constructor(props) {
        super(props);
        this.state = {event : []};
    }

    componentDidMount() {

        axios.get('http://localhost:4000/admin/conference')
            .then(response => {
                this.setState({event : response.data});

            })
            .catch(function (error){
                console.log(error);
            })
    }
    tabRow(){
        return this.state.event.map(function (object, i){
            return <TableRow obj = {object} key = {i}/>;
        });
    }
    render() {
        return(
            <div>
                <h1 className="text-center">Welcome Conference Page</h1>
                <hr/>
                <Router>
                    <table className="table table-striped" style = {{marginTop :20}}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Onf_date</th>
                            <th>Conf_impdate</th>
                            <th>Conf_title</th>
                            <th>Conf_link</th>
                            <th>Conf_para1</th>
                            <th>Conf_para2</th>
                            <th>Conf_status</th>
                            <th colSpan="2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.tabRow()}
                        </tbody>
                    </table>
                    <Switch>
                        <Route path='/EmpEdit/:id' component={empedit}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default ViewConferencePage;
