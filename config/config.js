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
    }
}