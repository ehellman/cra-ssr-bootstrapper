import React from 'react'
import { NavLink } from 'react-router-dom'
import { styled } from 'styletron-react'

const MenuItem = styled(NavLink, {
  margin: '5px',
  padding: '5px 10px',
  backgroundColor: '#333',
  color: '#fff',
  display: 'inline-block',
  textDecoration: 'none'
})

export default function Navigation({ pages }) {
  return (
    <nav>
      {
        pages.map(page => (
          <MenuItem to={page.path} key={page.path}>
            {page.name}
          </MenuItem>
        ))
      }
    </nav>
  )
}