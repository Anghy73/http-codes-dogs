import { useRef, useState } from 'react'

function useCode () {
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('')
  const previusCode = useRef(code)

  const searchCodeHTTP = async ({ codeHTTP }) => {
    if (codeHTTP === '') return
    if (codeHTTP === previusCode.current) return
    try {
      setLoading(true)
      previusCode.current = code
      const res = await fetch(`http://localhost:3000/fetchData?code=${codeHTTP}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()

      if (data === 404) {
        return setData({
          img: {
            jpg: 'https://http.dog/404.jpg'
          },
          title: 'Not Found',
          code: 404
        })
      }

      return setData({
        img: data.image,
        title: data.title,
        code: data.status_code
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    setCode, searchCodeHTTP, code, loading, data
  }
}

export default useCode
