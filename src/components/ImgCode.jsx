import { useState } from 'react'

function DisplayCard ({ handleClick, data }) {
  return (
    <figure onClick={handleClick} className='flex justify-center items-center backdrop-blur-sm p-4 w-full h-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] cursor-pointer'>
      <img className='max-w-sm' src={`${data.img.jpg}`} alt={`${data.title}`} />
    </figure>
  )
}

function CardImg ({ data }) {
  const [display, setDisplay] = useState(false)
  const handleClick = () => {
    setDisplay(!display)
  }

  return (
    <>
      <figure onClick={handleClick} className='max-w-md cursor-pointer rounded overflow-hidden'>
        <img src={`${data.img.jpg}`} alt={`${data.title}`} />
      </figure>
      {
        display
          ? <DisplayCard handleClick={handleClick} data={data} />
          : <p />
      }
    </>
  )
}

function NoCodeHTTPResults () {
  return (
    <p>HTTP Codes and puppies 🐶</p>
  )
}

function ImgCode ({ data }) {
  const hasCode = data
  return (
    hasCode
      ? <CardImg data={data} />
      : <NoCodeHTTPResults />
  )
}

export default ImgCode
