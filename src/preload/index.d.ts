import { type api } from './index'

declare global {
  type IpcRendererEvent = Electron.IpcRendererEvent
  type Skin = Awaited<ReturnType<typeof window.api.getSkins>>[number]
  interface Window {
    api: api
  }
}
