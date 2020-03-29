const mongoose = require('../utils/mongo')

const zstorelogSchema = require('../schema/zstorelogSchema')


const zstorelogModel = mongoose.model('zstorelog', zstorelogSchema);

module.exports = zstorelogModel
