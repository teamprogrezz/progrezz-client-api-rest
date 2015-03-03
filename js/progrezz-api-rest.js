// ---------------------------
// -  Utilidades genéricas   -
// ---------------------------
function GenericUtils() { }

//         Versionado
// ---------------------------
GenericUtils.versions = function() { }

// Comparar versiones arbitrarias como strings ("1.1.0", "1.2", "1", "3.0.2.3", etc).
GenericUtils.versions.cmpVersion = function(a, b) {
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

// Comparar versiones (mayor que). Véase GenericUtils.cmpVersion
GenericUtils.versions.gteVersion = function(a, b) {
    return GenericUtils.versions.cmpVersion(a, b) >= 0;
}

// Comparar versiones (menor que). Véase GenericUtils.cmpVersion
GenericUtils.versions.ltVersion = function(a, b) {
    return GenericUtils.versions.cmpVersion(a, b) < 0;
}

//            HTML
// ---------------------------
GenericUtils.html = function() { }

// Escapar entidades HTML de una cadena para evitar convertirla en elementos del DOM al volcarla sobre un XHTML.
GenericUtils.html.escape = function( string ) {
    var pre = document.createElement('pre');
    var text = document.createTextNode( string );
    pre.appendChild(text);
    return pre.innerHTML;
}

//             XML
// ---------------------------
GenericUtils.xml = function() { }

// Función para parsear ficheros XML teniendo en cuenta compatibilidad con diversos exploradores.
GenericUtils.xml.parse = function ( xml_str ) {
  var xmlDoc = null
  var parser = null
  
  // Mayoría de exploradores
  if (window.DOMParser) {
    parser=new DOMParser();
    xmlDoc=parser.parseFromString(txt,"text/xml");
  }
  // Internet explorar (sin compatibilidad)
  else {
    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async=false;
    xmlDoc.loadXML(txt);
  }
  
  return xmlDoc
}

// Función para stringificar objetos XML.
GenericUtils.xml.stringify = function ( xml ) {
  if (window.ActiveXObject) 
    return xml.xml;
  else
    return new XMLSerializer().serializeToString(xml);
}

// ---------------------------
// -      Utilidad REST      -
// ---------------------------
function RESTResquest() {
  this.onComplete = null
  this.onFail = null
  this.onEnd = null
}

RESTResquest.DEFAULT = function() { }

// Constantes
RESTResquest.DEFAULT.REQUEST        = { type: "echo", data: { name: "world" } }
RESTResquest.DEFAULT.REQUEST_URL    = "/dev/api/rest"
RESTResquest.DEFAULT.REQUEST_TYPE   = "GET"
RESTResquest.DEFAULT.TIMESTAMP_FUNC = function() { return new Date().getTime() }
RESTResquest.DEFAULT.TIMEOUT        = 0
RESTResquest.DEFAULT.TYPE           = "json"

// Plantilla por defecto
RESTResquest.getTemplateRequest = function() {  
  return {
    metadata: {
      request_url:  RESTResquest.DEFAULT.REQUEST_URL,      // URL de petición
      timestamp:    RESTResquest.DEFAULT.TIMESTAMP_FUNC(), // Marca de fecha actual, en ms
      timeout:      RESTResquest.DEFAULT.TIMEOUT,          // Timeout de la petición
      type:         RESTResquest.DEFAULT.TYPE,             // Tipo de archivo solicitado (json, xml, plain-text, ...)
      request_type: RESTResquest.DEFAULT.REQUEST_TYPE      // Tipo de petición http (get, post, ...)
      /* ... */
    },
    request: RESTResquest.DEFAULT.REQUEST             // Petición por defecto
  }
}

// Si se encuentra jQuery 1.5.0 (o versiones superiores), se usarán peticiones ajax de jQuery.
if( typeof $ !== 'undefined' && GenericUtils.versions.gteVersion($.fn.jquery, "1.5.0")) {
  // Habilitar CORS
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
        if (typeof ajaxResponse == "string") {
          ajaxResponse = $.parseJSON(ajaxResponse);
        }
        ajaxResponse.request = json // Añadir petición a la respuesta.
        
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
