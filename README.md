# Javascript library for access to the PROGREZZ's API REST #

## 1. Introduction ##
Library for easy access to progreszz's server API REST, by JSON format.

## 2. Use ##
Request make it by ````RESTRequest```` object type. Like you see on ````example.html```` file, you can make a server request like this:

```javascript
RESTRequest.DEFAULT.REQUEST_URL = "http://progrezz-server.herokuapp.com/dev/api/rest"
rest_request = new RESTRequest()

rest_request.onComplete = function(json_response) {
  console.log( JSON.stringify(json_response, null, '\t') )
}
rest_request.onError = function(xhr) {
  console.log( "ERROR! " + JSON.stringify(xhr, null, '\t') )
}
rest_request.onEnd = function(json_response) {
  console.log("end!")
}

// Send the template example request.
rest_request.request( RESTRequest.getTemplateRequest() )
```


**For more information look at *Wiki* project.**

## 3. Dependencies ##
Our library uses this dependencies:

- [jQuery 1.5.0 or higher](http://jquery.com/): Used for *ajax* request with the best compatibility.
