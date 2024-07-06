import express from 'express';

const app = express();
const port = 3000;
const baseURL = 'https://vlrggapi.vercel.app';

interface LiveMatch {
    team1: string;
    team2: string;
    flag1: string;
    flag2: string;
    score1: string;
    score2: string;
    team1_round_ct: string;
    team1_round_t: string;
    team2_round_ct: string;
    team2_round_t: string;
    map_number: string;
    current_map: string;
    time_until_match: string;
    match_event: string;
    match_series: string;
    unix_timestamp: string;
    match_page: string;
}

const noLiveMatch: LiveMatch = {
    team1: 'No live matches',
    team2: 'No live matches',
    flag1: 'No live matches',
    flag2: 'No live matches',
    score1: 'No live matches',
    score2: 'No live matches',
    team1_round_ct: 'No live matches',
    team1_round_t: 'No live matches',
    team2_round_ct: 'No live matches',
    team2_round_t: 'No live matches',
    map_number: 'No live matches',
    current_map: 'No live matches',
    time_until_match: 'No live matches',
    match_event: 'No live matches',
    match_series: 'No live matches',
    unix_timestamp: 'No live matches',
    match_page: 'No live matches',
};

const fetchLiveMatch = async (): Promise<LiveMatch> => {
    const response = await fetch(baseURL + '/match?q=live_score');
    const data = await response.json().then((data) => data.data);
    console.log('Data:', data);

    if (!data || data.segments.length === 0) {
        return noLiveMatch;
    }

    for (const match of data.segments) {
        if (match.match_series.includes('Champions Tour')) {
            console.log('Current match:', match);
            return match;
        }
    }

    return data.segments[0] || noLiveMatch;
};

const startServer = () => {
    app.get('/', (req: any, res: any) => {
        res.send('Hello World!');
    });

    app.get('/live', async (req: any, res: any) => {
        const liveMatch = await fetchLiveMatch();
        res.send(liveMatch);
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
};

(async () => {
    let liveMatch = await fetchLiveMatch();

    if (liveMatch.time_until_match === 'LIVE') {
        setInterval(async () => {
            liveMatch = await fetchLiveMatch();
        }, 30000);
    }
    else {
        setInterval(async () => {
            liveMatch = await fetchLiveMatch();
        }, 120000);
    }

    startServer();
})();
