import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postServiceData } from '../util.js';
import NavBar from './NavBar.js';

function Books({ getToken }) {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const tokenExists = getToken();
        if (!tokenExists) {
            navigate('/');
        } else {
            fetchBooks();
        }
    }, [getToken, navigate]);

    // Función para simular la obtención de datos de usuarios
    const fetchBooks = () => {
        const params = { ok: 1 };
        postServiceData('books', params)
            .then((data) => {
                if (data) {
                    setBooks(data);
                } else {
                    setBooks([]);
                    console.log("Problems to load books");
                }
            })
            .catch((error) => {
                // Maneja los errores si ocurren durante la solicitud
                console.error("Error fetching books:", error);
                setBooks([]);
                console.log("Problems to load books");
            });
    };

    const handleEditBook = (bookId) => {
        navigate('/book', { state: { bookId: bookId } });
    };

    const deleteBook = (userId) => {
        const params = { id: userId };
        postServiceData('deleteBook', params)
            .then((data) => {
                if (data) {
                    console.log("well deleted user data");
                    fetchBooks();
                } else {
                    console.log("Invalid user data");
                }
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
                console.log("Problems to delete user");
            });
    };

    const createBook = () => {
        navigate('/book', { state: { bookId: -1 } });
    }


    return (
        <div>
            <NavBar></NavBar>
                <div className="py-3">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="">List of books</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="text-center">book #</th>
                                            <th scope="col" class="text-center">Title</th>
                                            <th scope="col" class="text-center">Authors</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books.map(book => (
                                            <tr key={book.book_id}>
                                                <td>{book.book_id}</td>
                                                <td>{book.book_title}</td>
                                                <td>{book.book_authors}</td>
                                                <td class="text-center">
                                                    <button onClick={() => handleEditBook(book.book_id)} className="btn" >
                                                        <img src="img/edit.png" alt="edit" className="icon" />
                                                    </button>
                                                    <button name="delete" className="btn" onClick={() => deleteBook(book.book_id)} >
                                                        <img src="img/delete.png" alt="delete" className="icon" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr id="addNew">
                                            <td colSpan="3"></td>
                                            <td className="text-center">
                                                <button onClick={createBook} className="btn"><img src="img/plus.png" alt="add" className="icon" /></button>
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

export default Books;
