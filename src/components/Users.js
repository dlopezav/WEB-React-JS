import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postServiceData } from '../util.js';

function Users({ getToken }) {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const tokenExists = getToken();
        if (!tokenExists) {
            navigate('/');
        } else {
            // Fetch users data
            fetchUsers();
        }
    }, [getToken, navigate]);

    // Función para simular la obtención de datos de usuarios
    const fetchUsers = () => {
        const params = { ok: 1 };
        postServiceData('users', params)
            .then((data) => {
                if (data) {
                    setUsers(data);
                } else {
                    setUsers([]);
                    console.log("Problems to load users");
                }
            })
            .catch((error) => {
                // Maneja los errores si ocurren durante la solicitud
                console.error("Error fetching users:", error);
                setUsers([]);
                console.log("Problems to load users");
            });
    };

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbar1">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"> <button className="btn btn-link nav-link text-white" >Users</button></li>
                            <li className="nav-item"> <button className="btn btn-link nav-link text-white" >Books</button></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="">List of users</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">User #</th>
                                            <th scope="col" className="text-center">FirstName</th>
                                            <th scope="col" className="text-center">LastName</th>
                                            <th scope="col" className="text-center">Birthdate</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user.person_id}>
                                                <td>{user.person_id}</td>
                                                <td>{user.person_firstname}</td>
                                                <td>{user.person_lastname}</td>
                                                <td>{new Date(user.person_birthdate).toISOString().slice(0, 10)}</td>
                                                <td className="text-center">
                                                    <form action="editUser" method="POST">
                                                        <input type="hidden" name="id" value={user.person_id} />
                                                        <button name="edit" className="btn" >
                                                            <img src="img/edit.png" alt="edit" className="icon" />
                                                        </button>
                                                        <button name="delete" className="btn" >
                                                            <img src="img/delete.png" alt="delete" className="icon" />
                                                        </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr id="addNew">
                                            <td colSpan="4"></td>
                                            <td className="text-center">
                                                <form action="createUser" method="POST">
                                                    <button className="btn"><img src="img/plus.png" alt="add" className="icon" /></button>
                                                </form>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;
