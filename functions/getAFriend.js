const mongo = require('mongodb').MongoClient;

function sha1 (email) {
  var crypto = require('crypto')
  var shasum = crypto.createHash('sha1')
  shasum.update(email)
  return shasum.digest('hex')
}

exports.handler = function (event, context, callback) {
  function throwError () {
    callback(null, { statusCode: 500, body: JSON.stringify({ success: false }) });
  }
  mongo.connect(process.env.DB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then((client) => {
    const db = client.db(process.env.DB_NAME)
    const profile = db.collection('profiles')
    const requesterEmail = event.queryStringParameters.email
    profile.aggregate(
      {
        $facet: {
          wasPicked: [ 
            { $match: { pickedBy: sha1(requesterEmail) } }
          ],
          wasNotPicked: [
            { $match: { pickedBy: null, email: { $ne: requesterEmail } } }
          ]
        },
      },
      {
        $project: {
          result: { 
            $cond: {
              if: {
                $gt: [{ $size: "$wasPicked" }, 0]
              },
              then: "$wasPicked",
              else: '$wasNotPicked'
            }
          }
        }
      },
      { $unwind: "$result" },
      { $sample: { size: 1 } },
    ).toArray((err, res) => {
      if (err || !res || !(res instanceof Array) || res.length == 0) {
        throwError();
      }
      const picked = res.pop().result
        profile.updateOne({
          email: picked.email
        }, {
          $set: {
            pickedBy: sha1(requesterEmail)
          }
        }, {
          upsert: false
        }).then(() => {
          callback(null, { statusCode: 200, body: JSON.stringify({ data: picked })})
        }).catch(() => {
          throwError();
        })
    })
  }).catch(() => {
    throwError();
  });
  
}