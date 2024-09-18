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

interface UserData {
  id: string
  username: string
  password: string
  role: string
}

export type { ProjectData, RegisterData, UserData }
