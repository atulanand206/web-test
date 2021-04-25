import * as State from './State/State';
class Server {
    fetchBoard(config, callback) {
        fetch(`http://localhost:5000/game/new?rows=${config.row}&columns=${config.col}&mines=${config.mines}`)
        .then(response => response.json())
        .then(data => {
            callback(data.map(row => row.map(item => { return {disabled: false, value: item, state: State.HIDDEN } } )));
        });
    }

    saveGame(game) {
        fetch(`http://localhost:5000/game/save`, {
            method: "POST", 
            body: JSON.stringify(game)
        }).then(res => {
            console.log("Request complete! response:", res);
        });
    }
}

export default Server;