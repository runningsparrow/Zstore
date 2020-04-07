const Sequelize = require('sequelize');
const seq = require('../utils/requelize')

const sysplex_box = seq.define(
    'sysplex_box',
    {
        sysplex_boxid: {
            type: Sequelize.INTEGER,
        },
        sysplex: {
            type: Sequelize.STRING,
        },
        sysplex_diskbox: {
            type: Sequelize.STRING,
        },
        sysplex_appl: {
            type: Sequelize.STRING,
        },
        sysplex_total_G: {
            type: Sequelize.FLOAT,
        },
        sysplex_used_G: {
            type: Sequelize.FLOAT,
        },
        sysplex_free_G: {
            type: Sequelize.FLOAT,
        },
        sysplex_box_m1_total: {
            type: Sequelize.INTEGER,
        },
        sysplex_box_m1_used: {
            type: Sequelize.INTEGER,
        },
        sysplex_box_m1_free: {
            type: Sequelize.INTEGER,
        },
        sysplex_box_m3_total: {
            type: Sequelize.INTEGER,
        },
        sysplex_box_m3_used: {
            type: Sequelize.INTEGER,
        },
        sysplex_box_m3_free: {
            type: Sequelize.INTEGER,
        },
        sysplex_box_m9_total: {
            type: Sequelize.INTEGER,
        },
        sysplex_box_m9_used: {
            type: Sequelize.INTEGER,
        },
        sysplex_box_m9_free: {
            type: Sequelize.INTEGER,
        },
        sysplex_box_m27_total: {
            type: Sequelize.INTEGER,
        },
        sysplex_box_m27_used: {
            type: Sequelize.INTEGER,
        },
        sysplex_box_m27_free: {
            type: Sequelize.INTEGER,
        },
        sysplex_box_m54_total: {
            type: Sequelize.INTEGER,
        },
        sysplex_box_m54_used: {
            type: Sequelize.INTEGER,
        },
        sysplex_box_m54_free: {
            type: Sequelize.INTEGER,
        },
        rmrk:{
            type: Sequelize.TEXT
        }
    }
)

module.exports = sysplex_box