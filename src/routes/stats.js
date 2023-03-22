const User = require("../services/modules/User");
const fs = require('fs');
const path = require('path');
class Stats {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.all(["/fortnite/api/statsv2/account/:accountId", "/statsproxy/api/statsv2/account/:accountId"], async (req, res) => {
            var username = req.headers.cookie.split('=')[1];
            //console.log(req.params);
            const user = await User.findOne({ displayName: username }).lean();

            if(!user) return res.json([]);
            res.json({
                "startTime": 0,
                "endTime": 9223372036854776000,
                "stats": {
                  "br_score_keyboardmouse_m0_playlist_DefaultSolo": 859,
                  "br_kills_keyboardmouse_m0_playlist_DefaultSolo": user.stats.solos.kills,
                  "br_playersoutlived_keyboardmouse_m0_playlist_DefaultSolo": 0,
                  "br_matchesplayed_keyboardmouse_m0_playlist_DefaultSolo": user.stats.solos.matchplayed,
                  "br_placetop25_keyboardmouse_m0_playlist_DefaultSolo": 0,
                  "br_placetop1_keyboardmouse_m0_playlist_DefaultSolo": user.stats.solos.wins,
                  "br_score_keyboardmouse_m0_playlist_DefaultDuo": 0,
                  "br_kills_keyboardmouse_m0_playlist_DefaultDuo": user.stats.duos.kills,
                  "br_playersoutlived_keyboardmouse_m0_playlist_DefaultDuo": 0,
                  "br_matchesplayed_keyboardmouse_m0_playlist_DefaultDuo": user.stats.duos.matchplayed,
                  "br_placetop25_keyboardmouse_m0_playlist_DefaultDuo": 0,
                  "br_placetop1_keyboardmouse_m0_playlist_DefaultDuo": user.stats.duos.wins,
                  "br_score_keyboardmouse_m0_playlist_DefaultSquad": 0,
                  "br_kills_keyboardmouse_m0_playlist_DefaultSquad": user.stats.squad.kills,
                  "br_playersoutlived_keyboardmouse_m0_playlist_DefaultSquad": 0,
                  "br_matchesplayed_keyboardmouse_m0_playlist_DefaultSquad": user.stats.squad.matchplayed,
                  "br_placetop25_keyboardmouse_m0_playlist_DefaultSquad": 0,
                  "br_placetop1_keyboardmouse_m0_playlist_DefaultSquad": user.stats.squad.wins,
                  "br_score_keyboardmouse_m0_playlist_50v50": 0,
                  "br_kills_keyboardmouse_m0_playlist_50v50": user.stats.ltm.kills,
                  "br_playersoutlived_keyboardmouse_m0_playlist_50v50": 0,
                  "br_matchesplayed_keyboardmouse_m0_playlist_50v50": user.stats.ltm.matchplayed,
                  "br_placetop25_keyboardmouse_m0_playlist_50v50": 0,
                  "br_placetop1_keyboardmouse_m0_playlist_50v50": user.stats.ltm.wins
                },
                "accountId": user.id
              });
        });
    }
}

module.exports = new Stats