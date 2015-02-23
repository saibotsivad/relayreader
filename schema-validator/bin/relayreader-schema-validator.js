#!/usr/bin/env node

if (process.argv.length !== 3)
	throw new Error('expected in "scripts": { "test": "relayreader-schema-validator schema.json" }')

var test = require("tap").test
var containsErrors = require('./../index.js')
var schema = require(process.env.PWD + '/' + process.argv[2])

test("the document is a valid relayreader schema", function(t) {
	t.notOk(containsErrors(schema), "the schema contains no errors")
	t.end()
})
