/* eslint-disable no-dupe-class-members */
import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import crudService from "../services/crudService";
import "./style.css";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#F9FAFB",
        color: "#828282",
        fontWeight: 'bold',
        heigth: "5%"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: "#828282",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: "#F9FAFB",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
        cellspacing: 0,
        cellpadding: 0,
    },
}));


export default class GetStudents extends Component {
    constructor(props){
        super(props);
        this.state={
            rows:[]
        }
        this.addStudent = this.addStudent.bind(this)
    }

    componentDidMount() {
        this.getAllStudents()
      }

    addStudent(){
        this.props.history.push("/addStudents")
    }

    editStudent(id){
        console.log(id)
        this.props.history.push("/addStudents", { id: id}); 
    }

    deleteStudent(id){
        crudService.deleteStudent(id).then((response)=>{
            this.getAllStudents()
        })
    }

    getAllStudents(){
        crudService.getStudents().then((response)=>{
            this.setState({
                rows:response.data[0]
            })
        })
    }


    render() {
        const {rows} = this.state

        return (
            <div className="container">

                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <div style={{ width: "176%", position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                        <Button variant="contained" style={{ backgroundColor: "#00C1B1", color: "white", marginBottom: "3%" }} onClick={this.addStudent}>Add Student</Button>
                        <br />
                        <TableContainer component={Paper} >
                            <Table sx={{ minWidth: 100 }} aria-label="a dense table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell>First Name</StyledTableCell>
                                        <StyledTableCell align="left">Last Name</StyledTableCell>
                                        <StyledTableCell align="left">Date of Birth</StyledTableCell>
                                        <StyledTableCell align="left">Course Name</StyledTableCell>
                                        <StyledTableCell align="left">Hours</StyledTableCell>
                                        <StyledTableCell align="left">Price</StyledTableCell>
                                        <StyledTableCell align="right"></StyledTableCell>
                                        <StyledTableCell align="right"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.firstName}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{row.lastName}</StyledTableCell>
                                            <StyledTableCell align="left">{row.dob}</StyledTableCell>
                                            <StyledTableCell align="left">{row.courseName}</StyledTableCell>
                                            <StyledTableCell align="left">{row.hours}H</StyledTableCell>
                                            <StyledTableCell align="left">{row.price} €</StyledTableCell>
                                            <StyledTableCell  align="left" style={{ color: "#00C1B1", cursor: "pointer", textDecoration: "none"}} onClick={() => this.editStudent(row.id)}>Edit</StyledTableCell>
                                            <StyledTableCell  align="left" style={{ color: "#00C1B1", cursor: "pointer", textDecoration: "none"}} onClick={() => this.deleteStudent(row.id)}>Delete</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                </Grid>
            </div>


        );
    }
}