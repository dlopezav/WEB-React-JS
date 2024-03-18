
import React from 'react';

function BorrowInList({ borrowItem, returnBorrow }) {
    return (
        <tr key={borrowItem.borrow_id}>
            <td className="text-center">{new Date(borrowItem.borrow_date).toISOString().slice(0, 10)}</td>
            <td>{borrowItem.book_title}</td>
            <td className="text-center">
                {borrowItem.borrow_return ? (
                    new Date(borrowItem.borrow_return).toISOString().slice(0, 10)
                ) : (
                    <button className="btn" onClick={() => returnBorrow(borrowItem.borrow_id)}>
                        <img src="img/return.png" alt="return" className="icon" />
                    </button>
                )}
            </td>
        </tr>
    );
}

export default BorrowInList;