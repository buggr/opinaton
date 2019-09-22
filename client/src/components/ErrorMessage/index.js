import React from 'react'

import './style.scss'

export default function ErrorMessage({ content, color, style }) {
  return (
    <div className="error-container" style={style}>
      <h1 className="error-content" style={{ color }}>
        {content}
      </h1>
    </div>
  )
}
