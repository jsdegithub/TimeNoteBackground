module.exports = {
    environment: 'dev',
    database: {
        dbName: 'timenote',
        host:'localhost',
        port:3306,
        user:'root',
        password:'root'
    },
    security:{
        secretKey:"abcdefg",
        expiresIn:60*60*24*30
    },
    wx:{
        appId:'wx3153c1770acc157a',
        appSecret:'0aafe52c813d4c6fc6e22f27cbbac3a6',
        loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}