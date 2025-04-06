import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div>
      {/* Render pagination controls here */}
      <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>{currentPage} / {totalPages}</span>
      <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
