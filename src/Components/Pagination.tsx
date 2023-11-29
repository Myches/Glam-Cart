import { useState } from 'react';

interface postsProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: any;
}

export default function Pagination({ postsPerPage, totalPosts, paginate }: postsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    paginate(pageNumber);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginate(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
      setCurrentPage(currentPage + 1);
      paginate(currentPage + 1);
    }
  };

  const maxDisplayedPages = 5; // Number of page numbers to display

  const firstPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
  const lastPage = Math.min(
    firstPage + maxDisplayedPages - 1,
    Math.ceil(totalPosts / postsPerPage)
  );

  return (
    <div className="pb-8">
      <ul className="flex justify-center items-center">
        {currentPage > 1 && (
          <li className="border space-x-2 p-3 m-[4px] hover:bg-gray-400 hover:text-black">
            <button onClick={prevPage}>Prev</button>
          </li>
        )}
        {pageNumbers.map((number) => {
          if (number >= firstPage && number <= lastPage) {
            return (
              <li
                key={number}
                className={`border space-x-2 p-3 m-[4px] hover:bg-gray-400 hover:text-black ${
                  number === currentPage ? 'bg-gray-400 text-black' : ''
                }`}
              >
                <button onClick={() => handleClick(number)}>{number}</button>
              </li>
            );
          }
          return null;
        })}
        {currentPage < Math.ceil(totalPosts / postsPerPage) && (
          <li className="border space-x-2 p-3 m-[4px] hover:bg-gray-400 hover:text-black">
            <button onClick={nextPage}>Next</button>
          </li>
        )}
      </ul>
    </div>
  );
}
