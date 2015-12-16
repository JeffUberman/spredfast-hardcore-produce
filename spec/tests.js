var expect = chai.expect;

describe("Hardcore Produce Unit Tests", function(){
  it("can create a new instance of extremeProduce", function(done){
    expect(extremeProduce).to.have.property("_getPollByType");
    done();
  });

  it("can get a poll by produce type", function(done){
    $.when(extremeProduce._getPollByType("veggies"))
      .then(function(data){
        expect(data[0].name).to.equal("Adzuki Beans");
        done();
      });
  });

  it("can get a poll with both produce types", function(done){
    $.when(extremeProduce._getRecentPoll(function(data){return data}))
      .done(function(data){
        expect(data).to.have.length(20);
        done();
      });
  });

});