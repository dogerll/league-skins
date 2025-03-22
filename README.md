# League Skins

A Windows skin changer for League of Legends based on lol-skins and cslol-manager.

<img src="docs/demo.gif">

## How it works

- It downloads the latest skins from [lol-skins](https://github.com/koobzaar/lol-skins-developer) and unzips them.
- It downloads, unzips and uses [cslol-manager](https://github.com/LeagueToolkit/cslol-manager) to change the skins in the game.
- It uses [League Client API](https://developer.riotgames.com/docs/lol#game-client-api) to detect the selected champion from champ select.


## Build it yourself
```bash
git clone https://github.com/KonstantinosPetrakis/league-skins.git
cd league-skins
npm install
npm run build:win
```

## Disclaimer

This project is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or any of its affiliates. League of Legends and all related properties are trademarks or registered trademarks of Riot Games, Inc.

Additionally, I do not know whether this software violates Riot Games' Terms of Service. Its use may be against their policies, and I cannot guarantee whether it is detectable or bannable. Use this software at your own risk, as I am not responsible for any consequences, including but not limited to account penalties, bans, or restrictions imposed by Riot Games.
