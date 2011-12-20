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