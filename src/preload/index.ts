import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { Skin, SkinOrChroma } from '../main/league'

const api = {
  isCurrentLeaguePathValid: (): Promise<boolean> => ipcRenderer.invoke('isCurrentLeaguePathValid'),
  askAndSetLeaguePath: (): Promise<boolean> => ipcRenderer.invoke('askAndSetLeaguePath'),
  downloadCsLolManager: (): Promise<void> => ipcRenderer.invoke('downloadCsLolManager'),
  downloadLolSkins: (force: boolean = false): Promise<void> =>
    ipcRenderer.invoke('downloadLolSkins', force),
  getSkins: (): Promise<Skin[]> => ipcRenderer.invoke('getSkins'),
  setSkin: (skin: SkinOrChroma): Promise<void> => ipcRenderer.invoke('setSkin', skin),
  onSkinsChange: (listener: (event: IpcRendererEvent, skins: Skin[]) => void): void => {
    ipcRenderer.on('skins', listener)
  },
  offSkinsChange: (listener: (event: IpcRendererEvent, skins: Skin[]) => void): void => {
    ipcRenderer.off('skins', listener)
  }
}

contextBridge.exposeInMainWorld('api', api)

export type api = typeof api
