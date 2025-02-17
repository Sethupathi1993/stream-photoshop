import React from 'react'

function SidebarItem({name, active, handleClick}) {
  return (
    <button className={`sidebar-item ${active ? "active" :"null"}`} onClick={handleClick}>{name}</button>
  )
}

export default SidebarItem