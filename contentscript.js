(function() {
  'use strict';

  function injectScript() {
     var elem = document.createElement("script");
     var scripts = [window.injectedSort];
     var source = scripts.join(";") + "; injectedSort();"
     elem.type = "text/javascript";
     elem.innerHTML = source;
     document.head.appendChild(elem);
  }

  injectScript();

})();
