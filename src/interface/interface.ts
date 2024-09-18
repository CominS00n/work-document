interface ProjectData {
  id: string
  type: string
  name: string
  language: string
  detail: string
  status: string
  ip: string
  directory: string
  url: string
  log: string
  document: string
  etc: string
}

interface RegisterData {
  username: string
  password: string
  role: string
}

interface PermissionData {
  role: string
  view: boolean
  insert: boolean
  update: boolean
  delete: boolean
  super: boolean
}

export type { ProjectData, RegisterData, PermissionData }
