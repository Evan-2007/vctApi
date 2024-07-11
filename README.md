A simple api for getting live data for current vct games. All data is taken from [VLR](https://vlr.gg) using the [unofficial vlr api](https://github.com/axsddlr/vlrggapi) and is cached to prevent repeated requests going to vlr.

# API Routes

## /live

Returnes basic infomation about a game that is currently live. Data refreshes every 30 seconds during a live game and every 2 minuets when a game is not live

Example

    {
      team1: 'LOUD',
      team2: 'Leviatán',
      flag1: 'flag_br',
      flag2: 'flag_cl',
      score1: '0',
      score2: '1',
      team1_round_ct: 'N/A',
      team1_round_t: '3',
      team2_round_ct: '6',
      team2_round_t: 'N/A',
      map_number: '2',
      current_map: 'Icebox',
      time_until_match: 'LIVE',
      match_event: 'Champions Tour 2024: Americas Stage 2',
      match_series: 'Regular Season: Week 3',
      unix_timestamp: '2024-07-07 00:35:00',
      match_page: 'https://www.vlr.gg/353193/loud-vs-leviat-n-champions-tour-2024-americas-stage-2-w3';
    }

## /upcoming

Coming soon. Will show all upcomming games. games can be filterd by event using event paramater and giving it the name of a event as its shown on vlr with spaces replaced with ``-``. Example: ``https://vlr.evanc.dev/upcomming?event=Champions-Tour-2024:-Americas-Stage-2``


# Running Locally 
- clone the git repo ``git clone https://github.com/Evan-2007/vctApi.git && cd vctApi``
- Install the required node modules with ``pnpm i``
- build the app using ``pnpm tsc``
- Run the app using ``node ./build/index.js``
- Go to http://localhost:3000 and you should see a page saying ``hello world``
- Thats it you should now be able to qurry the endpoints
