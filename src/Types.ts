type ListSchema = {
  headers: string[]
  rows: {
    id: string
    columns: string[]
  }[]
}

type FormSchema = {
  label: string
  form_field: []
}

export type Data = {
  config: {
    product_name: string
    screen_title: string
    screen_type: ("list" | "create" | "update" | "hybrid")[]
    path: string
    sidemenu_link_title: string
    endpoints: {
      get_schema_endpoint: string
      submit_data_endpoint: string
    }
  }
  schema: ListSchema & FormSchema
}

export type Product = {
  product_name: string
  screens: {
    type: "list" | "create" | "update" | "hybrid"
    get_schema_endpoint: string
    permission: string
    path: string
    breadcrumb: string
  }[]
}
