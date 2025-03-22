/**
 * ┌───────────────────────────────────────────────────────────────────────────────┐
 * │ This module is used to communicate with the league client API to acquire the  │
 * │ necessary information from champion select.                                   │
 * └───────────────────────────────────────────────────────────────────────────────┘
 */

import { promises as fs } from 'fs'
import fetch, { Response } from 'node-fetch'
import { Agent } from 'https'

import { getLeaguePath } from './config'

export type Skin = {
  id: number
  championId: number
  championName: string
  name: string
  splashPath: string
  loadingURL: string
  childSkins: {
    id: number
    championId: number
    index: number
    colors: string[]
  }[]
}

export type SkinOrChroma = Skin | Skin['childSkins'][number]

/**
 * This function gets the authentication details from the league client lockfile.
 * @returns {Promise<{ username: string, port: string, password: string, protocol: string } | null>} the authentication details or null if the lockfile is not found.
 */
async function getAuthDetails(): Promise<{
  username: string
  port: string
  password: string
  protocol: string
} | null> {
  const leaguePath = await getLeaguePath()

  try {
    const lockFile = await fs.readFile(`${leaguePath}/lockfile`, 'utf-8')
    const [port, password, protocol] = lockFile.split(':').splice(2)
    return { username: 'riot', port, password, protocol }
  } catch {
    return null
  }
}

/**
 * This function fetches the league client API with the necessary authentication headers.
 * @param url the URL to fetch.
 * @param method the method to use, defaults to 'GET'.
 * @returns {Promise<Response>} the response from the fetch.
 */
async function fetchLeague(url: string, method: string = 'GET'): Promise<Response> {
  const auth = await getAuthDetails()

  if (!auth) return new Response('Lockfile not found', { status: 404 })

  return fetch(`${auth.protocol}://127.0.0.1:${auth.port}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${auth.username}:${auth.password}`).toString('base64')}`
    },
    agent: new Agent({ rejectUnauthorized: false })
  })
}

/**
 * This function gets the skins from the league client API.
 * @returns {Promise<Skin[]>} the skins from the league client API.
 */
export async function getSkins(): Promise<Skin[]> {
  try {
    const response = await fetchLeague('/lol-champ-select/v1/skin-carousel-skins')
    if (!response.ok) return []

    const skins = (await response.json()) as Skin[]
    if (skins.length === 0) return []

    const championName = skins[0].name
    const championNamePlain = skins[0].splashPath.split('/')[5]

    return skins.map((skin) => ({
      ...skin,
      id: Number(skin.id.toString().replace(skin.championId.toString(), '')),
      championName,
      loadingURL: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championNamePlain}_${Number(skin.splashPath.match(/\d+/))}.jpg`,
      childSkins: skin.childSkins.map((childSkin) => ({
        ...childSkin,
        id: Number(childSkin.id.toString().replace(childSkin.championId.toString(), ''))
      }))
    }))
  } catch {
    return []
  }
}
