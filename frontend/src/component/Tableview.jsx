import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Tableview = () => {
    const [data, setData] = useState([]);
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

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/deleteuser/${id}`);
            console.log(response.data);
            server();
        } catch (error) {
            console.error("Failed to delete:", error);
            alert("Failed to delete the user.");
        }
    };

    const handleEdit = (employee) => {
        navigate('/', { state: { employee } }); // Pass the employee data
    };

    return (
        <>
            <Header />
            <div className="container border rounded p-2 mt-5 table-responsive">
                <table className="table">
                    <thead className="text-center">
                        <tr>
                            <th className="col">Emp_ID</th>
                            <th>Emp_Name</th>
                            <th>Department</th>
                            <th className="col">Gender</th>
                            <th className="col">Marital_Status</th>
                            <th className="col">Salary</th>
                            <th className="col">Address</th>
                            <th className="col ">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {data.map((value, index) => (
                            <tr key={index}>
                                <td>{value.employee_id}</td>
                                <td>{value.employee_name}</td>
                                <td>{value.department}</td>
                                <td>{value.sex}</td>
                                <td>{value.marital_status}</td>
                                <td>{value.salary}</td>
                                <td>{value.address}</td>
                                <td className="d-flex justify-content-between">
                                    <button className="btn btn-secondary"><i className="fa-solid fa-eye"></i></button>
                                    <button className="btn btn-primary" onClick={() => handleEdit(value)}>
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(value.employee_id)}>
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
