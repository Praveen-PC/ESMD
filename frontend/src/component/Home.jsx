import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
    const [employee_id, setEmployeeid] = useState('');
    const [employee_name, setEmployeename] = useState('');
    const [department, setDepartment] = useState('');
    const [sex, setSex] = useState('');
    const [marital_status, setMaritalstatus] = useState('');
    const [salary, setSalary] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const employeeToEdit = location.state?.employee;

    useEffect(() => {
        if (employeeToEdit) {
            
            setEmployeeid(employeeToEdit.employee_id);
            setEmployeename(employeeToEdit.employee_name);
            setDepartment(employeeToEdit.department);
            setSex(employeeToEdit.sex);
            setMaritalstatus(employeeToEdit.marital_status);
            setSalary(employeeToEdit.salary);
            setAddress(employeeToEdit.address);
        }
    }, [employeeToEdit]);

    const handlesubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!employee_id) newErrors.employee_id = "Employee ID is required.";
        if (!employee_name) newErrors.employee_name = "Employee Name is required.";
        if (!department) newErrors.department = "Department is required.";
        if (!sex) newErrors.sex = "Sex is required.";
        if (!marital_status) newErrors.marital_status = "Marital Status is required.";
        if (!salary) newErrors.salary = "Salary is required.";
        if (!address) newErrors.address = "Address is required.";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const endpoint = employeeToEdit ? `http://localhost:8080/api/update/${employee_id}` : 'http://localhost:8080/api/insert';
            const method=employeeToEdit ? 'put':'post'
            const res = await axios[method](endpoint, {
                employee_id,
                employee_name,
                department,
                sex,
                marital_status,
                salary,
                address,
            });
            console.log(res.data);
                alert(employeeToEdit?"Updated successfully":"Form submitted successfully");        
            navigate('/tableview');
            handlecancel();
        } catch (err) {
            console.error(err);
        }
    };

    const handlecancel = () => {
        setEmployeeid('');
        setEmployeename('');
        setDepartment('');
        setSex('');
        setMaritalstatus('');
        setSalary('');
        setAddress('');
        setErrors({});
    };

    return (
        <>
            <Header />
            <div className="container shadow-lg p-4 mb-5 mt-5 bg-light rounded">
                <h2 className="text-center p-3 text-primary">{employeeToEdit ? 'Edit Employee' : 'Employee Details'}</h2>
                <form method='post'>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label htmlFor="employee_id" className="form-label fw-bold">Employee ID:</label>
                                <input
                                    type="text"
                                    className='form-control bg-transparent'
                                    id="employee_id"
                                    placeholder="Enter Employee ID"
                                    value={employee_id}
                                    onChange={(e) => setEmployeeid(e.target.value)}
                                    disabled={employeeToEdit ? true : false} 
                                />
                                {errors.employee_id && <div className="text-danger">{errors.employee_id}</div>}
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label htmlFor="employee_name" className="form-label fw-bold">Employee Name:</label>
                                <input
                                    type="text"
                                    className='form-control bg-transparent'
                                    id="employee_name"
                                    placeholder="Enter Employee Name"
                                    value={employee_name}
                                    onChange={(e) => setEmployeename(e.target.value)}
                                />
                                {errors.employee_name && <div className="text-danger">{errors.employee_name}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label htmlFor="department" className="form-label fw-bold">Department:</label>
                                <select
                                    className='form-select bg-transparent'
                                    name="department"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                >
                                    <option value="">Select Department</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Manager">Manager</option>
                                </select>
                                {errors.department && <div className="text-danger">{errors.department}</div>}
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3">
                                <label htmlFor="salary" className="form-label fw-bold">Salary:</label>
                                <input
                                    type="number"
                                    className='form-control bg-transparent'
                                    id="salary"
                                    placeholder="Enter Salary"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                                {errors.salary && <div className="text-danger">{errors.salary}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12 col-md-6 d-flex align-items-center">
                            <label className="form-label me-3 fw-bold">Sex:</label>
                            <div className="form-check me-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sex"
                                    id="male"
                                    value="male"
                                    checked={sex === 'male'}
                                    onChange={(e) => setSex(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sex"
                                    id="female"
                                    value="female"
                                    checked={sex === 'female'}
                                    onChange={(e) => setSex(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="female">Female</label>
                            </div>
                            {errors.sex && <div className="text-danger">{errors.sex}</div>}
                        </div>
                        <div className="col-12 col-md-6 d-flex align-items-center">
                            <label className="form-label me-3 fw-bold">Marital Status:</label>
                            <div className="form-check me-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="marital_status"
                                    id="single"
                                    value="single"
                                    checked={marital_status === 'single'}
                                    onChange={(e) => setMaritalstatus(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="single">Single</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="marital_status"
                                    id="married"
                                    value="married"
                                    checked={marital_status === 'married'}
                                    onChange={(e) => setMaritalstatus(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="married">Married</label>
                            </div>
                            {errors.marital_status && <div className="text-danger">{errors.marital_status}</div>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label fw-bold">Address:</label>
                        <textarea
                            className='form-control bg-transparent'
                            id="address"
                            placeholder="Enter your address"
                            style={{ height: "100px" }}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></textarea>
                        {errors.address && <div className="text-danger">{errors.address}</div>}
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-primary" onClick={handlesubmit}>
                            <i className="bi bi-check2"></i> {employeeToEdit ? 'Update' : 'Submit'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handlecancel}>
                            <i className="bi bi-x-circle"></i> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Home;
