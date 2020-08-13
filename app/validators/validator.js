const { LinValidator, Rule } = require('../../core/lin-validator-v2');
const {User} = require('../models/user');

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isInt', '需要是正整数', { min: 1 })
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super();
        this.email = [
            new Rule('isEmail', '请填写正确的Email格式')
        ];
        this.password1 = [
            new Rule('isLength', '密码至少6个字符，最多32个字符', {
                min: 6,
                max: 32
            }),
            new Rule('matches', '密码6-32位，必须同时包含数字，小写字母和大写字母。', '(?!^[a-zA-Z]+$)(?!^[0-9]+$)(?!^[a-z0-9]+$)(?!^[A-Z0-9]+$)^[a-zA-Z0-9]{6,32}$')
        ];
        this.password2=this.password1;
        this.nickname=[
            new Rule('isLength', '昵称不符合长度规范', {
                min: 4,
                max: 32
            })
        ]
    }

    validatePassword(vals){
        const psw1=vals.body.password1;
        const psw2=vals.body.password2;
        if(psw1!==psw2){
            throw new Error('两次输入的密码不一致');
        }
    }

    async validateEmail(vals){
        const email=vals.body.email;
        const user=await User.findOne({
            where:{
                email:email
            }
        })
        if(user){
            throw new Error('邮箱已被注册');
        }
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator
}