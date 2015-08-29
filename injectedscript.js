(function() {
  'use strict';

  window.injectedSort = function injectedSort() {
    var listContainerSelector = "section:not('.fltr') > div.reducer > .list";
    $(listContainerSelector + " > .list_row").sort(function(a, b) {
      function getVotes(el) {
        return parseInt($(el).find('span').text())
      };
      if (getVotes(a) > getVotes(b)) {
        return -1;
      } else {
        return 1;
      }
    }).appendTo(listContainerSelector);
  }
})();
