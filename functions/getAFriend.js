const mongo = require('mongodb').MongoClient;

function sha1(email) {
  var crypto = require('crypto');
  var shasum = crypto.createHash('sha1');
  shasum.update(email);
  return shasum.digest('hex');
}

exports.handler = async function(event) {
  try {
    const client = await mongo.connect(process.env.DB_CONNECTION_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const db = client.db(process.env.DB_NAME);
    const profile = db.collection('profiles');
    const requesterEmail = event.queryStringParameters.email;

    const result = await profile
      .aggregate(
        {
          $facet: {
            wasPicked: [{ $match: { pickedBy: sha1(requesterEmail) } }],
            wasNotPicked: [
              { $match: { pickedBy: null, email: { $ne: requesterEmail } } },
            ],
          },
        },
        {
          $project: {
            result: {
              $cond: {
                if: {
                  $gt: [{ $size: '$wasPicked' }, 0],
                },
                then: '$wasPicked',
                else: '$wasNotPicked',
              },
            },
          },
        },
        { $unwind: '$result' },
        { $sample: { size: 1 } }
      )
      .toArray();
    if (result.length > 0) {
      const picked = result.pop().result;
      await profile.updateOne(
        { email: picked.email },
        {
          $set: { pickedBy: sha1(requesterEmail) },
        },
        { upsert: false }
      );
      return { statusCode: 200, body: JSON.stringify({ data: picked }) };
    } else {
      return { statusCode: 500, body: JSON.stringify({ data: [] }) };
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ success: false }) };
  }
};
