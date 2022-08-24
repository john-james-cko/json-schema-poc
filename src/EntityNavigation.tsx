import React from "react"
import { generatePath, Link, useParams } from "react-router-dom"
import { PermissionContext } from "./PermissionContext"
import { products } from "./products"

export const EntityNavigation = () => {
  const params = useParams<{ entityId: string }>()

  const ctx = React.useContext(PermissionContext)

  return (
    <>
      <h4>Entity Menu</h4>

      {products.map((product) =>
        product.screens.map((screen) => {
          if (ctx.hasPermission(screen.permission_config.get_action)) {
            if (screen.type === "list" || screen.type === "hybrid") {
              if (screen.route_path.includes(":entityId")) {
                return (
                  <li key={screen.route_path}>
                    <Link to={generatePath(screen.route_path, { entityId: params.entityId })}>
                      {screen.sidemenu_link_title}
                    </Link>
                  </li>
                )
              }
            }

            if (screen.type === "update" && product.product_name === "entities") {
              if (screen.route_path.includes(":entityId")) {
                return (
                  <li key={screen.route_path} style={{ marginBottom: "8px" }}>
                    <Link
                      to={generatePath(screen.route_path, {
                        entityId: params.entityId || "fallback",
                      })}
                    >
                      {screen.sidemenu_link_title}
                    </Link>
                  </li>
                )
              }
            }
          }

          return null
        })
      )}
    </>
  )
}
