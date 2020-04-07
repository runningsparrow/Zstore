const Sequelize = require('sequelize');
const seq = require('../utils/requelize')

const disktype = seq.define(
    'disktype',
    {
        storetypeid: {
            type: Sequelize.INTEGER,
        },
        storagetype:{
            type: Sequelize.STRING(12)
        },
        storeamount:{
            type: Sequelize.FLOAT
        },
        rmrk:{
            type: Sequelize.TEXT
        },
        createtime:{
            type: Sequelize.DATE
        },
        updatetime:{
            type: Sequelize.DATE
        }
    }
)

module.exports = disktype