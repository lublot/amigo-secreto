const mongo = require('mongodb').MongoClient;

exports.handler = function (event, context, callback) {
  mongo.connect(process.env.DB_CONNECTION_STRING, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((client) => {
    const db = client.db(process.env.DB_NAME)
    const profile = db.collection('profiles')
    profile.count({
      email: event.queryStringParameters.email,
      hashCode: event.queryStringParameters.hashCode
    }).then((res) => {
      callback(null, { statusCode: 200, body: JSON.stringify({ isCorrect: res > 0 }) });
    }).catch(() => {
      callback(null, { statusCode: 500, body: JSON.stringify({ success: false }) });
    })
  }).catch(() => {
    callback(null, { statusCode: 500, body: JSON.stringify({ success: false }) });
  })
;
}