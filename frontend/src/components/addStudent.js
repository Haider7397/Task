/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable default-case */
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import crudService from "../services/crudService";
import "./style.css";


export default class AddStudent extends Component {

    constructor(props) {
        super(props);
        this.initialData = {
            id: this.props.location.state,
            firstName: "",
            lastName: "",
            dob: "",
            courseName: "",
            hours: "",
            price: "",
        };


        this.state = {
            data: this.initialData,
            errors: this.initialData,
            formValidity: {
                firstName: false,
                lastName: false,
                dob: false,
                courseName: false,
                hours: false,
                price: false,
            },
            submitting: false,
            title:"Add Student"
        }
        this.save = this.save.bind(this);
    }

    componentDidMount(){
        if(this.props.location.state!==undefined){
            this.setId()
            this.getStudentData(this.props.location.state.id)
        }
        
    }

    setId(){
        this.setState({
            data:{
                id:this.props.location.state.id
            },
            title:"Edit Student"
        });
    }

    getStudentData(id){
        crudService.getStudentById(id).then((response)=>{
            this.setState({
                data:response.data[0]
            })
        })
    }

    save() {
        this.setState({ submitting: true });
        const { data, formValidity } = this.state;
        if (Object.values(formValidity).every(Boolean)) {
            if(this.props.location.state!==undefined){
                this.editStudent(this.state.data)
            }
            else{
                this.addStudent(this.state.data)
            }
            this.setState({ submitting: false });
        } else {
            for (let key in data) {
                let target = {
                    name: key,
                    value: data[key]
                };
                this.validation(target.name, target.value);
            }
            this.setState({ submitting: false });
        }
    }

    addStudent(data){
        crudService.addStudent(data).then((response)=>{
            this.props.history.push("/")
        })
    }

    editStudent(data){
        console.log(data)
        crudService.updateStudent(data).then((response)=>{
            this.props.history.push("/")
        })
    }

    onChange = e => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value },
            errors: { ...this.state.errors, [e.target.name]: "" }
        })
        this.validation(e.target.name, e.target.value)
    }

    validation(targetName, targetValue) {
        if (targetName !== "id") {
            const name = targetName;
            const value = targetValue;
            const fieldValidationErrors = this.state.errors;
            const validity = this.state.formValidity;
            validity[name] = value.length > 0;
            fieldValidationErrors[name] = validity[name] ? "" : `Field Required`;
            if (validity[name]) {
                if (name === "firstName" || name === "lastName") {
                    validity[name] = !/[^A-Za-z]/.test(value);
                    fieldValidationErrors[name] = validity[name]
                        ? ""
                        : "Invalid Input";
                }
                if (name === "hours" || name === "price") {
                    validity[name] = /^[0-9\b]+$/.test(value);
                    fieldValidationErrors[name] = validity[name]
                        ? ""
                        : "Invalid Input";
                }
            }

            this.setState({
                errors: fieldValidationErrors,
                formValidity: validity
            })
        }


    }

    render() {
        return (
            <div className="container">
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Card style={{ width: "176%", position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                {this.state.title}
                            </Typography>
                            <form noValidate autoComplete="off">
                                <div style={{ display: 'inline-flex' }}>
                                    <div className="textField" style={{ width: "13%" }}>
                                        <InputLabel className="label">
                                            First Name
                                        </InputLabel>
                                        <TextField
                                            required
                                            label=""
                                            id="first_name"
                                            name="firstName"
                                            margin="dense"
                                            variant="outlined"
                                            onChange={this.onChange}
                                            value={this.state.data.firstName}

                                        />
                                        <Typography className="validStyle">
                                            {this.state.errors.firstName}
                                        </Typography>
                                    </div>
                                    <div className="textField" style={{ width: "13%" }}>
                                        <InputLabel className="label">
                                            Last Name
                                        </InputLabel>
                                        <TextField
                                            required
                                            label=""
                                            id="last_name"
                                            name="lastName"
                                            margin="dense"
                                            variant="outlined"
                                            onChange={this.onChange}
                                            value={this.state.data.lastName}
                                        />
                                        <Typography className="validStyle">
                                            {this.state.errors.lastName}
                                        </Typography>
                                    </div>
                                    <div className="textField" style={{ width: "11%", paddingRight: "5.3%" }}>
                                        <InputLabel className="label">
                                            Date of Birth
                                        </InputLabel>
                                        <TextField
                                            required
                                            label=""
                                            id="dob"
                                            name="dob"
                                            type="date"
                                            margin="dense"
                                            variant="outlined"
                                            style={{ width: "150%" }}
                                            onChange={this.onChange}
                                            value={this.state.data.dob}
                                        />
                                        <Typography className="validStyle">
                                            {this.state.errors.dob}
                                        </Typography>
                                    </div>
                                    <div className="textField" style={{ width: "35%" }}>
                                        <InputLabel className="label">
                                            Course Name
                                        </InputLabel>
                                        <TextField
                                            required
                                            label=""
                                            id="course_name"
                                            name="courseName"
                                            margin="dense"
                                            variant="outlined"
                                            fullWidth
                                            onChange={this.onChange}
                                            value={this.state.data.courseName}
                                        />
                                        <Typography className="validStyle">
                                            {this.state.errors.courseName}
                                        </Typography>
                                    </div>
                                    <div className="textField" style={{ width: "8%" }}>
                                        <InputLabel className="label">
                                            Hours
                                        </InputLabel>
                                        <TextField
                                            required
                                            label=""
                                            id="hours"
                                            name="hours"
                                            margin="dense"
                                            variant="outlined"
                                            inputProps={{ min: 0, style: { textAlign: 'right' } }}
                                            onChange={this.onChange}
                                            value={this.state.data.hours}
                                        />
                                        <Typography className="validStyle">
                                            {this.state.errors.hours}
                                        </Typography>
                                    </div>
                                    <div className="textField" style={{ width: "15%" }}>
                                        <InputLabel className="label">
                                            Price €
                                        </InputLabel>
                                        <TextField
                                            required
                                            label=""
                                            id="price"
                                            name="price"
                                            margin="dense"
                                            variant="outlined"
                                            inputProps={{ min: 0, style: { textAlign: 'right' } }}
                                            onChange={this.onChange}
                                            value={this.state.data.price}
                                        />
                                        <Typography className="validStyle">
                                            {this.state.errors.price}
                                        </Typography>
                                    </div>
                                </div>

                            </form>
                        </CardContent>
                        <Card style={{ backgroundColor: "#16295A" }}>
                            <CardActions style={{ float: "right" }}>
                                <Button size="small" variant="contained" style={{ backgroundColor: "#00C1B1", color: "white" }} onClick={this.save}>Save</Button>

                            </CardActions>
                        </Card>
                    </Card>
                </Grid>
            </div>

        );
    }
}
