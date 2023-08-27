import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const NotFoundPage = (props: Props) => {
  return (
    <div>
      <p>NotFoundPage</p>
      <Link to={"/"}>Go Home</Link>
    </div>
  )
}

export default NotFoundPage