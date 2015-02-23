'use strict'

var dataTypes = [
	'boolean',
	'number',
	'string',
	'date',
	'fields',
	'enum'
]

// valid enums are arrays of strings
var enumContainsErrors = function(obj) {
	if (!obj || obj.constructor !== Array) {
		return 'enum types must contain an "enum" key that is an array'
	}
	var enumKeys = []
	var error = false
	obj.forEach(function(element) {
		if (typeof element !== 'string') {
			error = 'the "enum" array must be only strings'
		} else if (enumKeys.indexOf(element) !== -1) {
			error = 'all enum values must be unique'
		}
		enumKeys.push(element)
	})
	return error
}

var fieldListContainsErrors = function(fieldList) {
	var listOfFieldLabels = []
	var error = false
	fieldList.forEach(function(field) {
		if (!field || field.constructor !== Object) {
			error = 'every field must be an object'
		} else if (typeof field.required !== 'boolean') {
			error = 'every field must have a "required" boolean key'
		} else if (typeof field.label !== 'string') {
			error = 'every field must have a "label" string key'
		} else if (listOfFieldLabels.indexOf(field.label) !== -1) {
			error = 'every label in a list of fields must be unique'
		} else if (dataTypes.indexOf(field.type) < 0) {
			error = 'every field must contain a "type" key containing a string of the allowed data type'
		} else if (field.type === 'enum') {
			if (!error) {
				error = enumContainsErrors(field.enum)
			}
		} else if (field.type === 'fields') {
			if (!error) {
				error = fieldListContainsErrors(field.fields)
			}
		}
		listOfFieldLabels.push(field.label)
	})
	return error
}

module.exports = function ContainsErrors(schema) {
	if (!schema || schema.constructor !== Object) {
		return 'schemas must be an object'
	}
	if (typeof schema.type !== 'string' || schema.type.length < 1) {
		return 'schema must have a root type, ideally unique among all relayreader schemas'
	}
	if (typeof schema.label !== 'string' || schema.type.length < 1) {
		return 'schema must have a label, briefly describe the schema'
	}
	if (!schema.data || schema.data.constructor !== Array || schema.type.length < 1) {
		return 'schema data is a list of fields'
	}
	return fieldListContainsErrors(schema.data)
}
