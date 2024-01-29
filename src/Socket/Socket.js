import io from "socket.io-client";
const socket = io("https://performance-moniter.onrender.com",{
    auth:{
        token:"react",
    }
})

export default socket;