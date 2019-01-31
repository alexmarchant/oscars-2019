

// const host = document.location.host.match('localhost') ? document.location.host : 'api.oscars.alexmarchant.com'
// const host = 'api.oscars.alexmarchant.com'
//
// const conn = new WebSocket("ws://" + host + "/ws/winners");
//
// function setupListeners(conn) {
//
//   conn.onclose = (event) => {
//     console.log('Connection lost')
//   }
//
//   conn.onmessage = (event) => {
//     const message = JSON.parse(event.data)
//     console.log('Message received', message)
//     switch (message.type) {
//       case 'winners':
//         document.getElementById('winners').innerHTML = JSON.stringify(message.winners, null, 2)
//         break
//       case 'error':
//         alert(message.error)
//         break
//     }
//   }
// }
//
// export const webSocket = {
//   host,
//   conn,
//   setupListeners
// }
