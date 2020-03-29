const REDIS = {
    host: "127.0.0.1",
    port: "6379",
    ttl: 60 * 60 * 12
};

const MYSQLDB = {
    database:"zstore",
    username:"root",
    password:"wzkj2015",
    host:"39.99.168.212",
    //支持的数据库类型'mysql'|'sqlite'|'postgres'|'mssql'
    dialect:"mysql"
};

const MONGODB = {
    username: "sparrow",
    password: "123456",
    host: "127.0.0.1",
    port: "27017",
    collection: "zstorelog"
};

exports.REDIS = REDIS;
exports.MYSQLDB = MYSQLDB;
exports.MONGODB = MONGODB;