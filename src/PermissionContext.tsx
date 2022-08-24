import { createContext } from "react"

type PermissionContextProps = {
  permissions: string[]
  hasPermission: (permission: string | undefined) => boolean
}

export const PermissionContext = createContext<PermissionContextProps>({
  permissions: [],
  hasPermission: () => false,
})
