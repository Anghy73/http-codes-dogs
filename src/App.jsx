import useCode from './services/useCode'
import ImgCode from './components/ImgCode'

function App () {
  const { code, setCode, searchCodeHTTP, loading, data } = useCode()

  const handleCode = (e) => {
    setCode(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { codeHTTP } = Object.fromEntries(new FormData(e.target))
    searchCodeHTTP({ codeHTTP })
  }

  return (
    <>
      <main className='flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-violet-900 text-white w-full h-screen px-3'>
        <a className=' w-10 absolute top-5 right-10 fill-current text-indigo-500 hover:text-black' href='https://github.com/Anghy73' target='_blank' rel='noreferrer'>
          <svg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><title>GitHub</title><path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' /></svg>
        </a>
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
    </>
  )
}

export default App
