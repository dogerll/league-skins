/**
 * ┌───────────────────────────────────────────────────────────────────────────────┐
 * │ This module is used to create the api the renderer process utilizes and is    │
 * │ exposed via the preload process.                                              │
 * └───────────────────────────────────────────────────────────────────────────────┘
 */

import { ipcMain, BrowserWindow } from 'electron'

import { askAndSetLeaguePath, isCurrentLeaguePathValid } from './config'
import { getSkins, Skin, SkinOrChroma } from './league'
import { downloadCsLolManager, downloadLolSkins } from './download'
import { setSkin } from './skins'

let window: BrowserWindow
let skins: Skin[] = []

export function setWindow(newWindow: BrowserWindow): void {
  window = newWindow
}

function focusWindow(): void {
  if (window.isMinimized()) window.restore()
  window.setAlwaysOnTop(true)
  window.focus()
  window.setAlwaysOnTop(false)
}

setInterval(async () => {
  const newSkins = await getSkins()

  if (JSON.stringify(skins) !== JSON.stringify(newSkins) && newSkins.length) {
    skins = newSkins
    window.webContents.send('skins', skins)
    focusWindow()
  }
}, 1000)

ipcMain.handle('isCurrentLeaguePathValid', isCurrentLeaguePathValid)
ipcMain.handle('askAndSetLeaguePath', askAndSetLeaguePath)

ipcMain.handle('getSkins', async () => skins)
ipcMain.handle('downloadCsLolManager', downloadCsLolManager)
ipcMain.handle('downloadLolSkins', async (_, force: boolean) => downloadLolSkins(force))
ipcMain.handle('setSkin', (_, skin: SkinOrChroma) => setSkin(skin))
