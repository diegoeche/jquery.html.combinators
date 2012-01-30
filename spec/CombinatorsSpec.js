describe("Combinators", function () {
  it("should create a div element", function () {
    $builder.div("hello").html().should === "hello";
  });

  it("should set the id attr if the parameters contain a string starting with '#'", function () {
    $builder.div("#myid", "hello").attr("id").should == "myid"
  });

  it("should set the class name if the parameters contain a string starting with '.'", function () {
    $builder.div(".myclass", "hello").attr("class").should == "myclass"
  });
});

describe("$builder.safeWith", function () {
  it("should restore the global values after execution", function () {
    window.a = 5;
    $builder.safeWith(function () {}, {a: 4});
    window.a.should === 5;
  });

  it("should restore the global-undefined values after execution", function () {
    window.a = undefined;
    $builder.safeWith(function () {}, {a: 4});
    window.a.should === undefined;
  });

  it("should execute the function in the right global context", function () {
    $builder.safeWith(function () {
      return a;
    }, {a: 4}).should === 4;
  });
});

describe("$builder.build", function () {
  it("should create a div element", function () {
    $builder.build(function  () {
      return div("hello");
    }).html().should === "hello";
  });

  it("should set the id attr if the parameters contain a string starting with '#'", function () {
    $builder.build(function  () {
      return div("#myid", "hello");
    }).attr("id").should == "myid"
  });

  it("should set the class name if the parameters contain a string starting with '.'", function () {
    $builder.build(function  () {
      return div(".myclass", "hello");
    }).attr("class").should == "myclass"
  });

  it("should accept arbitrary nesting of all the possible tags", function () {
    var node = $builder.build(function () {
      var node =
        div(
          div("#id"),
          div(
            ".span_container",
            span("1"),
            span("2")
          ),
          div(
            ".link_container",
            a("link1"),
            a("link2")
          )
        );
      return node;
    });
    node.find("span").length.should == 2;
    node.find("a").length.should == 2;
  });
});