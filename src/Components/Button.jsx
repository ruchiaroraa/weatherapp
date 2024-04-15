import React from 'react'

const Button = (props) => {
  return (
    <button className='border-4 bg-red-400 px-3 py-2 ' 
    onClick={props.onClick}>
    {props.value}
    </button>
  )
}

export default Button