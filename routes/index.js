import express from 'express';
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017/sampleDB';

router.get('/', (req, res, next) => {
  MongoClient.connect(dbURL, (err, db) => {
    if (err) {
      return res.send(err);
    }

    const sampleDBCollection = db.collection('aroe');
    sampleDBCollection.find({}).limit(40).toArray((err, docs) => {
      db.close();
      res.render('index', { docs: docs });
    });
  });
});

module.exports = router;
