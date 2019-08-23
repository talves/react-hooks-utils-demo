import React from 'react'

export default function({ size, title, ...rest }) {

  return (
    <div {...rest}>
      {size && `${title ? `${title} ` : ''}[width: ${size.width}, height: ${size.height}]`}
    </div>
  )
}
