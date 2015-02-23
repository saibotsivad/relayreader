'use strict'

var test = require("tap").test
var containsErrors = require('./index.js')

test("correct schemas pass", function (t) {
	t.notOk(containsErrors({
		"type": "relayreader-schema",
		"label": "stores data",
		"data": [
			{
				required: true,
				label: "label",
				type: "string"
			}
	]}), "generic schema returns no errors")

	t.notOk(containsErrors({
		"type": "relayreader-schema",
		"label": "stores data",
		"data": [
			{
				required: true,
				label: "some enum",
				type: "enum",
				enum: [
					"thing1",
					"thing2",
				]
			}
	]}), "schema with generic enums return no errors")

	t.notOk(containsErrors({
		"type": "relayreader-schema",
		"label": "stores data",
		"data": [
			{
				required: true,
				label: "label",
				type: "fields",
				fields: [
					{
						required: true,
						label: "label1",
						type: "string"
					},{
						required: true,
						label: "label2",
						type: "string"
					}
				]
			}
	]}), "schema with generic child fields returns no errors")

	t.notOk(containsErrors({
		"type": "relayreader-schema",
		"label": "stores data",
		"data": [
			{
				required: true,
				label: "label",
				type: "fields",
				fields: [
					{
						required: true,
						label: "label",
						type: "string"
					}
				]
			}
	]}), "child field with same label as parent returns no error")

	t.end()
})

test("incorrect schemas fail", function (t) {
	t.ok(containsErrors({
		"label": "stores data",
		"data": [
			{
				required: true,
				label: "label",
				type: "string"
			}
	]}), "schema without root 'type' returns error")

	t.ok(containsErrors({
		"type": "relayreader-schema",
		"data": [
			{
				required: true,
				label: "label",
				type: "string"
			}
	]}), "schema without root 'label' returns error")

	t.ok(containsErrors({
		"type": "relayreader-schema",
		"label": "stores data"
	}), "schema without root 'data' returns error")

	t.ok(containsErrors({
		"type": "relayreader-schema",
		"label": "stores data",
		"data": [
			{
				label: "label",
				type: "string"
			}
	]}), "field without 'required' returns error")

	t.ok(containsErrors({
		"type": "relayreader-schema",
		"label": "stores data",
		"data": [
			{
				required: true,
				type: "string"
			}
	]}), "field without 'label' returns error")

	t.ok(containsErrors({
		"type": "relayreader-schema",
		"label": "stores data",
		"data": [
			{
				required: true,
				label: "label"
			}
	]}), "field without 'type' returns error")

	t.ok(containsErrors({
		"type": "relayreader-schema",
		"label": "stores data",
		"data": [
			{
				required: "true",
				label: "label",
				type: "string"
			}
	]}), "non-boolean 'required' returns error")

	t.ok(containsErrors({
		"type": "relayreader-schema",
		"label": "stores data",
		"data": [
			{
				required: true,
				label: "label",
				type: "string"
			},{
				required: true,
				label: "label",
				type: "number"
			}
	]}), "field with non-unique labels returns errors")

	t.ok(containsErrors({
		"type": "relayreader-schema",
		"label": "stores data",
		"data": [
			{
				required: true,
				label: "label",
				type: "enum",
				enum: [
					"thing",
					"thing"
				]
			}
	]}), "field with non-unique enums returns errors")

	t.ok(containsErrors({
		"type": "relayreader-schema",
		"label": "stores data",
		"data": [
			{
				required: true,
				label: "some enum",
				type: "fields",
				fields: [
					{
						required: true,
						label: "label",
						type: "string"
					},{
						required: true,
						label: "label",
						type: "string"
					}
				]
			}
	]}), "child fields with same label returns error")

	t.end()
})
