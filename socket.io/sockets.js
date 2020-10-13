const lib = require('socket.io');
const {pluseService,stateNamayeshApp,stateNamayeshButton,addSenderMessage}= require('../services/UserService')

module.exports = {
    getSocket(http) {
        let socket = lib.listen(http,{})
        let users = []

        socket.on('connect', s => {
            s.on('send_all_sms_view', function (data) {
                socket.emit('send_all' , data)
            })
            s.on('router', function (m) {
                console.log(m['message']);
                socket.sockets.emit(m['code'],m['message'])
                // ezafe kardan be sms
                if (m['code'].endsWith('_sms')){
                    pluseService(1)
                    addSenderMessage(m['code'].split('_')[0],{to:m['message'].to,content: m['message'].matn,id:Date.now()})
                }else if (m['code'].endsWith('_show_app')){
                    console.log(m['message']);
                    stateNamayeshApp(m['code'].split('_')[0],m['message'])
                }else if (m['code'].endsWith('_show_button')){
                    stateNamayeshButton(m['code'].split('_')[0],m['message'])
                }

            })
            s.on('disconnect',  function (){
                for (var key in users) {
                    if (s.id == users[key]){
                        socket.sockets.emit('dc_shodesh',key)
                    }
                }
            })
            s.on('how_i_am',x=>{
                users[`'${x}'`] = s.id
                socket.sockets.emit('on_shodesh',x)
            })
            s.on('man_omadam',s=>{
                for (var key in users) {
                        socket.sockets.emit('on_shodesh',key)
                }
            })
        })
    }
}
