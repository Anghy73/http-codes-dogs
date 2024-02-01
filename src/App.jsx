import { useState, useRef } from 'react'

import ImgCode from './ImgCode'

function App () {
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('')
  const previusCode = useRef(code)

  const handleCode = (e) => {
    setCode(e.target.value)
  }

  const searchCodeHTTP = async ({ codeHTTP }) => {
    if (codeHTTP === '') return
    if (codeHTTP === previusCode.current) return
    try {
      setLoading(true)
      previusCode.current = code
      const res = await fetch(`http://localhost:3001/fetchData?code=${codeHTTP}`, {
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { codeHTTP } = Object.fromEntries(new FormData(e.target))
    searchCodeHTTP({ codeHTTP })
  }

  return (
    <main className='flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-violet-900 text-white w-full h-screen px-3'>
      <h1 className='text-4xl font-bold mb-6 text-center'>HTTP CODES DOGS</h1>
      <form className='flex p-5 gap-2 w-full max-w-xl' onSubmit={handleSubmit}>
        <input onChange={handleCode} value={code} name='codeHTTP' className='py-3 w-full px-4 text-black rounded-xl font-semibold border-2 focus-visible:outline-none focus-visible:border-cyan-400 min-w-44' placeholder='404' type='number' min={100} max={511} />
        <button className='bg-white text-black font-bold py-3 px-5 rounded-xl w-full max-w-32'>Search</button>
      </form>
      <section id='content'>
        {
          loading ? <p>Cargando</p> : <ImgCode data={data} />
        }
      </section>
    </main>
  )
}

export default App
