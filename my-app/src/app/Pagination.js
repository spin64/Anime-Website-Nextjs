import React from 'react'

export default function Pagination({ page }) {

  function prev() {
    page(-1);
  }
  function next() {
    page(1);
  }

  return (
    <div className="container">
      <button type="button" onClick = { prev }> Previous </button>
      <button type="button" onClick = { next }> Next </button>
    </div>
  )
}
