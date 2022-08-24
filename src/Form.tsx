import { useHistory, useParams, generatePath } from "react-router-dom"
import { Data, Product, Screen } from "./Types"
import { JSONForm, initiateValues } from "@cko/client-admin-ui-json-form-renderer"
import { Formik, Form as FormikForm } from "formik"
import { useMutation, useQuery } from "react-query"
import { Modal } from "@cko/primitives"
import React from "react"
import { PermissionContext } from "./PermissionContext"

type FormProps = {
  product: Product
  screen: Screen
  type: "create" | "update"
}

export const Form: React.FC<FormProps> = ({ screen, product, type }) => {
  const history = useHistory()

  const params = useParams<{ clientId: string; entityId: string }>()

  const ctx = React.useContext(PermissionContext)

  const [open, setOpen] = React.useState(false)

  const query = useQuery<Data>(screen.schema_config.get_schema_endpoint, async () => {
    try {
      const response = await fetch(screen.schema_config.get_schema_endpoint)
      return await response.json()
    } catch (error) {
      return console.log(error)
    }
  })

  const createMutation = useMutation(
    product.product_name,
    async () => {
      if (query.data?.config.endpoints.create_data_endpoint) {
        try {
          const response = await fetch(query.data.config.endpoints.create_data_endpoint, {
            method: "POST",
          })
          return await response.json()
        } catch (error) {
          return console.log(error)
        }
      }
    },
    {
      onSuccess: () => {
        history.push("/")
      },
    }
  )

  const updateMutation = useMutation(
    product.product_name,
    async () => {
      if (query.data?.config.endpoints.update_data_endpoint) {
        try {
          const response = await fetch(query.data.config.endpoints.update_data_endpoint, {
            method: "PUT",
          })
          return await response.json()
        } catch (error) {
          return console.log(error)
        }
      }
    },
    {
      onSuccess: () => {
        // refetch get
      },
    }
  )

  const deleteMutation = useMutation(
    product.product_name,
    async () => {
      if (query.data?.config.endpoints.delete_data_endpoint) {
        try {
          const response = await fetch(query.data.config.endpoints.delete_data_endpoint, {
            method: "DELETE",
          })
          return await response.json()
        } catch (error) {
          return console.log(error)
        }
      }
    },
    {
      onSuccess: () => {
        // refetch get
      },
    }
  )

  if (!query.data || !product) {
    return null
  }

  const pushToList = () => {
    const config = product.screens.find((screen) => screen.type === "list")

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

  return (
    <>
      <div>
        <span>{query.data.config.screen_title}</span>

        <div>
          <Formik
            initialValues={initiateValues(query.data.schema)}
            onSubmit={(data) => {
              if (type === "create") {
                createMutation.mutate(data as any)
              } else if (type === "update") {
                updateMutation.mutate(data as any)
              }
            }}
          >
            <FormikForm>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <button type="button" style={{ marginRight: "8px" }} onClick={() => pushToList()}>
                    Cancel
                  </button>

                  {type === "update" &&
                    query.data.config.endpoints.delete_data_endpoint &&
                    ctx.hasPermission(
                      product.screens.find((screen) => screen.type === "update")?.permission_config
                        .delete_action
                    ) && (
                      <button
                        type="button"
                        style={{ marginRight: "8px" }}
                        onClick={() => setOpen(true)}
                      >
                        Delete
                      </button>
                    )}

                  <button type="submit">{type === "create" ? "Create" : "Save"}</button>
                </div>
              </div>

              <JSONForm formFields={query.data.schema.form_fields} type={type} />
            </FormikForm>
          </Formik>
        </div>
      </div>

      {open && (
        <Modal title="Delete form" closeModal={() => setOpen(false)}>
          <Formik initialValues={{}} onSubmit={(data) => deleteMutation.mutate(data as any)}>
            <FormikForm>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <button
                    type="button"
                    style={{ marginRight: "8px" }}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>

                  <button type="submit">Delete</button>
                </div>
              </div>
            </FormikForm>
          </Formik>
        </Modal>
      )}
    </>
  )
}
