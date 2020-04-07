const Sequelize = require('sequelize');
const seq = require('../utils/requelize')

const diskbox = seq.define(
    'diskbox',
    {
        diskboxid: {
            type: Sequelize.INTEGER,
        },
        disk_m1_total: {
            type: Sequelize.INTEGER,
        },
        disk_m1_used: {
            type: Sequelize.INTEGER,
        },
        disk_m1_free: {
            type: Sequelize.INTEGER,
        },
        disk_m3_total: {
            type: Sequelize.INTEGER,
        },
        disk_m3_used: {
            type: Sequelize.INTEGER,
        },
        disk_m3_free: {
            type: Sequelize.INTEGER,
        },
        disk_m9_total: {
            type: Sequelize.INTEGER,
        },
        disk_m9_used: {
            type: Sequelize.INTEGER,
        },
        disk_m9_free: {
            type: Sequelize.INTEGER,
        },
        disk_m27_total: {
            type: Sequelize.INTEGER,
        },
        disk_m27_used: {
            type: Sequelize.INTEGER,
        },
        disk_m27_free: {
            type: Sequelize.INTEGER,
        },
        disk_m54_total: {
            type: Sequelize.INTEGER,
        },
        disk_m54_used: {
            type: Sequelize.INTEGER,
        },
        disk_m54_free: {
            type: Sequelize.INTEGER,
        },
        disk_total: {
            type: Sequelize.INTEGER,
        },
        disk_used: {
            type: Sequelize.INTEGER,
        },
        disk_free: {
            type: Sequelize.INTEGER,
        },
        disk_total_G: {
            type: Sequelize.FLOAT,
        },
        disk_used_G: {
            type: Sequelize.FLOAT,
        },
        rmrk:{
            type: Sequelize.TEXT
        }
    }
)

module.exports = diskbox