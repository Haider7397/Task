import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddStudent from "./addStudent";
import GetStudents from "./getAllStudents";



const Routes = () => {
    return (
        <Router>
            <Switch style={{ overflow: "auto" }}>
                <Route exact path="/" component={GetStudents} />
                <Route exact path="/addStudents" component={AddStudent} />
            </Switch>
        </Router>
    )
}

export default Routes;