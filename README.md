# Javascript library for access to the PROGREZZ's API REST #

## 1. Introduction ##
Library for easy access to progreszz's server API REST, by JSON format.

## 2. Use ##
Request make it by ````RESTResquest```` object type. Like you see on ````example.html```` file, you can make a server request like this:

    rest_request = new RESTResquest()
    rest_request.onComplete = function(json_response) {
      console.log( JSON.stringify(json_response, null, '\t') )
    }
    rest_request.onError = function(xhr) {
      console.log( "ERROR! " + JSON.stringify(xhr, null, '\t') )
    }
    rest_request.onEnd = function(json_response) {
      console.log("end!")
    }

    function reset_form() {
      // Setup default text
      document.getElementById('form_request_str').value = JSON.stringify( RESTResquest.getTemplateRequest(), null, '\t' );
    }
    
    // Send the template example request.
    rest_request.request( RESTResquest.getTemplateRequest() )


**For more information look at *Wiki* project.**

## 3. Dependencies ##
Our library uses this dependencies:

- [jQuery 1.5.0 o superior](http://jquery.com/): Used for *ajax* request with the best compatibility.
