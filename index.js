
var superagent  = require('superagent');

function subclass(NewRequest, staticPrototype) {

  function request(method, url) {
    return new request.Request(method, url);
  };

  for(var k in staticPrototype) {
    if (staticPrototype.hasOwnProperty(k)) {
      request[k] = staticPrototype[k];
    }
  }

  request.Request = NewRequest;

  return request;
}

module.exports = subclass(superagent.Request, {
  get: function get(url, data) {
    var req = new this.Request('GET', url);
    if (data) {
      req.query(data);
    }
    return req;
  },

  head: function head(url, data) {
    var req = new this.Request('HEAD', url);
    if (data) {
      req.query(data);
    }
    return req;
  },

  del: function del(url) {
    return this('DELETE', url);
  },

  patch: function patch(url, data) {
    var req = new this.Request('PATCH', url);
    if (data) {
      req.send(data);
    }
    return req;
  },

  post: function post(url, data) {
    var req = new this.Request('POST', url);
    if (data) {
      req.send(data);
    }
    return req;
  },

  put: function put(url, data) {
    var req = new this.Request('PUT', url);
    if (data) {
      req.send(data);
    }
    return req;
  },

  /**
   * var Request = superagent.Request;
   * function NewRequest(method, url) {Request.call(this, method, url)};
   * NewRequest.prototype = Object.create(Request.prototype);
   * superagent = superagent.use(NewRequest);
   *
   * @param  {Function} NewRequest new constructor derived from superagent.Request
   * @return {Function} superagent that uses the new Request
   */
  use: function use(NewRequest) {
    return subclass(NewRequest, this);
  },
});
