import { Dispatch, SetStateAction } from 'react'

const Paginator = ({
  lastPage,
  setPage,
}: {
  lastPage: number
  setPage: Dispatch<SetStateAction<number>>
}) => {
  function onNext() {
    setPage((prev: number) => (prev + 1 <= lastPage) ? prev + 1 : lastPage)
  }

  function onPrevious() {
    setPage((prev: number) => (prev - 1 > 0) ? prev - 1 : 1)
  }

  return (
    <nav>
      <ul className='pagination'>
        <li className='page-item'>
          <a href='#' className='page-link' onClick={onPrevious}>
            Previous
          </a>
        </li>

        <li className='page-item'>
          <a href='#' className='page-link' onClick={onNext}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Paginator
