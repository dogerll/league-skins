import { contextBridge, ipcRenderer } from 'electron'

import { Champion, Skin, Chroma } from '../main/metadata'

const api = {
  isCurrentLeaguePathValid: (): Promise<boolean> => ipcRenderer.invoke('isCurrentLeaguePathValid'),
  askAndSetLeaguePath: (): Promise<boolean> => ipcRenderer.invoke('askAndSetLeaguePath'),
  downloadCsLolManager: (): Promise<void> => ipcRenderer.invoke('downloadCsLolManager'),
  downloadLolSkins: (force: boolean = false): Promise<void> =>
    ipcRenderer.invoke('downloadLolSkins', force),
  listSkins: (): Promise<Skin[]> => ipcRenderer.invoke('listSkins'),
  listChampions: (): Promise<Champion[]> => ipcRenderer.invoke('listChampions'),
  setSkin: (skin: Skin | Chroma): Promise<void> => ipcRenderer.invoke('setSkin', skin)
}

contextBridge.exposeInMainWorld('api', api)

export type api = typeof api
