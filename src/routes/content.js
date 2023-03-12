const AdminMod = require("../services/modules/Admin")
const ObjectId = require('mongodb').ObjectId
class FortniteGame {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }
    endpoints(application) {
        application.get(["/content/api/pages/fortnite-game", "/content/app/pages/"], async (req, res) => {
            const fortnitecontentyay = await AdminMod.findOne({ _id: new ObjectId("640d1c48fe89a28d0bf5b7c6") }).lean().catch(e => next(e))
            res.json({
                "_title": "Fortnite Game",
                "_activeDate": "2017-08-30T03:20:48.050Z",
                "lastModified": "2019-11-01T17:33:35.346Z",
                "_locale": "en-US",
                "loginmessage": {
                    "_title": "LoginMessage",
                    "loginmessage": {
                        "_type": "CommonUI Simple Message",
                        "message": {
                            "_type": "CommonUI Simple Message Base",
                            "title": "Infinity",
                            "body": "Welcome to the Infinity Beta\nDiscord: https://discord.gg/gtxWefsyfv"
                        }
                    },
                    "_activeDate": "2017-07-19T13:14:04.490Z",
                    "lastModified": "2018-03-15T07:10:22.222Z",
                    "_locale": "en-US"
                },
                "savetheworldnews": {
                    "news": {
                        "_type": "Battle Royale News",
                        "messages": [
                            {
                                "image": fortnitecontentyay.news.news1.image,
                                "hidden": false,
                                "_type": "CommonUI Simple Message Base",
                                "adspace": fortnitecontentyay.news.news1.adspace,
                                "title": fortnitecontentyay.news.news1.title,
                                "body": fortnitecontentyay.news.news1.body,
                                "spotlight": false
                            },
                            {
                                "image": fortnitecontentyay.news.news2.image,
                                "hidden": false,
                                "_type": "CommonUI Simple Message Base",
                                "adspace": fortnitecontentyay.news.news2.adspace,
                                "title": fortnitecontentyay.news.news2.title,
                                "body": fortnitecontentyay.news.news2.body,
                                "spotlight": false
                            }
                        ]
                    },
                    "_title": "SaveTheWorldNews",
                    "_noIndex": false,
                    "alwaysShow": false,
                    "_activeDate": "2018-08-06T18:25:46.770Z",
                    "lastModified": "2019-10-30T20:17:48.789Z",
                    "_locale": "en-US"
                },
                "emergencynotice": {
                    "news": {
                        "_type": "Battle Royale News",
                        "messages": [
                            {
                                "hidden": false,
                                "_type": "CommonUI Simple Message Base",
                                "title": fortnitecontentyay.emergencynotice.title,
                                "body": fortnitecontentyay.emergencynotice.body,
                                "spotlight": true
                            }
                        ]
                    },
                    "_title": "emergencynotice",
                    "_noIndex": false,
                    "alwaysShow": false,
                    "_activeDate": "2018-08-06T19:00:26.217Z",
                    "lastModified": "2019-10-29T22:32:52.686Z",
                    "_locale": "en-US"
                },
                "emergencynoticev2": {
                    "jcr:isCheckedOut": true,
                    "_title": "emergencynoticev2",
                    "_noIndex": false,
                    "jcr:baseVersion": "a7ca237317f1e771e921e2-7f15-4485-b2e2-553b809fa363",
                    "emergencynotices": {
                        "_type": "Emergency Notices",
                        "emergencynotices": [
                            {
                                "gamemodes": [],
                                "hidden": false,
                                "_type": "CommonUI Emergency Notice Base",
                                "title": fortnitecontentyay.emergencynotice.title,
                                "body": fortnitecontentyay.emergencynotice.body
                            }
                        ]
                    },
                    "_activeDate": "2018-08-06T19:00:26.217Z",
                    "lastModified": "2021-12-01T15:55:56.012Z",
                    "_locale": "en-US"
                },
                "battleroyalenews": {
                    "news": {
                        "platform_messages": [
                            {
                                "hidden": false,
                                "_type": "CommonUI Simple Message Platform",
                                "message": {
                                    "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/battleroyalenews/v11/v1101/11BR_EpicGamesAndroidLauncherAssets_MOTD-1024x512-18dd3ddb2b4297abde65e0d898244181f4581326.jpg",
                                    "hidden": false,
                                    "_type": "CommonUI Simple Message Base",
                                    "subgame": "br",
                                    "title": "Epic Games app",
                                    "body": "The Fortnite Installer on Android is now the Epic Games app!\nUse it to download Fortnite on Android and check out all that's new in #FortniteChapter2",
                                    "spotlight": false
                                },
                                "platform": "android"
                            }
                        ],
                        "_type": "Battle Royale News",
                        "messages": [
                            {
                                "image": fortnitecontentyay.news.news1.image,
                                "hidden": false,
                                "_type": "CommonUI Simple Message Base",
                                "adspace": fortnitecontentyay.news.news1.adspace,
                                "title": fortnitecontentyay.news.news1.title,
                                "body": fortnitecontentyay.news.news1.body,
                                "spotlight": false
                            },
                            {
                                "image": fortnitecontentyay.news.news2.image,
                                "hidden": false,
                                "_type": "CommonUI Simple Message Base",
                                "adspace": fortnitecontentyay.news.news2.adspace,
                                "title": fortnitecontentyay.news.news2.title,
                                "body": fortnitecontentyay.news.news2.body,
                                "spotlight": false
                            }
                        ]
                    },
                    "_title": "battleroyalenews",
                    "header": "",
                    "style": "SpecialEvent",
                    "_noIndex": false,
                    "alwaysShow": false,
                    "_activeDate": "2018-08-17T16:00:00.000Z",
                    "lastModified": "2019-10-31T20:29:39.334Z",
                    "_locale": "en-US"
                },
                "playlistinformation": {
                    "frontend_matchmaking_header_style": "None",
                    "_title": "playlistinformation",
                    "frontend_matchmaking_header_text": "",
                    "playlist_info": {
                        "_type": "Playlist Information",
                        "playlists": [
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/11BR_2v2_GunFright_LTM-1024x512-f3b0f0157e8652a23db8abc23814d97893179e20.jpg",
                                "playlist_name": "Playlist_Creative_Hyena_G",
                                "violator": "COMMUNITY CREATION",
                                "_type": "FortPlaylistInfo",
                                "description": "Code BluDrive \r\n\r\nIt's 2 vs 2 in a battle of champions, which duo will come out on top? \r\n\r\nAt the beginning of each round, all players will be granted the same random kit. The duo that has the most wins after 5 rounds are completed will be crowned the victors! \r\n\r\nCreated By: BluDrive"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/11BR_LTM_ModeTile-1024x512-aae4d5b5eb1ea4eeb31f852c8b98516681bfe769.jpg",
                                "playlist_name": "Playlist_DADBRO_Squads",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/11BR_LTM_ModeTile-1024x512-aae4d5b5eb1ea4eeb31f852c8b98516681bfe769.jpg",
                                "playlist_name": "Playlist_DADBRO_Squads_12",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/11BR_LTM_ModeTile-1024x512-aae4d5b5eb1ea4eeb31f852c8b98516681bfe769.jpg",
                                "playlist_name": "Playlist_DADBRO_Squads_8",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/10BR_ZoneWars_In-Game_ModeTile_Red-1024x512-2e1c5e38b652093029befb6a86a44db844474af8.jpg",
                                "playlist_name": "Playlist_Creative_ZebraWallet_Random2",
                                "violator": "COMMUNITY CREATION",
                                "_type": "FortPlaylistInfo",
                                "description": "A solo queue, FFA simulation of the end-game scenario in Battle Royale with a quick moving zone. Randomized spawns and inventory items make each round unique. Stick around after the first game. there are multiple rounds in each session.  Zone Wars is a collection of games made by the community. The four maps included in this playlist are:  Desert created by JotaPeGame. Code: jotapegame Downhill River created by Enigma. Code: enigma Vortex created by Zeroyahero. Code: zeroyahero Colosseum created by Jesgran. Code: jesgran",
                                "display_name": "SOLO FFA"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/10BR_ZoneWars_In-Game_ModeTile_Blue-1024x512-0f76af6296545de1b2d9da766e76475418bc5940.jpg",
                                "playlist_name": "Playlist_Creative_ZebraWallet_Random",
                                "violator": "COMMUNITY CREATION",
                                "_type": "FortPlaylistInfo",
                                "description": "A party queue, FFA simulation of the end-game scenario in Battle Royale with a quick moving zone. Randomized spawns and inventory items make each round unique. Stick around after the first game. there are multiple rounds in each session.  Zone Wars is a collection of games made by the community. The four maps included in this playlist are:  Desert created by JotaPeGame. Code: jotapegame Downhill River created by Enigma. Code: enigma Vortex created by Zeroyahero. Code: zeroyahero Colosseum created by Jesgran. Code: jesgran",
                                "display_name": "PARTY FFA"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/FORT_Tile_Tutorial-1024x512-72a618fa185a0bbc26ab6a290bc0a45cf460c576.png",
                                "playlist_name": "Playlist_Tutorial_1",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/10BR_ZoneWars_In-Game_ModeTile-1024x512-a2741f113a7178ca15d71d281dcc2b614ff90754.jpg",
                                "playlist_name": "Playlist_Creative_ZebraWallet_A",
                                "violator": "PARTY FFA",
                                "_type": "FortPlaylistInfo",
                                "description": "Code jesgran Zone Wars - Arena  A party, FFA simulation of the end-game scenario in Battle Royale with a quick-moving zone. Eliminate the competition as you avoid the Storm. Randomized spawns and inventory items make each round unique. Stick around after the first game. There are multiple rounds in each session. Become the ultimate gladiator in this Colosseum style island. An open style island demands quick building. Created by Jesgran.",
                                "display_name": "Colosseum"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/10BR_ZoneWars_In-Game_ModeTile_Red-1024x512-2e1c5e38b652093029befb6a86a44db844474af8.jpg",
                                "playlist_name": "Playlist_Creative_ZebraWallet_D",
                                "violator": "SOLO FFA",
                                "_type": "FortPlaylistInfo",
                                "description": "Code jotapegame Desert Zone Wars 4.1  \r\n\r\nA solo, FFA simulation of the end-game scenario in Battle Royale with a quick-moving zone. Eliminate the competition as you avoid the Storm. Randomized spawns and inventory items make each round unique. Stick around after the first game. There are multiple rounds in each session.  \r\n\r\nMake your way through a small desert town to the final circle. A diverse set of weapons and mobility allows for unique gameplay and lots of replayability.  \r\n\r\nCreated by JotaPeGame.",
                                "display_name": "Desert"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/10BR_ZoneWars_In-Game_ModeTile_Blue-1024x512-0f76af6296545de1b2d9da766e76475418bc5940.jpg",
                                "playlist_name": "Playlist_Creative_ZebraWallet_DH",
                                "violator": "PARTY FFA",
                                "_type": "FortPlaylistInfo",
                                "description": "Code enigma S10 Enigmas Downhill River Zonewars X  A party, FFA simulation of the end-game scenario in Battle Royale with a quick-moving zone. Eliminate the competition as you avoid the Storm. Randomized spawns and inventory items make each round unique. Stick around after the first game. There are multiple rounds in each session.  Stay out of the storm as you move downhill through a river in this original style Zone Wars island. Community launch pads and a consistent Storm path allows for familiarity after a few rounds.  Created by Enigma.",
                                "display_name": "Downhill River"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/10BR_ZoneWars_In-Game_ModeTile_Black-1024x512-23ba95e82931361ce535a643fdac54e120254374.jpg",
                                "playlist_name": "Playlist_Creative_ZebraWallet_V",
                                "violator": "PARTY FFA",
                                "_type": "FortPlaylistInfo",
                                "description": "Code zeroyahero Vortex Zone Wars A party, FFA simulation of the end-game scenario in Battle Royale with a quick-moving zone. Eliminate the competition as you avoid the Storm. Randomized spawns and inventory items make each round unique. Stick around after the first game. There are multiple rounds in each session.  This island puts a unique twist on the Zone Wars game with mountainous terrain to traverse. The elevation change from zone to zone can be quite drastic!  Created by Zeroyahero",
                                "display_name": "Vortex"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/10BR_TheCombine_ModeTile-1024x512-3aa8ebdfe1df7d9995e824a781eacdb954ee9615.jpg",
                                "playlist_name": "Playlist_Crucible_Solo",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlisttiles/BR_LTM-Tile_Playground-1024x512-53db8a4b5fb41251af279eaf923bc00ecbc17792.jpg",
                                "playlist_name": "Playlist_Creative_PlayOnly_40",
                                "special_border": "None",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/10CM_LTM_KnockTown_Playlist-1024x512-72e32b88b332b4d3ee3ee5255eff9522b660485c.jpg",
                                "playlist_name": "Playlist_Creative_KaleTofu",
                                "violator": "COMMUNITY CREATION",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/10BR_Bounty_LTM_ModeTile-1024x512-57ae30f0c598acda4be4975930ad30e210debb61.jpg",
                                "playlist_name": "Playlist_Bounty_Squads",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/10BR_Bounty_LTM_ModeTile-1024x512-57ae30f0c598acda4be4975930ad30e210debb61.jpg",
                                "playlist_name": "Playlist_Bounty_Solo",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/10BR_Bounty_LTM_ModeTile-1024x512-57ae30f0c598acda4be4975930ad30e210debb61.jpg",
                                "playlist_name": "Playlist_Bounty_Duos",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/09CM_WorldCup_FeatIsland_WorldRun_ModeTile-1024x512-34d66c90603f4e64ebd56054b889c4ec163abea5.jpg",
                                "playlist_name": "Playlist_Creative_Squad_Battle_16_B",
                                "violator": "COMMUNITY CREATION",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR_LTM_SneakySilencers-1024x512-1669e2eeddca63b61e9b94cc19c3ec502fd33f29.jpg",
                                "playlist_name": "Playlist_Sneaky_Duos",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v94/09CM_WorldCup_FeatIsland_JunkyardJuke_ModeTile-1024x512-7a2585ce248f1efa438674c368b37116dc5514de.jpg",
                                "playlist_name": "Playlist_Creative_Squad_Battle_16_A",
                                "violator": "COMMUNITY CREATION",
                                "_type": "FortPlaylistInfo",
                                "violator": "",
                                "special_border": "HighStakes",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR04_LTM_SolidGold-1024x512-36e202c36d3ef3bd151a97c060401d33ac6f549a.png",
                                "playlist_name": "Playlist_50v50SAU",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR05_LobbyTile_LTM_ScoreRoyale-1024x512-b608aaf7840cdf6b7a702c5cbe1848a2247516d6.jpg",
                                "playlist_name": "Playlist_Score_Squads",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR05_LobbyTile_LTM_ScoreRoyale-1024x512-b608aaf7840cdf6b7a702c5cbe1848a2247516d6.jpg",
                                "playlist_name": "Playlist_Score_Duos",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR05_LobbyTile_LTM_ScoreRoyale-1024x512-b608aaf7840cdf6b7a702c5cbe1848a2247516d6.jpg",
                                "playlist_name": "Playlist_Score_Solo",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR05_LTM_Soaring50s-1024x512-80762dcc260cc959c11dac2ca2f6ae176eb63ef3.jpg",
                                "playlist_name": "Playlist_Soaring_50s",
                                "special_border": "None",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR05_LobbyTile_LTM-Steady-Storm-1024x512-f38e603ed9c80b6210a25c4737d3d8b675b8d28e.jpg",
                                "playlist_name": "Playlist_Steady_Duos",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR05_LobbyTile_LTM-Steady-Storm-1024x512-f38e603ed9c80b6210a25c4737d3d8b675b8d28e.jpg",
                                "playlist_name": "Playlist_Steady_Squads",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR05_LobbyTile_LTM-Steady-Storm-1024x512-f38e603ed9c80b6210a25c4737d3d8b675b8d28e.jpg",
                                "playlist_name": "Playlist_Steady_Solo",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR05_LTM_FlyExplosives-1024x512-6283e3392b3aa44794dac64423b22606f8773503.png",
                                "playlist_name": "Playlist_FlyExplosives_Duos",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR05_LTM_FlyExplosives-1024x512-6283e3392b3aa44794dac64423b22606f8773503.png",
                                "playlist_name": "Playlist_FlyExplosives_Squads",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR05_LTM_FlyExplosives-1024x512-6283e3392b3aa44794dac64423b22606f8773503.png",
                                "playlist_name": "Playlist_FlyExplosives_Solo",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlisttiles/LTM_Tile_FinalFight-1024x576-5af82788940faeef422ad204aaa241e36e7c9c56.jpg",
                                "playlist_name": "Playlist_Final_12",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "",
                                "playlist_name": "Playlist_Creative_PlayOnly",
                                "special_border": "None",
                                "_type": "FortPlaylistInfo",
                                "display_subname": "-"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistimages/BR_LTM-Tile_Tactics-Showdown-1024x512-a84753f49eb70d8751a99b4db83cdb5eb8290166.jpg",
                                "playlist_name": "Playlist_Taxes_Squads",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistimages/BR_LTM-Tile_Tactics-Showdown-1024x512-a84753f49eb70d8751a99b4db83cdb5eb8290166.jpg",
                                "playlist_name": "Playlist_Taxes_Duos",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistimages/BR_LTM-Tile_Tactics-Showdown-1024x512-a84753f49eb70d8751a99b4db83cdb5eb8290166.jpg",
                                "playlist_name": "Playlist_Taxes_Solo",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlisttiles/LTM_Tile_FinalFight-1024x576-5af82788940faeef422ad204aaa241e36e7c9c56.jpg",
                                "playlist_name": "Playlist_Final_20",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR04_LTM_SniperShootout-1024x512-bcaf8004961e4e374d0603813f840f4b575d230b.jpg",
                                "playlist_name": "Playlist_Snipers_Squads",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR04_LTM_SniperShootout-1024x512-bcaf8004961e4e374d0603813f840f4b575d230b.jpg",
                                "playlist_name": "Playlist_Snipers_Duos",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR04_LTM_SniperShootout-1024x512-bcaf8004961e4e374d0603813f840f4b575d230b.jpg",
                                "playlist_name": "Playlist_Snipers_Solo",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlisttiles/BR04_LTM_BlitzShowdown-1024x512-7eccbc505214ac522cc5dde7b3ceaa3a5f99e754.png",
                                "playlist_name": "Playlist_Comp_Blitz_Solo",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR04_LTM_5x20-1024x512-451b402db5751c25a1e7616930c5ae37d8b20710.png",
                                "playlist_name": "Playlist_5x20",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR04_LTM_Blitz-1024x512-98c63417095442c210177ee9b5f3463d0003cd5a.png",
                                "playlist_name": "Playlist_Blitz_Solo",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR04_LTM_Blitz-1024x512-98c63417095442c210177ee9b5f3463d0003cd5a.png",
                                "playlist_name": "Playlist_Blitz_Duos",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR04_LTM_Blitz-1024x512-98c63417095442c210177ee9b5f3463d0003cd5a.png",
                                "playlist_name": "Playlist_Blitz_Squad",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR04_LTM_CloseEncounters-1024x512-e617b7603adb59353ba81ed392174859c0c6807b.jpg",
                                "playlist_name": "Playlist_Close_Solo",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR04_LTM_CloseEncounters-1024x512-e617b7603adb59353ba81ed392174859c0c6807b.jpg",
                                "playlist_name": "Playlist_Close_Squad",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR04_LTM_CloseEncounters-1024x512-e617b7603adb59353ba81ed392174859c0c6807b.jpg",
                                "playlist_name": "Playlist_Close_Duos",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlisttiles/BR04_LTM_SoloShowdown-1024x512-0f522b0881adebfe241c6527f03c9140f70b88a7.png",
                                "playlist_name": "Playlist_Comp_Solo",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR04_LTM_SolidGold-1024x512-36e202c36d3ef3bd151a97c060401d33ac6f549a.png",
                                "playlist_name": "Playlist_SolidGold_Solo",
                                "violator": "",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/BR04_LTM_SolidGold-1024x512-36e202c36d3ef3bd151a97c060401d33ac6f549a.png",
                                "playlist_name": "Playlist_SolidGold_Duos",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://i.imgur.com/r5Nyhn2.jpg",
                                "playlist_name": "Playlist_50v50",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "",
                                "playlist_name": "Playlist_Carmine",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://i.imgur.com/zr4Fnnp.jpg",
                                "playlist_name": "Playlist_DefaultSolo",
                                "hidden": false,
                                "special_border": "None",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://i.imgur.com/99n3n0m.jpg",
                                "playlist_name": "Playlist_DefaultDuo",
                                "hidden": false,
                                "special_border": "None",
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "playlist_name": "Playlist_Trios",
                                "hidden": false,
                                "_type": "FortPlaylistInfo"
                            },
                            {
                                "image": "https://i.imgur.com/YA4ssMv.jpg",
                                "playlist_name": "Playlist_DefaultSquad",
                                "hidden": false,
                                "special_border": "None",
                                "_type": "FortPlaylistInfo"
                            }
                        ]
                    },
                    "_noIndex": false,
                    "_activeDate": "2018-04-25T15:05:39.956Z",
                    "lastModified": "2019-10-29T14:05:17.030Z",
                    "_locale": "en-US"
                },
                "creativenews": {
                    "news": {
                        "_type": "Battle Royale News",
                        "messages": [
                            {
                                "image": fortnitecontentyay.news.news1.image,
                                "hidden": false,
                                "_type": "CommonUI Simple Message Base",
                                "adspace": fortnitecontentyay.news.news1.adspace,
                                "title": fortnitecontentyay.news.news1.title,
                                "body": fortnitecontentyay.news.news1.body,
                                "spotlight": false
                            },
                            {
                                "image": fortnitecontentyay.news.news2.image,
                                "hidden": false,
                                "_type": "CommonUI Simple Message Base",
                                "adspace": fortnitecontentyay.news.news2.adspace,
                                "title": fortnitecontentyay.news.news2.title,
                                "body": fortnitecontentyay.news.news2.body,
                                "spotlight": false
                            }
                        ]
                    },
                    "_title": "Creativenews",
                    "header": "",
                    "style": "None",
                    "_noIndex": false,
                    "alwaysShow": false,
                    "_activeDate": "2018-08-17T16:00:00.000Z",
                    "lastModified": "2019-10-31T20:35:52.569Z",
                    "_locale": "en-US"
                },

                "tournamentinformation": {
                    "tournament_info": {
                        "tournaments": [
                            {

                            }
                        ],
                        "_type": "Tournaments Info"
                    },
                    "_title": "tournamentinformation",
                    "_noIndex": false,
                    "_activeDate": "2018-11-13T22:32:47.734Z",
                    "lastModified": "2019-11-01T17:33:35.346Z",
                    "_locale": "en-US"
                },

                "koreancafe": {
                    "_title": "KoreanCafe",
                    "cafe_info": {
                        "cafes": [
                            {
                                "korean_cafe": "PCB.Partner.Neowiz",
                                "korean_cafe_description": "ON",
                                "_type": "PCB Info",
                                "korean_cafe_header": "PC CAFE BENEFITS"
                            },
                            {
                                "korean_cafe": "PCB.Partner.Other",
                                "korean_cafe_description": "ON",
                                "_type": "PCB Info",
                                "korean_cafe_header": "PC CAFE BENEFITS"
                            }
                        ],
                        "_type": "PCBs"
                    },
                    "_activeDate": "2018-10-25T18:35:49.659Z",
                    "lastModified": "2018-11-07T06:37:42.201Z",
                    "_locale": "en-US"
                },
                "creativeAds": {
                    "ad_info": {
                        "ads": [],
                        "_type": "Creative Ad Info"
                    },
                    "_title": "creative-ads",
                    "_activeDate": "2018-11-09T20:00:42.300Z",
                    "lastModified": "2019-09-25T15:55:44.830Z",
                    "_locale": "en-US"
                },
                "creativeFeatures": {
                    "ad_info": {
                        "_type": "Creative Ad Info"
                    },
                    "_title": "Creative Features",
                    "_activeDate": "2019-03-27T14:47:20.426Z",
                    "lastModified": "2019-06-20T22:06:24.590Z",
                    "_locale": "en-US"
                },
                "specialoffervideo": {
                    "_activeDate": "2021-08-14T23:58:00.000Z",
                    "_locale": "pl",
                    "_noIndex": false,
                    "_title": "specialoffervideo",
                    "bSpecialOfferEnabled": false,
                    "jcr:baseVersion": "a7ca237317f1e78e4627c4-c68f-4a12-9480-066c92dd14e5",
                    "jcr:isCheckedOut": true,
                    "lastModified": "2021-07-12T16:08:40.485Z",
                    "specialoffervideo": {
                        "_type": "SpecialOfferVideoConfig",
                        "bCheckAutoPlay": true,
                        "bStreamingEnabled": true,
                        "videoString": "",
                        "videoUID": ""
                    }
                },
                "subgameinfo": {
                    "battleroyale": {
                        "image": "",
                        "color": "1164c1",
                        "_type": "Subgame Info",
                        "description": {
                            "de": "100 Spieler PvP",
                            "ru": "PVP-режим на 100 игроков",
                            "ko": "100인 플레이어 PvP",
                            "en": "100 Player PvP",
                            "it": "PvP a 100 giocatori",
                            "fr": "JcJ à 100 joueurs",
                            "es": "JcJ de 100 jugadores",
                            "ar": "100 لاعب ضد لاعب",
                            "ja": "プレイヤー100人によるPvP",
                            "pl": "PvP dla 100 graczy",
                            "es-419": "JcJ de 100 jugadores",
                            "tr": "100 Oyunculu PVP"
                        },
                        "subgame": "battleroyale",
                        "standardMessageLine2": "",
                        "title": {
                            "de": "Battle Royale",
                            "ru": "Battle Royale",
                            "ko": "Battle Royale",
                            "en": "Battle Royale",
                            "it": "Battaglia reale",
                            "fr": "Battle Royale",
                            "es": "Battle Royale",
                            "ar": "Battle Royale",
                            "ja": "Battle Royale",
                            "pl": "Battle Royale",
                            "es-419": "Batalla campal",
                            "tr": "Battle Royale"
                        },
                        "standardMessageLine1": ""
                    },
                    "savetheworld": {
                        "image": "",
                        "color": "7615E9FF",
                        "specialMessage": "",
                        "_type": "Subgame Info",
                        "description": {
                            "de": "Kooperatives PvE-Abenteuer!",
                            "ru": "Совместное сражение с Бурей!",
                            "ko": "협동 PvE 어드벤처!",
                            "en": "Cooperative PvE Adventure",
                            "it": "Avventura cooperativa PvE!",
                            "fr": "Aventure en JcE coopératif !",
                            "es": "¡Aventura cooperativa JcE!",
                            "ar": "مشروع تعاوني للاعب ضد البيئة!",
                            "ja": "協力プレイが楽しめるPvE！",
                            "pl": "Kooperacyjne zmagania PvE z pustakami!",
                            "es-419": "¡Aventura de JcE cooperativa!",
                            "tr": "Diğer oyuncularla birlikte PvE macerası!"
                        },
                        "subgame": "savetheworld",
                        "title": {
                            "de": "Rette die Welt",
                            "ru": "Сражениес Бурей",
                            "ko": "세이브 더 월드",
                            "en": "Save The World",
                            "it": "Salva il mondo",
                            "fr": "Sauver le monde",
                            "es": "Salvar elmundo",
                            "ar": "Save The World",
                            "ja": "世界を救え",
                            "pl": "Ratowanie Świata",
                            "es-419": "Salva el mundo",
                            "tr": "Dünyayı Kurtar"
                        }
                    },
                    "_title": "SubgameInfo",
                    "_noIndex": false,
                    "creative": {
                        "image": "",
                        "color": "13BDA1FF",
                        "_type": "Subgame Info",
                        "description": {
                            "de": "Deine Inseln. Deine Freunde. Deine Regeln.",
                            "ru": "Ваши острова. Ваши друзья. Ваши правила.",
                            "ko": "나의 섬. 나의 친구. 나의 규칙.",
                            "en": "Your Islands. Your Friends. Your Rules.",
                            "it": "Le tue isole. I tuoi amici. Le tue regole.",
                            "fr": "Vos îles, vos amis, vos règles.",
                            "es": "Tus islas. Tus amigos. Tus reglas.",
                            "ar": "جزرك. أصدقاؤك. قواعدك.",
                            "ja": "自分の島。自分のフレンド。自分のルール。",
                            "pl": "Twoje wyspa, twoi znajomi, twoje zasady.",
                            "es-419": "Tus islas. Tus amigos. Tus reglas.",
                            "tr": "Senin Adaların. Senin Dostların. Senin Kuralların."
                        },
                        "subgame": "creative",
                        "title": {
                            "de": "Kreativmodus",
                            "ru": "Творческийрежим",
                            "ko": "포크리",
                            "en": "Creative",
                            "it": "Modalità creativa",
                            "fr": "Mode Créatif",
                            "es": "Modo Creativo",
                            "ar": "Creative",
                            "ja": "クリエイティブ",
                            "pl": "Tryb kreatywny",
                            "es-419": "Modo Creativo",
                            "tr": "Kreatif"
                        },
                        "standardMessageLine1": ""
                    },
                    "_activeDate": "2019-05-02T16:48:47.429Z",
                    "lastModified": "2019-10-29T12:44:06.577Z",
                    "_locale": "en-US"
                },
                "lobby": {
                    "backgroundimage": "https://cdn.discordapp.com/attachments/927739901540188200/930883349831118878/Fortnite_fortnite-game_lobby_T_Lobby_SeasonX-2048x1024-24e02780ed533da8001016f4e6fb14dd15e2f860.png",
                    "stage": "seasonx",
                    "_title": "lobby",
                    "_activeDate": "2019-05-31T21:24:39.892Z",
                    "lastModified": "2019-07-31T21:24:17.119Z",
                    "_locale": "en-US"
                },
                "dynamicbackgrounds": {
                    "backgrounds": {
                        "backgrounds": [
                            {
                                "stage": "fortnitemares",
                                "_type": "DynamicBackground",
                                "key": "lobby"
                            },
                            {
                                "stage": "fortnitemares",
                                "_type": "DynamicBackground",
                                "key": "vault"
                            }
                        ],
                        "_type": "DynamicBackgroundList"
                    },
                    "_title": "dynamicbackgrounds",
                    "_noIndex": false,
                    "_activeDate": "2019-08-21T15:59:59.342Z",
                    "lastModified": "2019-10-29T13:07:27.936Z",
                    "_locale": "en-US"
                },
                "_suggestedPrefetch": []

            })
        })
    }
}

module.exports = new FortniteGame