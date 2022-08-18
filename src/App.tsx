import { BrowserRouter, Switch, Route, Link, useHistory, generatePath } from "react-router-dom"
import { useQuery, QueryClient, QueryClientProvider } from "react-query"

type Schema = {
  screenTitle: string
  getEndpoint: string
  postEndpoint: string
  putEndpoint: string
  schema: {
    headers: string[]
    rows: {
      id: string
      columns: string[]
    }[]
  }
}

type Products = {
  productName: string
  sidemenuLinkName: string
  screens: {
    type: "list" | "create" | "update" | "hybrid"
    path: string
    breadcrumb: string
    getSchemaEndpoint: string
    permission: string
  }[]
}[]

const products: Products = [
  {
    productName: "clients_api",
    sidemenuLinkName: "Clients",
    screens: [
      {
        type: "list",
        path: "/clients",
        breadcrumb: "List Client",
        getSchemaEndpoint: "clients.json",
        permission: "get_clients",
      },
      {
        type: "create",
        path: "/create-client",
        breadcrumb: "Create Client",
        getSchemaEndpoint: "https://api/formasdsd/json-schema?clientId=test",
        permission: "create_client",
      },
      {
        type: "update",
        path: "/clients/:clientId",
        breadcrumb: "Update Client",
        getSchemaEndpoint: "https://api/formaddad/json-schema?clientId=test",
        permission: "update_client",
      },
    ],
  },
  {
    productName: "entities_api",
    sidemenuLinkName: "Entities",
    screens: [
      {
        type: "list",
        path: "/entities",
        breadcrumb: "List Entities",
        getSchemaEndpoint: "entities.json",
        permission: "get_entities",
      },
      {
        type: "create",
        path: "/entity-create",
        breadcrumb: "Create Entity",
        getSchemaEndpoint: "https://api/forwwwwm/json-schema?clientId=test",
        permission: "create_entity",
      },
      {
        type: "update",
        path: "/entities/:entityId",
        breadcrumb: "Update Entity",
        getSchemaEndpoint: "https://api/foaddrm/jdson-schema?clientId=test",
        permission: "update_entity",
      },
    ],
  },
]

type ListProps = {
  getSchemaEndpoint: string
}

const List = ({ getSchemaEndpoint }: ListProps) => {
  const history = useHistory()

  const query = useQuery<Schema>("list", () =>
    fetch(getSchemaEndpoint)
      .then((response) => {
        return response.json()
      })
      .catch((error) => {
        console.log(error)
      })
  )

  if (!query.data) {
    return null
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
        <span>{query.data.screenTitle}</span>
        <Link to="/create">Create</Link>
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
            <tr
              onClick={() =>
                history.push(
                  generatePath("/clients/:clientId", {
                    clientId: row.id,
                  })
                )
              }
              key={row.id}
              style={{ cursor: "pointer" }}
            >
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

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ padding: "16px", width: "300px" }}>
            <p>Navigation</p>

            <nav>
              <ul>
                {products.map((product) => {
                  return product.screens.map((screen) => {
                    if (screen.type === "list") {
                      return (
                        <li>
                          <Link to={screen.path} key={screen.path}>
                            {product.sidemenuLinkName}
                          </Link>
                        </li>
                      )
                    }

                    return null
                  })
                })}
              </ul>
            </nav>
          </div>

          <div style={{ padding: "16px", width: "100%" }}>
            <p>Content</p>

            <Switch>
              {products.map((product) => {
                return product.screens.map((screen) => {
                  if (screen.type === "list") {
                    return (
                      <Route
                        path={screen.path}
                        children={<List getSchemaEndpoint={screen.getSchemaEndpoint} />}
                        key={screen.path}
                      />
                    )
                  }

                  if (screen.type === "create") {
                    return (
                      <Route path={screen.path} children={<div>Create</div>} key={screen.path} />
                    )
                  }

                  if (screen.type === "update") {
                    return (
                      <Route path={screen.path} children={<div>Update</div>} key={screen.path} />
                    )
                  }

                  return null
                })
              })}
              <Route path="*" children={<h1>Route doesn't exist</h1>} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
