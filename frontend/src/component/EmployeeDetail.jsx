import React from 'react';

const EmployeeDetail = ({ employee, onClose }) => {
    if (!employee) {
        return null;
    }

    return (
        <div className="container mt-4 w-75">
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h3>Employee Details</h3>
                <button className='btn btn-primary' onClick={onClose}>Close</button>
            </div>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th>Employee ID</th>
                        <td>{employee.employee_id}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{employee.employee_name}</td>
                    </tr>
                    <tr>
                        <th>Department</th>
                        <td>{employee.department}</td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>{employee.sex}</td>
                    </tr>
                    <tr>
                        <th>Marital Status</th>
                        <td>{employee.marital_status}</td>
                    </tr>
                    <tr>
                        <th>Salary</th>
                        <td>{employee.salary}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{employee.address}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeDetail;
