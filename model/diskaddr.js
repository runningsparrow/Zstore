const Sequelize = require('sequelize');
const seq = require('../utils/requelize')

const diskaddr = seq.define(
    'diskaddr',
    {
        diskaddrid: {
            type: Sequelize.INTEGER,
        },
        diskaddraddr: {
            type: Sequelize.STRING,
        },
        diskaddrlabel: {
            type: Sequelize.STRING,
        },
        diskaddrtype: {
            type: Sequelize.STRING,
        },
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
        rmrk:{
            type: Sequelize.TEXT
        }
    }
)

module.exports = diskaddr