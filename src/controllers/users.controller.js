const { User } = require('../models/users.model')


class UsersController {


    static async checkUser(req, res) {
        await User
            .findOne({ email: req.email })
            .then(function (doc) {
                if (doc.password == this.hash(req.password)) {
                    console.log("User password is ok");
                    return Promise.resolve(doc)
                } else {
                    return Promise.reject("Error wrong")
                }
            })
      

    }

    static async hash(text) {
        return crypto.createHash('sha1')
            .update(text).digest('base64')
    }

    static async getAll(req, res) {
        const info = await User.find()
        return info

    }
    static async getOne(req, res) {
        const info = await User.findById(req.params.id,)
        return info
    }
    static async create(req, res) {
        const info = await User.create(req.body)
        return info
    }
    static async update(req, res) {
        const info = await User.findByIdAndUpdate((req.params.id, req.body))
        return info
    }
    static async remove(req, res) {
        const info = await User.findByIdAndRemove(req.params.id)
        return info
    }
}


module.exports = UsersController