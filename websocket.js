var ws;
var message;
var result = document.getElementById("result");
var inputBox = document.getElementById("message");

function makeNewResult(content) {
  let p = document.createElement("p");
  p.innerHTML = content;
  result.append(p);
}

function getMessage() {
  message = inputBox.value;
  clearInputBox();
  return message;
}

function sendMessage() {
  if (!inputBox.value || !ws) {
    return;
  }
  ws.send(getMessage());
  makeNewResult(`Message is sent : ${message}`);
}

function getState() {
  return ws.readyState;
}

function printSocketState() {
  makeNewResult(`websocket state is : ${getState()}`);
}

function clearInputBox() {
  inputBox.value = "";
}

function startWebSocket() {
  if (typeof WebSocket !== "undefined") {
    if (ws === undefined) {
      makeNewResult("WebSocket is supported by your Browser!");
      ws = new WebSocket("wss://echo.websocket.org/");
    } else {
      makeNewResult("Socket already started!");
      clearInputBox();
      return;
    }
    ws.onopen = function () {
      makeNewResult("Socket is started!");
    };
    ws.onmessage = function (evt) {
      var received_msg = evt.data;
      makeNewResult(`Message is received : ${received_msg}`);
    };
    ws.onerror = function () {
      makeNewResult("error happende. closing the socket...");
      ws.close();
    };
    ws.onclose = function () {
      makeNewResult("Connection is closed...");
    };
  } else {
    makeNewResult("WebSocket NOT supported by your Browser!");
  }
}

function stopWebSocket() {
  if (getState() === ws.CLOSED) {
    makeNewResult("There is no web socket running!");
    return;
  }
  ws.close();
  ws = undefined;
  clearInputBox();
}
