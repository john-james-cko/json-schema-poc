import React from "react"
import { generatePath, Link, useParams } from "react-router-dom"
import { ProductContex } from "./ProductContext"
import { products } from "./products"

export const ClientNavigation = () => {
  const queries = React.useContext(ProductContex)

  const params = useParams<{ clientId: string }>()

  const findProduct = (productName: string) =>
    queries.find((query) =>
      query.data?.find((screen) => screen.config.product_name === productName)
    )

  const isProductAvailable = (productName: string, type: "list" | "create" | "update" | "hybrid") =>
    findProduct(productName)?.data?.find((screen) => screen.config.screen_type.includes(type))

  return (
    <>
      <h4>Client Menu</h4>

      {products.map((product) =>
        product.screens.map((screen) => {
          if (isProductAvailable(product.product_name, screen.type)) {
            if (screen.type === "list" || screen.type === "hybrid") {
              if (screen.path.includes(":clientId")) {
                return (
                  <li key={screen.path}>
                    <Link to={generatePath(screen.path, { clientId: params.clientId })}>
                      {
                        isProductAvailable(product.product_name, screen.type)?.config
                          .sidemenu_link_title
                      }
                    </Link>
                  </li>
                )
              }
            }

            return null
          }

          return null
        })
      )}
    </>
  )
}
