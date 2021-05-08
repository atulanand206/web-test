import * as State from './State/State';

export function fetchGames(config, callback) {
    fetch(`http://${process.env.REACT_APP_URL}/games?config=${config}`)
        .then(response => response.json())
        .then(data => {
            callback(data);
        });
}

class Server {
    fetchBoard(config, callback) {
        fetch(`http://${process.env.REACT_APP_URL}/game/new?rows=${config.row}&columns=${config.col}&mines=${config.mines}`)
        .then(response => response.json())
        .then(data => {
            callback(data.map(row => row.map(item => { return {disabled: false, value: item, state: State.HIDDEN } } )));
        });
    }

    saveGame(game) {
        fetch(`http://${process.env.REACT_APP_URL}/game/save`, {
            method: "POST", 
            body: JSON.stringify(game)
        }).then(res => {
            console.log("Request complete! response:", res);
        });
    }
}

export default Server;