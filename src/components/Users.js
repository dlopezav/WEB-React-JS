import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext.js';
import { postServiceData } from '../util.js';
import NavBar from './NavBar.js';

function Users({getToken}) {
    const [users, setUsers] = useState([]);
    const {user, updateUser } = useContext(UserContext); // Corregir el acceso al contexto

    const navigate = useNavigate();

    useEffect(() => {
        // Reemplazar getToken con user.token si está disponible en tu contexto
        const tokenExists = getToken()
        if (!tokenExists) {
            navigate('/');
        } else {
            fetchUsers();
        }
    }, [user, navigate, getToken]);

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
                console.error("Error fetching users:", error);
                setUsers([]);
                console.log("Problems to load users");
            });
    };

    const handleEditUser = (userId) => {
        updateUser(userId);
        navigate('/user');
    };

    const deleteUser = (userId) => {
        const params = { id: userId };
        postServiceData('deleteUser', params)
            .then((data) => {
                if (data) {
                    console.log("well deleted user data");
                    fetchUsers();
                } else {
                    console.log("Invalid user data");
                }
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
                console.log("Problems to delete user");
            });
    };

    const createUser = () => {
        navigate('/user', { state: { userId: -1 } });
    }

    return (
        <div>
            <NavBar></NavBar>
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
                                                <td>{new Date(user.person_birthdate).toLocaleDateString()}</td>
                                                <td className="text-center">
                                                    <button onClick={() => handleEditUser(user.person_id)} className="btn" >
                                                        <img src="img/edit.png" alt="edit" className="icon" />
                                                    </button>
                                                    <button name="delete" className="btn" onClick={() => deleteUser(user.person_id)} >
                                                        <img src="img/delete.png" alt="delete" className="icon" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr id="addNew">
                                            <td colSpan="4"></td>
                                            <td className="text-center">
                                                <button onClick={createUser} className="btn"><img src="img/plus.png" alt="add" className="icon" /></button>
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
