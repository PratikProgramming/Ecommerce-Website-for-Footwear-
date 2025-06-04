import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../baseUrl/baseUrl';

const ShowAllCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${baseUrl}/users/getAllUsers`)
            .then(response => {
                // ✅ Filter out admin users here
                const filteredCustomers = response.data.filter(user => user.role?.toLowerCase() !== 'admin');
                setCustomers(filteredCustomers);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to fetch customers');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-5">Loading customers...</div>;
    if (error) return <div className="alert alert-danger text-center mt-3">{error}</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">All Customers</h2>
            {customers.length === 0 ? (
                <div className="alert alert-warning text-center">No customers found.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id || customer._id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.mobile}</td>
                                    <td>{customer.gender}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ShowAllCustomers;
