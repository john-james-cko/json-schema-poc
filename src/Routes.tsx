import React from "react"
import { Route } from "react-router-dom"
import { Form } from "./Form"
import { List } from "./List"
import { PermissionContext } from "./PermissionContext"
import { products } from "./products"

export const Routes: React.FC = () => {
  const ctx = React.useContext(PermissionContext)

  return (
    <>
      {products.map((product) =>
        product.screens.map((screen) => {
          if (ctx.hasPermission(screen.permission_config.get_action)) {
            if (screen.type === "list") {
              return (
                <Route
                  path={screen.route_path}
                  children={<List product={product} screen={screen} />}
                  key={screen.route_path}
                  exact
                />
              )
            }

            if (screen.type === "create") {
              return (
                <Route
                  path={screen.route_path}
                  children={<Form product={product} type="create" screen={screen} />}
                  key={screen.route_path}
                  exact
                />
              )
            }

            if (screen.type === "update") {
              return (
                <Route
                  path={screen.route_path}
                  children={<Form product={product} type="update" screen={screen} />}
                  key={screen.route_path}
                  exact
                />
              )
            }
          }

          return (
            <Route
              path={screen.route_path}
              children={<div>You have no permissions to view this route</div>}
              key={screen.route_path}
              exact
            />
          )
        })
      )}
    </>
  )
}
