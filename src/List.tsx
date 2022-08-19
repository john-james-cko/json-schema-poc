import { useHistory, generatePath } from "react-router-dom"
import { Data, Product } from "./Types"

type ListProps = {
  data: Data | undefined
  product: Product
}

export const List = ({ data, product }: ListProps) => {
  const history = useHistory()

  if (!data) {
    return null
  }

  const pushToCreate = () => {
    const path = product.screens.find((screen) => screen.type === "create")?.path

    if (path) {
      history.push(path)
    }

    return undefined
  }

  const pushToUpdate = (clientId: string) => {
    const path = product.screens.find((screen) => screen.type === "update")?.path

    if (path) {
      history.push(
        generatePath(path, {
          clientId,
        })
      )
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
        <span>{data.config.screen_title}</span>

        <button onClick={() => pushToCreate()}>Create</button>
      </div>

      <table style={{ width: "100%" }}>
        <thead style={{ width: "100%" }}>
          <tr>
            {data.schema.headers?.map((header) => (
              <th style={{ width: "50%", textAlign: "left" }} key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.schema.rows?.map((row) => (
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
