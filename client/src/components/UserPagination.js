import React from 'react';
import ReactPaginate from 'react-paginate';

const UserPagination = ({ handlePageClick, pageCount }) => {
  return (
    <div className="pagination-inner">
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={<span className="break"><a href="">...</a></span>}
        pageNum={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        clickCallback={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default UserPagination;
