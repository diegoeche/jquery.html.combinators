(function  () {
  var tagNames = "a abbr address area article aside audio b base bdo blockquote body br button canvas caption cite code col colgroup command datalist dd del details dfn div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins keygen kbd label legend li link map mark menu meta meter nav noscript object ol optgroup option output p param pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr ul var video wbr".split(" ")

  window.$builder = {};

  $.each(tagNames, function  (_, tag) {
    var builder = function () {
      var node = $("<" + tag + ">");
      $.each(arguments, function (_, arg) {
        if (typeof(arg) === "string") {
          if (arg[0] === ".") node.addClass(arg.substring(1));
          else if (arg[0] === "#") node.attr("id", arg.substring(1));
          else node.append($("<div>").text(arg).html());
        } else {
          node.append(arg);
        }
      });
      return node;
    }
    $builder[tag] = builder;
  });

  // A with-like functionality that creates a backup of the
  // references in the global object.
  $builder.safeWith = function(fun, obj) {
    // Backup references.
    var globalBackup = {};
    for(var key in obj) {
      if(obj.hasOwnProperty(key)) {
        if(window[key] !== undefined) {
          globalBackup[key] = window[key];
        }
        window[key] = obj[key];
      }
    }
    // Execute function in the right global context.
    var returnValue = fun();
    // Restore old references;
    for(var key in globalBackup) {
      if(globalBackup.hasOwnProperty(key)) {
        window[key] = globalBackup[key];
      }
    }
    return returnValue;
  };
})();

