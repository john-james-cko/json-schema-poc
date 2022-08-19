import React from "react"
import { Link } from "react-router-dom"
import { ProductContex } from "./ProductContext"

export const Navigation: React.FC = () => {
  const queries = React.useContext(ProductContex)

  return (
    <nav>
      <ul>
        {queries.map((query) => {
          if (query.data) {
            return query.data.map((screen) => {
              if (
                screen.config.screen_type.includes("list") ||
                screen.config.screen_type.includes("hybrid")
              ) {
                return (
                  <li key={screen.config.sidemenu_link_title}>
                    <Link to={screen.config.path}>{screen.config.sidemenu_link_title}</Link>
                  </li>
                )
              }

              return null
            })
          }

          return null
        })}
      </ul>
    </nav>
  )
}
