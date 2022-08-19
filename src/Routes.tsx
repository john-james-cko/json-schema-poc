import React from "react"
import { Route } from "react-router-dom"
import { Form } from "./Form"
import { List } from "./List"
import { ProductContex } from "./ProductContext"
import { products } from "./products"

export const Routes: React.FC = () => {
  const queries = React.useContext(ProductContex)

  const findProduct = (productName: string) =>
    queries.find((query) =>
      query.data?.find((screen) => screen.config.product_name === productName)
    )

  const isProductAvailable = (productName: string, type: "list" | "create" | "update" | "hybrid") =>
    findProduct(productName)?.data?.find((screen) => screen.config.screen_type.includes(type))

  return (
    <>
      {products.map((product) =>
        product.screens.map((screen) => {
          if (isProductAvailable(product.product_name, screen.type)) {
            if (screen.type === "list") {
              return (
                <Route
                  path={screen.path}
                  children={
                    <List
                      data={isProductAvailable(product.product_name, screen.type)}
                      product={product}
                    />
                  }
                  key={screen.path}
                  exact
                />
              )
            }

            if (screen.type === "create") {
              return (
                <Route
                  path={screen.path}
                  children={
                    <Form
                      data={isProductAvailable(product.product_name, screen.type)}
                      product={product}
                    />
                  }
                  key={screen.path}
                  exact
                />
              )
            }

            if (screen.type === "update") {
              return (
                <Route
                  path={screen.path}
                  children={
                    <Form
                      data={isProductAvailable(product.product_name, screen.type)}
                      product={product}
                    />
                  }
                  key={screen.path}
                  exact
                />
              )
            }
          }

          return null
        })
      )}
    </>
  )
}
