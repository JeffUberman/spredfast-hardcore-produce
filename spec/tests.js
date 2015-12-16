var expect = chai.expect;

describe("Hardcore Produce Unit Tests", function(){

  it("can get a poll by produce type", function(done){
    $.when(extremeProduce._getPollByType("veggies"))
      .then(function(data){
        expect(data[0].name).to.equal("Adzuki Beans");
        done();
      });
  });

});