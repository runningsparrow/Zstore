//zstorelog maintain log

const mongoose = require('../utils/mongo')

const Schema = mongoose.Schema

const zstorelogSchema = new Schema(
    {
        logid: {
            type: Number
        },
        logdate: {
            type: String
        },
        loguser: {
            type: String
        },
        logsystem: {
            type: String
        },
        logdisk: {
            type: String
        },
        logapplyuser: {
            type: String
        },
        logtimestamp: {
            type: Date, 
            default: Date.now
        },
    }
)

module.exports = zstorelogSchema