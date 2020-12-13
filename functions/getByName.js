const mongo = require('mongodb').MongoClient;

exports.handler = function (event, context, callback) {
  mongo.connect(process.env.DB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then((client) => {
    const db = client.db(process.env.DB_NAME)
    const profile = db.collection('profiles')
    profile.find({
      name: {
        $regex: new RegExp(`${event.queryStringParameters.name}.*`, 'i')
      }
    }).project({
      hashCode: 0,
      choosedBy: 0
    }).toArray(function (err, result) {
        if (err) {
          callback(null, { statusCode: 500, body: JSON.stringify({ success: false }) });
        }
        callback(null, { statusCode: 200, body: JSON.stringify({ data: result }) });
    })
  }).catch(() => {
    callback(null, { statusCode: 500, body: JSON.stringify({ success: false }) });
  });
  
}