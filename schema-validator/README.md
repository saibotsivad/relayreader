The relayreader validator is a simple validation function that is used to
make sure your relayreader schema is a valid relayreader document.

In general you'll implement a schema by creating the three files:

* `readme.md` explain your schema in as clear a manner as possible
* `package.json` the normal package definitions
* `schema.json` the schema definition object

You'd use this validator module by running

	npm install relayreader-schema-validator --dev-save

Which will install this validator module as a dev dependency. Then, inside
your `package.json` put this as the scripts:

	"scripts": {
		"test": "relayreader-schema-validator schema.json"
	}

This means that when you run `npm test` in your directory, node will
run the `schema.json` file through the validator, which will verify
that your schema definition conforms to all requirements.

For examples, see the [phone][phone] schema, and any other default
schemas included in the relayreader project.

[phone]: https://github.com/tobiaslabs/relayreader-schema-phone/
