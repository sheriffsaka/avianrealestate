
import React from 'react';
import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const MAX_VISIBLE_PAGES = 5;

  if (totalPages <= MAX_VISIBLE_PAGES) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      end = 4;
    }
    if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
    }

    if (start > 2) {
      pageNumbers.push('...');
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (end < totalPages - 1) {
      pageNumbers.push('...');
    }
    
    pageNumbers.push(totalPages);
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      {pageNumbers.map((num, index) =>
        typeof num === 'number' ? (
          <Button
            key={index}
            variant={currentPage === num ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPageChange(num)}
            className="w-10 h-10"
          >
            {num}
          </Button>
        ) : (
          <span key={index} className="px-4 py-2">
            {num}
          </span>
        )
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </nav>
  );
};
