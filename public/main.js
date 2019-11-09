// let Peer = require('simple-peer')
// let socket = io()
// const video = document.querySelector('video')
// let client = {}
// //get stream
// navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//     .then(stream => {
//         socket.emit('NewClient')
//         video.srcObject = stream
//         video.play()

//         //used to initialize a peer
//         function InitPeer(type) {
//             let peer = new Peer({ initiator: (type == 'init') ? true : false, stream: stream, trickle: false })
//             peer.on('stream', function (stream) {
//                 CreateVideo(stream)
//             })
//             peer.on('data', function (data) {
//                 let peervideo = document.querySelector('#peerVideo')
//             })
//             return peer
//         }

//         //for peer of type init
//         function MakePeer() {
//             client.gotAnswer = false
//             let peer = InitPeer('init')
//             peer.on('signal', function (data) {
//                 if (!client.gotAnswer) {
//                     socket.emit('Offer', data)
//                 }
//             })
//             client.peer = peer
//         }

//         //for peer of type not init
//         function FrontAnswer(offer) {
//             let peer = InitPeer('notInit')
//             peer.on('signal', (data) => {
//                 socket.emit('Answer', data)
//             })
//             peer.signal(offer)
//             client.peer = peer
//         }

//         function SignalAnswer(answer) {
//             client.gotAnswer = true
//             let peer = client.peer
//             peer.signal(answer)
//         }

//         function CreateVideo(stream) {
//             CreateDiv()

//             let video = document.createElement('video')
//             toggleSmith(false)
//             video.id = 'peerVideo'
//             video.srcObject = stream
//             video.setAttribute('class', 'embed-responsive-item')
//             document.querySelector('#peerDiv').appendChild(video)
//             video.play()

//             video.addEventListener('click', () => {
//                 if (video.volume != 0)
//                     video.volume = 0
//                 else
//                     video.volume = 1
//             })

//         }

//         function SessionActive() {
//             document.write('Session Active. Please come back later')
//         }

//         function RemovePeer() {
//             document.getElementById("peerVideo").remove();
//             document.getElementById("muteText").remove();
//             toggleSmith(true);
//             if (client.peer) {
//                 client.peer.destroy()
//             }
//         }

//         function toggleSmith(state) {
//             let x = document.getElementById('smith')
//             if (state) {
//                 x.style.display = "block";
//             } else {
//               x.style.display = "none";
//             }
//         }

//         socket.on('BackOffer', FrontAnswer)
//         socket.on('BackAnswer', SignalAnswer)
//         socket.on('SessionActive', SessionActive)
//         socket.on('CreatePeer', MakePeer)
//         socket.on('Disconnect', RemovePeer)

//     })
//     .catch(err => document.write(err))


// function CreateDiv() {
//     let div = document.createElement('div')
//     div.setAttribute('class', "centered")
//     div.id = "muteText"
//     div.innerHTML = "Click to Mute/Unmute"
//     document.querySelector('#peerDiv').appendChild(div)
// }


let Peer = require('simple-peer')
let socket = io()
const video = document.querySelector('video')
let client = {}
//get stream
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        socket.emit('NewClient')
        video.srcObject = stream
        video.play()

        //used to initialize a peer
        function InitPeer(type) {
            let peer = new Peer({ initiator: (type == 'init') ? true : false, stream: stream, trickle: false })
            peer.on('stream', function (stream) {
                CreateVideo(stream)
            })
            peer.on('data', function (data) {
                let peervideo = document.querySelector('#peerVideo')
            })
            return peer
        }

        //for peer of type init
        function MakePeer() {
            client.gotAnswer = false
            let peer = InitPeer('init')
            peer.on('signal', function (data) {
                if (!client.gotAnswer) {
                    socket.emit('Offer', data)
                }
            })
            client.peer = peer
        }

        //for peer of type not init
        function FrontAnswer(offer) {
            let peer = InitPeer('notInit')
            peer.on('signal', (data) => {
                socket.emit('Answer', data)
            })
            peer.signal(offer)
            client.peer = peer
        }

        function SignalAnswer(answer) {
            client.gotAnswer = true
            let peer = client.peer
            peer.signal(answer)
        }

        function CreateVideo(stream) {
            CreateDiv()

            let video = document.createElement('video')
            toggleSmith(false)
            video.id = 'peerVideo'
            video.srcObject = stream
            video.setAttribute('class', 'embed-responsive-item')
            document.querySelector('#peerDiv').appendChild(video)
            video.play()

            video.addEventListener('click', () => {
                if (video.volume != 0)
                    video.volume = 0
                else
                    video.volume = 1
            })

        }

        function SessionActive() {
            document.write('Session Active. Please come back later')
        }

        function RemovePeer() {
            document.getElementById("peerVideo").remove();
            document.getElementById("muteText").remove();
            toggleSmith(true);
            if (client.peer) {
                client.peer.destroy()
            }
        }

        function toggleSmith(state) {
            let x = document.getElementById('smith')
            if (state) {
                x.style.display = "block";
            } else {
              x.style.display = "none";
            }
        }

        socket.on('BackOffer', FrontAnswer)
        socket.on('BackAnswer', SignalAnswer)
        socket.on('SessionActive', SessionActive)
        socket.on('CreatePeer', MakePeer)
        socket.on('Disconnect', RemovePeer)

    })
    .catch(err => document.write(err))


function CreateDiv() {
    let div = document.createElement('div')
    div.setAttribute('class', "centered")
    div.id = "muteText"
    div.innerHTML = "Click to Mute/Unmute"
    document.querySelector('#peerDiv').appendChild(div)
}