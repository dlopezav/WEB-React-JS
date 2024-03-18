import React, { useEffect, useState, useCallback, useContext } from 'react';
import { UserContext } from '../contexts/userContext.js';
import NavBar from './NavBar.js';
import { useNavigate } from 'react-router-dom';
import { postServiceData } from '../util.js';
import BorrowsInList from './BorrowsInList.js';

function User({getToken}) {
    const { user, updateUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        id: -1,
        FirstName: '',
        LastName: '',
        Birthdate: ''
    });
    const navigate = useNavigate();

    const handleFirstName = (event) => {
        setFormData({ ...formData, FirstName: event.target.value });
    };

    const handleLastName = (event) => {
        setFormData({ ...formData, LastName: event.target.value });
    };

    const handleBirthdate = (event) => {
        setFormData({ ...formData, Birthdate: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedFormData = { ...formData, Birthdate: dateInputValue };
        postServiceData('saveUser', updatedFormData)
            .then((data) => {
                if (data) {
                    console.log("well saved user data");
                    navigate('/users', { replace: true });
                } else {
                    console.log("Invalid user data");
                }
            })
            .catch((error) => {
                console.error("Error saving user:", error);
                console.log("Problems to save user");
            });
    }

    const fetchUser = useCallback(() => {
        const userId = user;
        postServiceData('user', { id: userId })
            .then((data) => {
                if (data) {
                    updateUser(data[0]);
                    setFormData({
                        id: data[0].person_id,
                        FirstName: data[0].person_firstname,
                        LastName: data[0].person_lastname,
                        Birthdate: data[0].person_birthdate
                    });

                } else {
                    updateUser([]);
                    console.log("Problems to load user");
                }
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
                updateUser([]);
                console.log("Problems to load user");
            });
    }, [user, updateUser]);


    useEffect(() => {
        console.log("user is : " + user);
        if (!user) {
            navigate('/', { replace: true });
            return;
        }
        fetchUser();
    }, []);

    let dateISO = formData.Birthdate; // Suponiendo que formData.Birthdate es una cadena en formato ISO
    let date = new Date(dateISO);

    // Obtener la fecha en formato local
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    let dateInputValue = `${year}-${month}-${day}`;

    return (
        <div>
            <NavBar />
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="">Create / Edit User page</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-responsive">
                                <form onSubmit={handleSubmit}>
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <th scope="col">User #</th>
                                                <td>
                                                    {user ? user.person_id : 'NEW'}
                                                    <input type="hidden" name="id" value={formData.id} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col">FirstName</th>
                                                <td>
                                                    <input type="text" className="form-control" name="FirstName" value={formData.FirstName} onChange={handleFirstName} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col">LastName</th>
                                                <td>
                                                    <input type="text" className="form-control" name="LastName" value={formData.LastName} onChange={handleLastName} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col">Birthdate</th>
                                                <td>
                                                    <input type="date" className="form-control" name="Birthdate" value={dateInputValue} onChange={handleBirthdate} />
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="2" className="text-center">
                                                    <button type="submit" className="btn btn-block btn-primary">Save</button>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BorrowsInList getToken={getToken}></BorrowsInList>
        </div>
    );
}

export default User;
