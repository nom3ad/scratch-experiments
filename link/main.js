const ws = require('ws')

const http = require("http")

const linkPort = 11111
const httpserver = http.createServer()

const wserver = new ws.Server({ server: httpserver })
wserver.on('connection', (conn) => {
    //send feedback to the incoming connection
    const remoteAddr = conn._socket.remoteAddress
    console.log(`client connected ${remoteAddr}`)
    conn.send('{ "connection" : "ok"}');

    conn.on('message', (message) => {
        console.log(message);
    });
    conn.on('close', (code, reason) => {
        console.log(`connection from ${remoteAddr} closed. ${reason} code:${code}`);
    });
    conn.on("error", console.error)
});

httpserver.listen(linkPort)



// if (process.argv.includes('skip')) {
//     console.warn("Skipping discovery")
//     startLinkComm({
//         IP: '192.168.0.4',
//         LINK_PORT: 7008
//     })
// }
// if (process.argv.includes('flood')) {
//     console.warn("UDP flood")
//     setInterval(doDiscovery, 100)
// }
// else {
//     const disc = require('./discovery')

//     doDiscovery(startLinkComm)
// }

