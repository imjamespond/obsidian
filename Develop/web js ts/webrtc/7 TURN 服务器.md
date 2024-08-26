
对于大多数 WebRTC 应用，服务器在服务器之间中继流量时需要使用服务器，因为在客户端之间通常无法实现直接套接字（除非这些客户端位于同一本地网络）。解决此问题的常用方法是使用 TURN 服务器。该术语代表==在 NAT 中使用中继的遍历==，是一种用于中继网络流量的协议。

目前能够以多种方式在线使用 TURN 服务器，既可以作为自托管的应用（如开源 COTURN 项目），也可以是作为云提供的服务。

有了可在线提供的 TURN 服务器后，您只需提供正确的 `RTCConfiguration`，以供客户端应用使用。以下代码段展示了 `RTCPeerConnection` 的示例配置，其中 TURN 服务器的主机名为 `my-turn-server.mycompany.com`，并且端口 `19403`。该配置对象还支持 `username` 和 `credential` 属性，用于保护对服务器的访问。连接到 TURN 服务器时，必须设置这些。

```js
const iceConfiguration = {
    iceServers: [
        {
            urls: 'turn:my-turn-server.mycompany.com:19403',
            username: 'optional-username',
            credential: 'auth-token'
        }
    ]
}

const peerConnection = new RTCPeerConnection(iceConfiguration);
```