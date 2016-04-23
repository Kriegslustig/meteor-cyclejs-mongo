// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by cyclejs-mongo.js.
import { name as packageName } from "meteor/cyclejs-mongo";

// Write your tests here!
// Here is an example.
Tinytest.add('cyclejs-mongo - example', function (test) {
  test.equal(packageName, "cyclejs-mongo");
});
