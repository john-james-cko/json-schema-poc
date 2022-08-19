import { useHistory } from "react-router-dom"
import { Data, Product } from "./Types"

type FormProps = {
  data: Data | undefined
  product: Product
}

export const Form: React.FC<FormProps> = ({ data, product }) => {
  const history = useHistory()

  if (!data) {
    return null
  }

  const pushToList = () => {
    const path = product.screens.find((screen) => screen.type === "list")?.path

    if (path) {
      history.push(path)
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

        <div>
          <button style={{ marginRight: "8px" }} onClick={() => pushToList()}>
            Cancel
          </button>

          <button onClick={() => console.log("submitted")}>Submit</button>
        </div>
      </div>

      <form>
        <div style={{ marginTop: "16px" }}>
          <label style={{ display: "block" }} htmlFor="field">
            Name
          </label>
          <input name="field" value="" />
        </div>

        <div style={{ marginTop: "16px" }}>
          <label style={{ display: "block" }} htmlFor="field">
            Email
          </label>
          <input name="field" value="" />
        </div>
      </form>
    </div>
  )
}
