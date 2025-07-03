/**
 * ┌───────────────────────────────────────────────────────────────────────────────┐
 * │ This module is used to create the api the renderer process utilizes and is    │
 * │ exposed via the preload process.                                              │
 * └───────────────────────────────────────────────────────────────────────────────┘
 */

import { ipcMain } from 'electron'

import { askAndSetLeaguePath, isCurrentLeaguePathValid } from './config'
import { downloadCsLolManager, downloadLolSkins } from './download'
import { setSkin } from './skins'
import { Skin, Chroma, listSkins, listChampions } from './metadata'

ipcMain.handle('isCurrentLeaguePathValid', isCurrentLeaguePathValid)
ipcMain.handle('askAndSetLeaguePath', askAndSetLeaguePath)
ipcMain.handle('downloadCsLolManager', downloadCsLolManager)
ipcMain.handle('downloadLolSkins', async (_, force: boolean) => downloadLolSkins(force))
ipcMain.handle('listSkins', listSkins)
ipcMain.handle('listChampions', listChampions)
ipcMain.handle('setSkin', (_, skin: Skin | Chroma) => setSkin(skin))
