import { Mongo } from 'meteor/mongo'
import { Tinytest } from 'meteor/tinytest'

import { createCollection, _collection } from 'meteor/kriegslustig:cyclejs-mongo'

Tinytest.add('cyclejs-mongo - createCollection', (test) => {
  const testColl = createCollection('test')
  test.isTrue(Mongo.Collection.prototype.isPrototypeOf(testColl.collection))
  test.isTrue(_collection.isPrototypeOf(testColl))
})

