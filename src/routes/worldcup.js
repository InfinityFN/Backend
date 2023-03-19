const path = require('path');
class WorldCup {
    constructor() {
        this.application = require("express").Router()
        this.endpoints(this.application)
    }

    endpoints(application) {
        application.get("/worldcup/leaderboards", (req,res) => {
            res.send(`
            <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Infinity World Cup Duos Leaderboard</title>
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Infinity World Cup Duos Leaderboard</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Team Name</th>
          <th>Team Members</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody id="leaderboard"></tbody>
    </table>
  </div>
  <!-- jQuery and Bootstrap JS -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <script>
  function _0x4cb9(){var _0x5266d2=['1866taevCB','700WvjuPV','4710xSZbKY','411329Qqegzb','<td>','<tr>','5239157soUKgA','2225HAXMEx','team_members','</tr>','</td>','774RRvtMO','getJSON','each','133904tVuDZr','/worldcup/leaderboards/json','points','append','30613570RojaSJ','team_name','#leaderboard','4903248GckQoi'];_0x4cb9=function(){return _0x5266d2;};return _0x4cb9();}function _0x1970(_0x1facd4,_0x3ed49e){var _0x4cb9b4=_0x4cb9();return _0x1970=function(_0x1970e7,_0x4b530b){_0x1970e7=_0x1970e7-0xeb;var _0x3b5480=_0x4cb9b4[_0x1970e7];return _0x3b5480;},_0x1970(_0x1facd4,_0x3ed49e);}(function(_0x211984,_0x1c6a36){var _0x51208f=_0x1970,_0xb34cd2=_0x211984();while(!![]){try{var _0x54d8e9=parseInt(_0x51208f(0xf5))/0x1+-parseInt(_0x51208f(0xf3))/0x2*(-parseInt(_0x51208f(0xf4))/0x3)+-parseInt(_0x51208f(0xf1))/0x4+parseInt(_0x51208f(0xf9))/0x5*(parseInt(_0x51208f(0xf2))/0x6)+-parseInt(_0x51208f(0xf8))/0x7+parseInt(_0x51208f(0x100))/0x8*(-parseInt(_0x51208f(0xfd))/0x9)+parseInt(_0x51208f(0xee))/0xa;if(_0x54d8e9===_0x1c6a36)break;else _0xb34cd2['push'](_0xb34cd2['shift']());}catch(_0x47ad4e){_0xb34cd2['push'](_0xb34cd2['shift']());}}}(_0x4cb9,0xb6562),$(document)['ready'](function(){var _0x46ec5a=_0x1970;$[_0x46ec5a(0xfe)](_0x46ec5a(0xeb),function(_0x3cfc09){var _0x31cd0a=_0x46ec5a;_0x3cfc09['sort'](function(_0x540512,_0x3a9cf7){var _0x301785=_0x1970;return _0x3a9cf7[_0x301785(0xec)]-_0x540512[_0x301785(0xec)];}),$[_0x31cd0a(0xff)](_0x3cfc09,function(_0x1358bd,_0x4cb022){var _0x404947=_0x31cd0a,_0x441e96=_0x1358bd+0x1,_0x5056f7=_0x404947(0xf7)+_0x404947(0xf6)+_0x441e96+_0x404947(0xfc)+_0x404947(0xf6)+_0x4cb022[_0x404947(0xef)]+'</td>'+_0x404947(0xf6)+_0x4cb022[_0x404947(0xfa)]+_0x404947(0xfc)+_0x404947(0xf6)+_0x4cb022[_0x404947(0xec)]+'</td>'+_0x404947(0xfb);$(_0x404947(0xf0))[_0x404947(0xed)](_0x5056f7);});});}));
  </script>
</body>
</html>
            `);

        });

        application.get('/worldcup/leaderboards/json', (req,res) => {
            return res.sendFile(path.join(__dirname, '../services/resources/json/teams.json'));
        });
    }
}

module.exports = new WorldCup