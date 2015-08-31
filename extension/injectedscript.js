(function() {
  'use strict';

  window.injectedScript = function injectedScript() {
    var PETITION_ID_REGEXP = new RegExp(/\/petition\/(\d+)/);
    var addStyle = function addStyle(css) {
      var head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style');
      style.type = 'text/css';
      if (style.styleSheet){
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
      head.appendChild(style);
    };

    var addTag = function tag(petition, tags) {
      var matchedTags = [];
      Object.keys(tags).forEach(function (tagName) {
        var matched = tags[tagName].matchStrings.some(function(matchString) {
          var title = petition.title.toLowerCase().replace(/i/g,'і'); // latin to ukr
          return title.includes(matchString.toLowerCase());
        });
        if(!matched) {
          matched = tags[tagName].matchIds.some(function(matchId) {
            if(petition.id == 40) {console.log(petition.id); console.log(tagName)}
            return matchId == petition.id;
          });
        }
        if(matched) {
          matchedTags.push(tagName);
        };
      });
      return matchedTags;
    };

    var listContainerSelector = "section:not('.fltr') > div.reducer > .list";
    // sorting
    var sort = function sort() {
      $(listContainerSelector + " > .list_row").sort(function(a, b) {
        function getVotes(el) {
          return parseInt($(el).find('.list_elem_vote > span').text())
        };
        if (getVotes(a) > getVotes(b)) {
          return -1;
        } else {
          return 1;
        }
      }).appendTo(listContainerSelector);
    };
    // filtering
    $(".txt_input").bind('input', function(ev) {
      $(listContainerSelector + " > .list_row").css('display', 'table-row');
      if(ev.target.value.length > 2) {
        $(listContainerSelector + " > .list_row").filter(function(index, el) {
          return !($(el).find('a').text().toLowerCase()
                   .includes(ev.target.value.toLowerCase()));
        }).css("display", "none");
      };
      sort();
    });
    sort();
    fetch('https://vanuan.github.io/petition-sorted/data/tags.json').then(
      function(response) {
        return response.json();
      }
    ).then(function(tags) {
      $(listContainerSelector + "> .list_row").each(function() {
        var petitionTitle = $(this).find('a').text();
        var petitionId = parseInt(PETITION_ID_REGEXP.exec($(this).find('a').attr('href'))[1]);
        var newTags = addTag({title: petitionTitle, id: petitionId}, tags);
        newTags.forEach(function(newTag) {
          $('<span class="tag">' + newTag + '</span>').appendTo($(this).find(".list_elem_title h2"));
        }.bind(this));
      });
      addStyle(".tag { background-color: grey;" +
               "  color: white;" +
               "  margin: 5px;" +
               "  padding: 5px;" +
               "  border-radius: 3px; }");
    });
  };
})();
