import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmployeeDetail from "./EmployeeDetail";

const Tableview = () => {
    const [data, setData] = useState([]);
    const [viewDetails, setViewDetails] = useState(null);
    const [searchEmployee, setSearchEmployee] = useState('');
    const navigate = useNavigate();

    const server = async () => {
        await axios.get('http://localhost:8080/api/data')
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        server();
    }, []);

    const handleDelete = async (employee_id) => {
        try {
            await axios.delete(`http://localhost:8080/api/deleteuser/${employee_id}`);
            server();
        } catch (error) {
            console.error("Failed to delete:", error);
            alert("Failed to delete the user.");
        }
    };

    const handleEdit = (employee) => {
        navigate('/', { state: { employee } });
    };

    const handleView = (value) => {
        setViewDetails(value);
    };

    const handleSearch = (e) => {
        setSearchEmployee(e.target.value);
    };

    const filteredData = data.filter((employee) =>
        employee.employee_name.toLowerCase().includes(searchEmployee.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchEmployee.toLowerCase()) ||
        employee.employee_id.toLowerCase().includes(searchEmployee.toLowerCase())
    );

    const handleClose=()=>{
        setViewDetails(null)
    }

    return (
        <>
            <Header />
            <EmployeeDetail employee={viewDetails} onClose={handleClose} />
            <div className="row">
                <div className="col"></div>
                <div className="col"></div>
            </div>

            <div className="container border rounded p-4 mt-5 table-responsive  bg-light ">
                <div className="input-group mb-3">
                    <h2 className="me-3 text-primary">Employee List</h2>
                    <input
                        type="search"
                        value={searchEmployee}
                        onChange={handleSearch}
                        className="form-control rounded border"
                        placeholder="Search by Employee ( Name , Department , Id )"

                    />
                </div>
                <table className="table table-striped table-hover">
                    <thead className="text-center bg-light">
                        <tr>
                            <th className="col">Emp_ID</th>
                            <th>Emp_Name</th>
                            <th>Department</th>
                            <th className="col">Gender</th>
                            <th className="col">Marital_Status</th>
                            <th className="col">Salary</th>
                            <th className="col">Address</th>
                            <th className="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredData.map((value, index) => (
                            <tr key={index}>
                                <td>{value.employee_id}</td>
                                <td>{value.employee_name}</td>
                                <td>{value.department}</td>
                                <td>{value.sex}</td>
                                <td>{value.marital_status}</td>
                                <td>{value.salary}</td>
                                <td>{value.address}</td>
                                <td className="d-flex justify-content-around">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleView(value)}
                                        
                                    >
                                        <i className="fa-solid fa-eye"></i>
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleEdit(value)}
                                        title="Edit Employee"
                                    >
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(value.employee_id)}
                                        title="Delete Employee"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Tableview;
