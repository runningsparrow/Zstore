const Sequelize = require('sequelize');
const seq = require('../utils/requelize')

const diskaddr = seq.define(
    'diskaddr',
    {
        diskaddrid: {
            type: Sequelize.INTEGER,
        },
        //地址
        diskaddraddr: {
            type: Sequelize.STRING,
        },
        //卷名
        diskaddrlabel: {
            type: Sequelize.STRING,
        },
        //TYPE
        diskaddrtype: {
            type: Sequelize.STRING,
        },
        //PLEX
        diskaddrsg: {
            type: Sequelize.STRING,
        },
        diskaddrcu: {
            type: Sequelize.STRING,
        },
        diskaddraddrzvm: {
            type: Sequelize.STRING,
        },
        diskaddruse: {
            type: Sequelize.STRING,
        },
        diskaddrenv: {
            type: Sequelize.STRING,
        },
        diskaddrbox: {
            type: Sequelize.STRING,
        },
        rmrk:{
            type: Sequelize.TEXT
        }
    }
)

module.exports = diskaddr