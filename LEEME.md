# Librería javascript de acceso a la API REST de PROGREZZ #
## 1. Introducción ##
Librería de acceso sencillo a la API REST del servidor de progrezz, mediante peticiones con formato JSON, recibiendo

## 2. Uso ##
Las peticiones se realiza mediante un objeto de tipo ````RESTResquest````. Tal como se muestra en el fichero ````example.html````, se puede realizar una petición al servidor de la siguiente manera:

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


**Para más información de las distintas peticiones, véase la *Wiki* de este proyecto.**

## 3. Dependencias ##
La librería hace uso de las siguientes librerías:

- [jQuery 1.5.0 o superior](http://jquery.com/): Requerida para realizar peticiones *ajax* con la mayor compatibilidad posible.

