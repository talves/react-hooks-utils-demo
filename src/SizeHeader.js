import React from 'react'

export default function({ size, title, ...rest }) {

  return (
    <h2 {...rest}>
    {size ? `${title ? `${title} ` : ''}[width: ${size.width}, height: ${size.height}]` : `${title} []`}
    </h2>
  )

}