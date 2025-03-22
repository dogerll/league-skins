/**
 * ┌───────────────────────────────────────────────────────────────────────────────┐
 * │ This module is used to download external dependencies and store them in the   │
 * │ file system when they're not already present.                                 │
 * └───────────────────────────────────────────────────────────────────────────────┘
 */

import fs from 'fs-extra'
import path from 'path'
import JSZip from 'jszip'

import {
  CSLOL_MANAGER_URL,
  CSLOL_MANAGER_LOCATION,
  CSLOL_MANAGER_DESTINATION,
  CSLOL_MANAGER_CONFIG,
  LOL_SKINS_URL,
  LOL_SKINS_LOCATION,
  LOL_SKINS_DESTINATION
} from './constants'
import { getLeaguePath } from './config'

/**
 * This function decompresses a ZIP buffer into a directory.
 * @param buffer the ZIP buffer.
 * @param destination the directory to decompress the ZIP into.
 * @returns {Promise<void>} when the operation is finished.
 */
async function decompressZip(buffer: Buffer, destination: string): Promise<void> {
  const zip = await JSZip.loadAsync(buffer)

  await Promise.all(
    Object.keys(zip.files).map(async (filename) => {
      const file = zip.files[filename]

      // Ensure the directory exists
      if (file.dir) await fs.ensureDir(path.join(destination, filename))
      else {
        // Ensure parent directory exists
        await fs.ensureDir(path.dirname(path.join(destination, filename)))

        // Write file
        const content = await file.async('nodebuffer')
        await fs.writeFile(path.join(destination, filename), content)
      }
    })
  )
}

/**
 * This function checks if a file or directory exists.
 * @param location the path to the file or directory.
 * @returns {Promise<boolean>} whether the file or directory exists.
 */
async function locationExists(location: string): Promise<boolean> {
  try {
    await fs.stat(location)
    return true
  } catch {
    return false
  }
}

/**
 * This function writes a constant CSLOL-MANAGER configuration file.
 * @returns {Promise<void>} when the operation is finished.
 */
async function createConfig(): Promise<void> {
  const leaguePath = getLeaguePath()

  const configContent = `[General]
ignorebad=false
themeAccentColor=1
lastZipDirectory=@Variant(\0\0\0\x11\xff\xff\xff\xff)
themePrimaryColor=4
windowWidth=640
blacklist=true
suppressInstallConflicts=false
enableAutoRun=false
enableSystray=false
themeDarkMode=true
leaguePath=${leaguePath}/Game
windowHeight=640
verbosePatcher=false
detectGamePath=true
windowMaximised=false
enableUpdates=0
removeUnknownNames=true
lastUpdateUTCMinutes=29039901
`
  fs.writeFile(CSLOL_MANAGER_CONFIG, configContent)
}

/**
 * This function downloads and unzips the CSLOL-MANAGER executables for Windows into user data.
 * @returns {Promise<void>} when the operation is finished.
 */
export async function downloadCsLolManager(): Promise<void> {
  if (await locationExists(CSLOL_MANAGER_LOCATION)) return

  console.log('Downloading CS-LOL Manager...')

  const response = await fetch(CSLOL_MANAGER_URL)
  const buffer = Buffer.from(await response.arrayBuffer())

  await decompressZip(buffer, CSLOL_MANAGER_DESTINATION)
  await createConfig()
}

/**
 * This function downloads and unzips the LOL-SKINS repository into user data.
 * @param force whether it should ignore existing files and download new ones.
 * @returns {Promise<void>} when the operation is finished.
 */
export async function downloadLolSkins(force: boolean = false): Promise<void> {
  if (!force && (await locationExists(LOL_SKINS_LOCATION))) return

  console.log('Downloading LOL-SKINS...')

  const response = await fetch(LOL_SKINS_URL)
  const buffer = Buffer.from(await response.arrayBuffer())

  await decompressZip(buffer, LOL_SKINS_DESTINATION)
}
