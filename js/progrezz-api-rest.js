function GenericUtils() {}
GenericUtils.cmpVersion = function(a, b) {
    var i, cmp, len, re = /(\.0)+[^\.]*$/;
    a = (a + '').replace(re, '').split('.');
    b = (b + '').replace(re, '').split('.');
    len = Math.min(a.length, b.length);
    for( i = 0; i < len; i++ ) {
        cmp = parseInt(a[i], 10) - parseInt(b[i], 10);
        if( cmp !== 0 ) {
            return cmp;
        }
    }
    return a.length - b.length;
}

GenericUtils.gteVersion = function(a, b) {
    return GenericUtils.cmpVersion(a, b) >= 0;
}

GenericUtils.ltVersion = function(a, b) {
    return GenericUtils.cmpVersion(a, b) < 0;
}

GenericUtils.escapeHTML = function( string )
{
    var pre = document.createElement('pre');
    var text = document.createTextNode( string );
    pre.appendChild(text);
    return pre.innerHTML;
}

function RESTResquest() {
  this.onComplete = null
  this.onFail = null
  this.onEnd = null
}

RESTResquest.DEFAULT_REQUEST      = { type: "test" }
RESTResquest.DEFAULT_REQUEST_URL  = "http://localhost:4567/dev/api/rest"
RESTResquest.DEFAULT_REQUEST_TYPE = "GET"
RESTResquest.DEFAULT_TYPE         = "json"
RESTResquest.getTemplateRequest = function() {  
  return { metadata: { request_url: RESTResquest.DEFAULT_REQUEST_URL, timestamp: new Date().getTime(), type: RESTResquest.DEFAULT_TYPE, request_type: RESTResquest.DEFAULT_REQUEST_TYPE/* ... */ }, request: RESTResquest.DEFAULT_REQUEST }
}

// If jquery 1.5.0 or above is found, it will use getJSON method.
if( typeof $ !== 'undefined' && GenericUtils.gteVersion($.fn.jquery, "1.5.0")) {
  $.support.cors = true;

  //   Request method. A json file must be providen. See documentation
  // for more information about API REST.
  RESTResquest.prototype.request = function( json ) {
    var self = this
    
    $.ajax({
      type:     json.metadata.request_type,
      url:      json.metadata.request_url,
      dataType: json.metadata.type,
      data:     json,
      error:    function(xhr, textStatus, errorThrown) {
        if(self.onError != null) self.onError(xhr);
        if(self.onEnd   != null) self.onEnd();
      },
      success:  function(ajaxResponse) {        
        if (typeof ajaxResponse == "string")
          ajaxResponse = $.parseJSON(ajaxResponse);
        
        if(self.onComplete != null) self.onComplete(ajaxResponse);
        if(self.onEnd      != null) self.onEnd();
      }
    })
  
  };
}
// Otherwise, the library will use XMLHttpRequest objects
else {
  ERROR_MSG = "progrezz-api-rest.js: jQuery >= 1.5.0 is required. Requests are disabled."
  alert( ERROR_MSG )
  
  RESTResquest.prototype.request = function( json ) {
    alert( ERROR_MSG )
    if(this.onEnd  != null) this.onEnd();
  };
}