import React from "react"
import { Link, Route } from "react-router-dom"
import { ClientNavigation } from "./ClientNavigation"
import { EntityNavigation } from "./EntityNavigation"
import { products } from "./products"

export const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <Route path="/">
          {products.map((product) =>
            product.screens.map((screen) => {
              if (screen.type === "list" && product.product_name === "clients") {
                if (!screen.route_path.includes(":clientId")) {
                  return (
                    <li key={screen.route_path}>
                      <Link to={screen.route_path}>{screen.sidemenu_link_title}</Link>
                    </li>
                  )
                }

                return null
              }

              return null
            })
          )}
        </Route>

        <Route path="/clients/:clientId">
          <ClientNavigation />
        </Route>

        <Route path="/entities/:entityId">
          <ClientNavigation />

          <EntityNavigation />
        </Route>
      </ul>
    </nav>
  )
}
