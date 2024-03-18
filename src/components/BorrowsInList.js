import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BorrowInList from './BorrowInList';
import { UserContext } from '../contexts/userContext';
import { postServiceData } from '../util';

function BorrowsInList({ getToken }) {
    const { user } = useContext(UserContext);
    const [borrowCollection, setBorrowCollection] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const tokenExists = getToken();
        if (!tokenExists) {
            navigate('/');
        } else {
            if (user) {
                fetchBorrows();
            }
        }
        
    }, []); // Dependency array is empty, runs only once on mount

    const fetchBorrows = () => {
        const userId = user; 
        const params = { id: userId };
        postServiceData('borrowedBooks', params)
            .then((data) => {
                if (data) { // Check if data is an array
                    setBorrowCollection(data);
                    console.log("well loaded borrows", data);
                } else {
                    console.log("Problems to load borrows");
                }
            })
            .catch((error) => {
                console.error("Error fetching borrows:", error);
            });
    };

    const returnBorrow = (borrowId) => {
        const params = { borrow_id: borrowId, borrow_return: new Date() };
        const updatedBorrowCollection = borrowCollection.map(item => {
            if (item.borrow_id === borrowId) {
                return { ...item, borrow_return: new Date() };
            }
            return item;
        });
        setBorrowCollection(updatedBorrowCollection);
        
        postServiceData('returnBorrow', params)
            .then((data) => {
                if (data) {
                    console.log("well returned borrow data");
                } else {
                    console.log("Invalid borrow data");
                }
            })
            .catch((error) => {
                console.error("Error returning borrow:", error);
                console.log("Problems to return borrow");
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 form-group">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Return</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(borrowCollection) && borrowCollection.map((item) => (
                                    <BorrowInList key={item.borrow_id} borrowItem={item} returnBorrow={returnBorrow} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BorrowsInList;
