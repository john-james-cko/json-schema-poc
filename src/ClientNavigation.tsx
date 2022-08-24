import React from "react"
import { generatePath, Link, useParams } from "react-router-dom"
import { PermissionContext } from "./PermissionContext"
import { products } from "./products"

export const ClientNavigation = () => {
  const params = useParams<{ clientId: string }>()

  const ctx = React.useContext(PermissionContext)

  return (
    <>
      <h4>Client Menu</h4>

      {products.map((product) =>
        product.screens.map((screen) => {
          if (screen.type === "list" || screen.type === "hybrid") {
            if (screen.route_path.includes(":clientId")) {
              if (ctx.hasPermission(screen.permission_config.get_action)) {
                return (
                  <li key={screen.route_path} style={{ marginBottom: "8px" }}>
                    <Link
                      to={generatePath(screen.route_path, {
                        clientId: params.clientId || "fallback",
                      })}
                    >
                      {screen.sidemenu_link_title}
                    </Link>
                  </li>
                )
              }

              return null
            }
          }

          if (screen.type === "update" && product.product_name === "clients") {
            if (screen.route_path.includes(":clientId")) {
              return (
                <li key={screen.route_path} style={{ marginBottom: "8px" }}>
                  <Link
                    to={generatePath(screen.route_path, {
                      clientId: params.clientId || "fallback",
                    })}
                  >
                    {screen.sidemenu_link_title}
                  </Link>
                </li>
              )
            }
          }

          return null
        })
      )}
    </>
  )
}
