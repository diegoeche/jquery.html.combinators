var tagNames = "a abbr address area article aside audio b base bdo blockquote body br button canvas caption cite code col colgroup command datalist dd del details dfn div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins keygen kbd label legend li link map mark menu meta meter nav noscript object ol optgroup option output p param pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr ul var video wbr".split(" ")

var tags = []

$.each(tagNames, function  (_, tag) {
  var builder = function () {
    var node = $("<" + tag + ">");
    $.each(arguments, function (_, arg) {
      if (typeof(arg) === "string") {
        if (arg[0] === ".") node.addClass(arg.substring(1))
        else if (arg[0] === "#") node.attr("id", arg.substring(1))
        else node.append($("<div>").text(arg).html());
      } else {
        node.append(arg);
      }
    });
    return node;
  }
  tags[tag] = builder;
})

// Quickstart!
//
// with(tags) {
//   console.log(div("#container",
//                   ".big-column",
//                   h1("my title!"),
//                   "A simple summary",
//                   h2(".second-header", "subtitle"),
//                   div(span("my text"))))();;
// }
