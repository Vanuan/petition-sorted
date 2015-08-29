(function() {
  'use strict';

  function injectScript() {
     var elem = document.createElement("script");
     var scripts = [window.injectedScript];
     var source = scripts.join(";") + "; injectedScript();"
     elem.type = "text/javascript";
     elem.innerHTML = source;
     document.head.appendChild(elem);
  }

  injectScript();

})();
