var expect = chai.expect,
    assert = chai.assert,
    testResults;

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
        testResults = data;
        expect(data).to.have.length(20);
        done();
      });
  });

  it("can get add a new poll's results to historial results", function(done){
  $.when(extremeProduce._getCurrentCounts())
    .done(function(data){
      expect(data[0].count).to.not.equal(testResults[0].count);
      done();
    });
  });

    it("can get order historical results to create a leaderboard", function(done){
  $.when(extremeProduce._makeLeaderboard(testResults))
    .done(function(data){
      assert(data[0].count < data[1].count);
      done();
    });
  });

});