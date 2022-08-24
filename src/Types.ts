type ListSchema = {
  total: number
  skip: number
  headers: string[]
  rows: {
    id: string
    columns: string[]
  }[]
}

type FormSchema = {
  label: string
  form_fields: []
}

export type Data = {
  config: {
    screen_title: string
    screen_type: ("list" | "create" | "update" | "hybrid" | "update_with_delete")[]
    endpoints: {
      create_data_endpoint?: string
      update_data_endpoint?: string
      delete_data_endpoint?: string
    }
  }
  schema: ListSchema & FormSchema
}

export type Screen = {
  type: "list" | "create" | "update" | "hybrid" | "update_with_delete"
  sidemenu_link_title?: string
  route_path: string
  schema_config: {
    get_schema_endpoint: string
    params?: string[]
  }
  permission_config: {
    get_action: string
    create_action?: string
    update_action?: string
    delete_action?: string
  }
}

export type Product = {
  product_id: string
  product_name: string
  screens: Screen[]
}
