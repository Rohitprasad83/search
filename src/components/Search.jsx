import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from './Pagination'
function Search() {
  const [input, setInput] = useState('')
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [cache, setCache] = useState({})
  const url = 'http://universities.hipolabs.com/search?country='
  let timeoutId

  useEffect(() => {
    const debouncedHandleSearch = () => debounce(handleSearch, 500)
    debouncedHandleSearch()
    return () => {
      clearTimeout(timeoutId)
    }
  }, [input])

  const handleInputChange = e => {
    setInput(e.target.value)
  }

  const handleSearch = async () => {
    if (input.length < 3) {
      setData([])
      return
    }

    if (cache[input]) {
      setData(cache[input])
      return
    }
    setIsLoading(true)
    try {
      const response = await axios.get(url + input)
      setData(response.data)
      setCache({
        ...cache,
        [input]: response.data,
      })
      setTimeout(() => {
        setCache({
          ...cache,
          [input]: undefined,
        })
      }, 60000)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const debounce = (fn, delay) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn()
      timeoutId = null
    }, delay)
  }

  return (
    <div>
      <h1 className="text-3xl mt-16 mb-8">
        Search Universities acorss the world!
      </h1>
      <input
        type="text"
        name="search"
        className="text-xl border-black border-2 border-solid p-2 rounded"
        value={input}
        onChange={handleInputChange}
        placeholder="India"
      />
      {isLoading ? <p className="text-2xl">Loading...</p> : ''}
      {data.length > 0 && (
        <p className="text-xl mt-8"> Universities in {input} </p>
      )}

      {data && data.length > 0 && <Pagination items={data} itemsPerPage={5} />}
    </div>
  )
}

export { Search }
