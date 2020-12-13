const mongo = require('mongodb').MongoClient;

exports.handler = async function (event) {
  try {
    const client = await mongo.connect(process.env.DB_CONNECTION_STRING, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const db = client.db(process.env.DB_NAME)
    const profile = db.collection('profiles')
    const count = await profile.count({
      email: event.queryStringParameters.email,
      hashCode: event.queryStringParameters.hashCode
    })
    return { statusCode: 200, body: JSON.stringify({ isCorrect: count > 0 }) }
  } catch (error) {
    console.log(error)
    return { statusCode: 500, body: JSON.stringify({ success: false }) }
  }
}