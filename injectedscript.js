(function() {
  'use strict';

  window.injectedScript = function injectedScript() {
    var listContainerSelector = "section:not('.fltr') > div.reducer > .list";
    // sorting
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
    // filtering
    $(".txt_input").bind('input', function(ev) {
      $(listContainerSelector + " > .list_row").css('display', 'table-row');
      if(ev.target.value.length > 2) {
        $(listContainerSelector + " > .list_row").filter(function(index, el) {
          return !($(el).find('a').text().toLowerCase()
                   .includes(ev.target.value.toLowerCase()));
        }).css("display", "none");
      }
    });
  }
})();
