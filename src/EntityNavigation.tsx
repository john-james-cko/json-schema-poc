import React from "react"
import { generatePath, Link, useParams } from "react-router-dom"
import { ProductContex } from "./ProductContext"
import { products } from "./products"

export const EntityNavigation = () => {
  const queries = React.useContext(ProductContex)

  const params = useParams<{ entityId: string }>()

  console.log(params)

  const findProduct = (productName: string) =>
    queries.find((query) =>
      query.data?.find((screen) => screen.config.product_name === productName)
    )

  const isProductAvailable = (productName: string, type: "list" | "create" | "update" | "hybrid") =>
    findProduct(productName)?.data?.find((screen) => screen.config.screen_type.includes(type))

  return (
    <>
      <h4>Entity Menu</h4>

      {products.map((product) =>
        product.screens.map((screen) => {
          if (isProductAvailable(product.product_name, screen.type)) {
            if (screen.type === "list" || screen.type === "hybrid") {
              if (screen.path.includes(":entityId")) {
                return (
                  <li key={screen.path}>
                    <Link to={generatePath(screen.path, { entityId: params.entityId })}>
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
