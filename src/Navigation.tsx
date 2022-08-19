import React from "react"
import { Link, Route, generatePath } from "react-router-dom"
import { ClientNavigation } from "./ClientNavigation"
import { EntityNavigation } from "./EntityNavigation"
import { ProductContex } from "./ProductContext"
import { products } from "./products"

export const Navigation: React.FC = () => {
  const queries = React.useContext(ProductContex)

  const findProduct = (productName: string) =>
    queries.find((query) =>
      query.data?.find((screen) => screen.config.product_name === productName)
    )

  const isProductAvailable = (productName: string, type: "list" | "create" | "update" | "hybrid") =>
    findProduct(productName)?.data?.find((screen) => screen.config.screen_type.includes(type))

  return (
    <nav>
      <ul>
        <Route path="/">
          {products.map((product) =>
            product.screens.map((screen) => {
              if (isProductAvailable(product.product_name, screen.type)) {
                if (screen.type === "list" || screen.type === "hybrid") {
                  if (!screen.path.includes(":clientId")) {
                    return (
                      <li key={screen.path}>
                        <Link to={screen.path}>
                          {
                            isProductAvailable(product.product_name, screen.type)?.config
                              .sidemenu_link_title
                          }
                        </Link>
                      </li>
                    )
                  }

                  return null
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
          <EntityNavigation />
        </Route>
      </ul>
    </nav>
  )
}
