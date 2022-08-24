import React from "react"
import { useQuery } from "react-query"
import { useHistory, generatePath, useParams } from "react-router-dom"
import { PermissionContext } from "./PermissionContext"
import { Product, Screen, Data } from "./Types"

type ListProps = {
  product: Product
  screen: Screen
}

export const List: React.FC<ListProps> = ({ product, screen }) => {
  const history = useHistory()

  const params = useParams<{ clientId: string; entityId: string } & { [param: string]: string }>()

  const ctx = React.useContext(PermissionContext)

  const query = useQuery<Data>(screen.schema_config.get_schema_endpoint, async () => {
    let path: string[] = []

    const replaceClientId = () => {
      if (screen.schema_config.get_schema_endpoint.includes(":clientId")) {
        return screen.schema_config.get_schema_endpoint.replace(":clientId", params.clientId)
      }
    }

    const replaceEntityId = () => {
      if (screen.schema_config.get_schema_endpoint.includes(":entityId")) {
        return screen.schema_config.get_schema_endpoint.replace(":entityId", params.entityId)
      }
    }

    const replaceProductId = () => {
      if (
        product.product_id &&
        screen.schema_config.get_schema_endpoint.includes("screen.route_config.param")
      ) {
        return screen.schema_config.get_schema_endpoint.replace(
          ":entityId",
          params[product.product_id]
        )
      }
    }

    const getParams = () => {
      if (screen.schema_config?.params && product.product_id) {
        if (params.clientId && screen.schema_config.params.includes("clientId")) {
          path.push(`clientId=${params.clientId}`)
        }

        if (params.entityId && screen.schema_config.params.includes("entityId")) {
          path.push(`entityId=${params.entityId}`)
        }

        if (screen.schema_config.params.includes(product.product_id)) {
          // handle home screen case
          if (params.clientId) {
            path.push(`${product.product_id}=${params[product.product_id]}`)
          }
        }
      }

      return path.join("&")
    }

    try {
      const response = await fetch(
        `${screen.schema_config.get_schema_endpoint}?&skip=${0}&${getParams()}`
      )
      return await response.json()
    } catch (error) {
      return console.log(error)
    }
  })

  if (!query.data) {
    return null
  }

  const pushToCreate = () => {
    const config = product.screens.find((screen) => screen.type === "create")

    if (config?.route_path) {
      if (params.clientId) {
        history.push(generatePath(config.route_path, { clientId: params.clientId }))
      } else if (params.entityId) {
        history.push(generatePath(config.route_path, { entityId: params.entityId }))
      } else {
        history.push(config.route_path)
      }
    }

    return undefined
  }

  const pushToUpdate = (id?: string) => {
    const config = product.screens.find((screen) => screen.type === "update")

    if (config?.route_path) {
      if (config.route_path && id) {
        if (params.clientId) {
          history.push(
            generatePath(config.route_path, { clientId: params.clientId, [product.product_id]: id })
          )
        } else if (params.entityId) {
          history.push(
            generatePath(config.route_path, { entityId: params.entityId, [product.product_id]: id })
          )
        } else {
          if (config?.route_path === "/clients/:clientId/client-details") {
            history.push(generatePath("/clients/:clientId/entities", { clientId: id }))
          } else {
            history.push(generatePath(config.route_path, { [product.product_id]: id }))
          }
        }
      }
    }

    return undefined
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <span>{query.data.config.screen_title}</span>
        {ctx.hasPermission(
          product.screens.find((screen) => screen.type === "create")?.permission_config
            .create_action
        ) && <button onClick={() => pushToCreate()}>Create</button>}
      </div>

      <table style={{ width: "100%" }}>
        <thead style={{ width: "100%" }}>
          <tr>
            {query.data.schema.headers?.map((header) => (
              <th style={{ width: "50%", textAlign: "left" }} key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {query.data.schema.rows?.map((row) => (
            <tr onClick={() => pushToUpdate(row.id)} key={row.id} style={{ cursor: "pointer" }}>
              {row.columns.map((column) => (
                <td style={{ width: "50%" }} key={column}>
                  {column}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
