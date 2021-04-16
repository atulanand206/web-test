class Server {
    fetchBoard(config, callback) {
        fetch(`http://localhost:5000/game/new?rows=${config.row}&columns=${config.col}&mines=${config.mines}`)
        .then(response => response.json())
        .then(data => {
            callback(data.map((r, i) => r.map((c, j) => { return {disabled: false, value: c, hidden: true} } )));
        });
    }
}

export default Server;