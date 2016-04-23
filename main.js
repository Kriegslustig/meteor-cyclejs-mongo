import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Tracker } from 'meteor/tracker'

import Rx from 'rx'

export const makeMongoDriver = (...collectionsArr) => {
  const collections = collectionsArr.reduce((m, c) => {
    if (!collection.isPrototypeOf(c)) throw Meteor.Error('Use the cyclejs-mongo createCollection function to create collections')
    m[c.collection._name] = c.collection
    return m
  }, {})
  return (mongoRequests$) => {
    mongoRequests$.subscribe((req) => {
      const ck = req.collection || req.c || req[0]
      const c = collections[ck]
      if (!c) throw new Meteor.Error(`Undefined collection ${ck}`)
      const ak = req.action || req.a || req[1]
      if (!c[ak]) throw new Meteor.Error(`No such action ${ak}`)
      const args = req.arguments || req.args || req.slice(2)
      Array.prototype.isPrototypeOf(args)
        ? c[ak](...args)
        : c[ak](args)
    })
  }
}

export const createCollection = (name) => {
  const c = Object.create(collection)
  c.collection = new Mongo.Collection(name)
  return c
}

const observableFromReactiveFn = (fn, ...args) =>
  Rx.Observable.create((observer) => {
    Tracker.autorun(() => {
      observer.onNext(fn(...args))
    })
    return () => {}
  })

const collection = {
  find (...args) {
    return observableFromReactiveFn(() =>
      this.collection(...args).fetch()
    )
  },
  findOne (...args) {
    return observableFromReactiveFn(() => this.collection.findOne(...args))
  }
}

