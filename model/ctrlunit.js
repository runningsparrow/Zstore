const Sequelize = require('sequelize');
const seq = require('../utils/requelize')

const ctrlunit = seq.define(
    'ctrlunit',
    {
        ctrlunitid: {
            type: Sequelize.INTEGER,
        },
        ctrlunitcuid: {
            type: Sequelize.STRING,
        },
        ctrlunitaddr: {
            type: Sequelize.STRING,
        },
        ctrlunit_m1_total: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_m1_used: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_m1_free: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_m3_total: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_m3_used: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_m3_free: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_m9_total: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_m9_used: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_m9_free: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_m27_total: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_m27_used: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_m27_free: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_m54_total: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_m54_used: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_m54_free: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_total: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_used: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_free: {
            type: Sequelize.INTEGER,
        },
        ctrlunit_total_G: {
            type: Sequelize.FLOAT,
        },
        ctrlunit_used_G: {
            type: Sequelize.FLOAT,
        },
        ctrlunit_ratio: {
            type: Sequelize.FLOAT,
        },
        ctrlunit_stauts: {
            type: Sequelize.STRING,
        },
        ctrlunit_diskbox: {
            type: Sequelize.STRING,
        },
        rmrk:{
            type: Sequelize.TEXT
        }
    }
)

module.exports = ctrlunit