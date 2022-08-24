import { useCallback, ReactNode } from "react"
import { useQuery } from "react-query"
import { PermissionContext } from "./PermissionContext"

type PermissionProviderProps = {
  children: ReactNode
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children }) => {
  const valuesQuery = useQuery("permitted-actions", async () => {
    try {
      const response = await fetch("/permitted-actions.json")
      return await response.json()
    } catch (error) {
      return console.log(error)
    }
  })

  const hasPermission = useCallback(
    (permission: string | undefined): boolean => {
      if (!valuesQuery.data || !permission) return false

      return valuesQuery.data.includes(permission)
    },
    [valuesQuery.data]
  )

  const value = {
    permissions: valuesQuery.data,
    hasPermission,
  }

  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>
}
