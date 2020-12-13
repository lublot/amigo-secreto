const mongo = require('mongodb').MongoClient;

exports.handler = async function (event, context) {
  try {
    const client = await mongo.connect(process.env.DB_CONNECTION_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    const db = client.db(process.env.DB_NAME)
    const profile = db.collection('profiles')
    const result = await profile.find({
      name: {
        $regex: new RegExp(`${event.queryStringParameters.name}.*`, 'i')
      }
    }).project({
      hashCode: 0,
      choosedBy: 0
    }).toArray()
    console.log(result)
    return { statusCode: 200, body: JSON.stringify({ data: result }) };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false })
    }
  }  
}