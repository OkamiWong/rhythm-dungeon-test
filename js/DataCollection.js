var ws = new WebSocket("wss://welovegame.club:4200");

ws.onopen = function () {
    ws.send("rd");
    ws.send(navigator.userAgent);
}

window.addEventListener("unload", function (ev) { ws.close(); })