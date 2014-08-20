# superagent-extend

Wrapper for superagent that enables clean use of custom `Request` subclasses.

## Usage

Create your own module:

```js
var superagent = require('superagent-extend');

function NewRequest(method, url) {
	// Don't forget to call the parent constructor!
	superagent.Request.call(this, method, url);

	// You can add your constructor logic (e.g. set defaults)
}

NewRequest.prototype = Object.create(superagent.Request.prototype);

// You can add new methods to request instances
NewRequest.prototype.greet = function() {
	return this.set('Hello', 'World');
}

// superagent.use() will create a new superagent using that class
// the original superagent remains unmodified.
var newSuperagent = superagent.use(NewRequest);

// You can also add new "static" methods for starting requests
newSuperagent.yo = function(url) {
	return new this.Request('YO', url);
}

module.exports = newSuperagent;
```

and the above example will add new methods:

```js
var request = require('my-superagent');

request
	.yo('/')
	.greet()
	.end();
```
