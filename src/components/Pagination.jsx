import React, { useState } from 'react'

const Pagination = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(items.length / itemsPerPage)

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = items.slice(startIndex, endIndex)

  return (
    <div>
      <div className="my-4">
        {currentItems.map(item => (
          <p
            className="text-2xl border-grey border-solid border-2 my-2 mx-4 rounded "
            key={item.name}>
            {item.name}
          </p>
        ))}
      </div>
      <div className="flex gap-4 items-center justify-center mt-4">
        <button
          className="border-black border-solid border-2 cursor-pointer px-4 py-2 rounded  bg-gray-200"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className="border-black border-solid border-2 cursor-pointer px-4 py-2 rounded  bg-gray-200"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
