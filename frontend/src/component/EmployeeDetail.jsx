/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react';


const EmployeeDetail = ({ employee, onClose }) => {
    if (!employee) {
        return null;
    }

    return (
        <div className="modal show" style={{ display: 'block', zIndex: 1 }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Employee Details</h5>
                    </div>
                    <div className="modal-body">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <h5 className="card-title text-primary">{employee.employee_name}</h5>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><strong>ID:</strong> {employee.employee_id}</p>
                                        <p><strong>Department:</strong> {employee.department}</p>
                                        <p><strong>Gender:</strong> {employee.sex}</p>
                                        <p><strong>Marital Status:</strong> {employee.marital_status}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>Salary:</strong> {employee.salary.toLocaleString()}</p>
                                        <p><strong>Address:</strong> {employee.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;
