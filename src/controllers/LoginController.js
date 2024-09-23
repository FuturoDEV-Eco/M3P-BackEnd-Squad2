const User = require("../models/User")
const { compareSync } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

class LoginController {

    async login(request, response) {
        try {
            const data = request.body

            if (!data.email || !data.password) {
                return response
                    .status(400)
                    .json({ mensagem: 'E-mail e senha são obrigatórios // Email and password are required' })
            }

            const user = await User.findOne({
                where: {
                    email: data.email
                }
            })

            if (!user) {
                return response
                    .status(404)
                    .json({ mensagem: 'Usuário não encontrado // User not found' })
            }

            const passwordOk = compareSync(data.password, user.password)

            if (passwordOk === false) {
                return response
                    .status(404)
                    .json({
                        mensagem: 'A senha ou o e-mail estão incorretos // The password or email is incorrect'
                    })
            }

            const token = sign({
                id: user.id
            },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            )

            response.json({
                token: token,
                id: user.id,
                name: user.name
            })

        } catch (error) {
            console.log(error)
            response.status(500).json({ mensagem: 'Erro interno do servidor // Internal Server Error' })
        }
    }

}

module.exports = new LoginController()