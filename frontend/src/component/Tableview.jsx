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
        try {
            const response = await axios.get('http://localhost:8080/api/data');
            setData(response.data);
        } catch (err) {
            console.error(err);
        }
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
        employee.employee_id.toLowerCase().includes(searchEmployee.toLowerCase()) ||
        employee.salary.toLowerCase().includes(searchEmployee.toLowerCase())
    );

    const handleClose = () => {
        setViewDetails(null);
    }

    return (
        <>
            <Header />
            <EmployeeDetail employee={viewDetails} onClose={handleClose} />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-primary">Employee List</h2>
                    <input
                        type="search"
                        value={searchEmployee}
                        onChange={handleSearch}
                        className="form-control w-50"
                        placeholder="Search by Name, Department, ID"
                    />
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-hover shadow-sm">
                        <thead className="bg-light text-center">
                            <tr>
                                <th>Emp_ID</th>
                                <th>Emp_Name</th>
                                <th>Department</th>
                                <th>Gender</th>
                                <th>Marital_Status</th>
                                <th>Salary</th>
                                <th>Address</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {filteredData.length > 0 ? (
                                filteredData.map((value, index) => (
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">No employees found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Tableview;
