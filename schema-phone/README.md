This module is an implementation of the relayreader schema
document, and can be used in the relayreader protocol.

Although a phone number such as `3048675309` is valid, local
conventions in certain countries or regions may require that
phone numbers be written as `304-867-5309` or in some other
pattern. There is an excellent [Wikipedia article][notation]
describing phone number notation for various countries.

Typical characters are, in regex form: `[a-zA-Z0-9,*#.+/()\s\-]`

* `a-zA-Z` alphabetical characters should translate to the numeric keypad value
* `(x|ext)\.?` is the *preferred* notation for extensions
* `0-9` the actual phone numbers
* `,` used to indicate a pause of 1 second, multiple instances simply add
* `*#` actual key presses of the characters
* `.+/()\s\-` visual seperators only, no technical meaning

For example, the phone number `18008675309,,,,1000#,,*105#` should be interpreted as:

* Dial the numbers sequentially `18008675309`
* Pause for `4` seconds
* Dial the numbers `1000` sequentially
* Immediately dial the `#` symbol
* Pause for `2` seconds
* Dial the `*` symbol
* Immediately dial the numbers `105` sequentially
* Immediately dial the `#` symbol

Please note that this module does not validate that the entered phone number
is an actual valid number, or even that it is formatted correctly.

[notation]: https://en.wikipedia.org/wiki/Local_conventions_for_writing_telephone_numbers
