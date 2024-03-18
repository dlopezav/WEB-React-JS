import React, { useEffect, useState, useCallback } from 'react';
import NavBar from './NavBar.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { postServiceData } from '../util.js';

function Book({ getToken }) {
        const [book, setBook] = useState(null);
        const [formData, setFormData] = useState({
            id: -1,
            Title: '',
            Authors: ''
        });
        const navigate = useNavigate();
        const location = useLocation();

        const handleTitle = (event) => {
            setFormData(prevFormData => ({ ...prevFormData, Title: event.target.value }));
        }
        
        const handleAuthors = (event) => {
            setFormData(prevFormData => ({ ...prevFormData, Authors: event.target.value }));
        }
        

        const handleSubmit = (event) => {
            event.preventDefault();
            postServiceData('saveBook', formData)
            .then((data) => {
                if (data) {
                    console.log("well saved book data"); 
                    navigate('/books', { replace: true });
                } else {
                    console.log("Invalid book data");
                }
            })
            .catch((error) => {
                console.error("Error saving book:", error);
                console.log("Problems to save book");
            });
        }
        const fetchBook = useCallback(() => {
            const bookId = location.state.bookId;
            postServiceData('book', {id: bookId})
                .then((data) => {
                    if (data) {
                        setBook(data[0]);
                        setFormData({
                            id: data[0].book_id,
                            Title: data[0].book_title,
                            Authors: data[0].book_authors
                        });
                        
                    } else {
                        setBook([]);
                        console.log("Problems to load book");
                    }
                })
                .catch((error) => {
                    // Maneja los errores si ocurren durante la solicitud
                    console.error("Error fetching book:", error);
                    setBook([]);
                    console.log("Problems to load book");
                });
        }, [location.state.bookId]) ;


        useEffect(() => {
            if (!location.state || location.state.bookId === null) {
                navigate('/', { replace: true });
                return; // Termina el efecto aquí para evitar más operaciones innecesarias
            }
        
            const tokenExists = getToken();
            if (!tokenExists) {
                navigate('/');
            } else {
                fetchBook();
            }
        }, [fetchBook, getToken, location.state, navigate]);

    return (
        <div>
            <NavBar />
            <div >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="">Create / Edit book page</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-responsive">
                                <form onSubmit={handleSubmit}>
                                    <table className="table table-striped">
                                        <tbody>
                                        <tr>
                                                <th scope="col">book #</th>
                                                <td>
                                                    {book ? book.book_id : 'NEW'}
                                                    <input type="hidden" name="id" value={formData.id} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <td>
                                                    <input type="text" className="form-control" name="Title" value={formData.Title} onChange={handleTitle} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col">Authors</th>
                                                <td>
                                                    <input type="text" className="form-control" name="Authors" value={formData.Authors} onChange={handleAuthors} />
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
        </div>
    );
}

export default Book;
