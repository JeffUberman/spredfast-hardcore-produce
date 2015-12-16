var extremeProduce = (function(){
  var PollerInstance = new spredfast.Poller(),
      resultsCache;

  return module = {
    //get poll by individual type function, returns a promise
    _getPollByType : function(itemType){
      try {
        return PollerInstance.poll({type: itemType});
      }
      catch(error) {
        console.log("Unable to get recent poll by type: " + error);
      }
    },

    //get poll containing both veggies and fruits
    _getRecentPoll : function(cb){
      try {
        var dfd = $.Deferred();
        var dVeg = this._getPollByType("veggies");
        var dFru = this._getPollByType("fruits");
        $.when(dVeg, dFru)
        .done(function(dataVeg, dataFru){
          dfd.resolve(cb(dataVeg.concat(dataFru)));
        });
        return dfd.promise();        
      }
      catch (error) {
        console.log("Unable to get recent poll: " + error);
      }
    },

    //update counts with cached results object, returns promise
    _getCurrentCounts : function(){
      try{
        var dfd = $.Deferred();
        this._getRecentPoll(function(results){
          //check to see if poll results have been previous cached, if not do so
          if(!resultsCache){
            resultsCache = results
          }
          //if so, update count with new poll results
          else{
            for(var i = 0; i < resultsCache.length; i++){
              resultsCache[i].count+=results[i].count;
            }
          }
          dfd.resolve(resultsCache); 
        });
        return dfd.promise(); 
      }
      catch(error){
        console.log("Unable to get current tally: " + error);
      }
    },

    //create a leaderboard of ordered counts/mentions
    _makeLeaderboard : function(cachedResults){
    //clone cachedResults since sort is destructive
      var tempArr = cachedResults.slice(0);
      //sort cached array
      return tempArr.sort(function(a, b){
        return a.count - b.count;
        });
    },

    //update DOM with 5 largest counts
    _updateDOM : function(leaderboard) {
      //clear old leaderboard
      $('#leaderboard').empty();
      //append new leaderboard
      var length = leaderboard.length - 1;
      for(var i = length; i > length - 5; i--){
        $('#leaderboard').append("<li class='whole'><span class='pull-left'>" + leaderboard[i].name + "</span><span class='pull-right'><span class='red'>" + leaderboard[i].count + " </span><span class='mentions'>Mentions</span></span><br></li>");
      }
    },

    //render top 5 to page
    render : function(){
      var self = this;
      //get most recent poll data
      $.when(this._getCurrentCounts())
      //generate leaderboard
      .then(function(counts){
        return self._makeLeaderboard(counts);
      })
      //updateDom
      .done(function(leaderboard){
        return self._updateDOM(leaderboard);
      });
    }
  }  
}(jQuery));

//initialize leaderboard on page load
$(document).ready(function(){
  extremeProduce.render();

  //set interval to refresh leaderboard with new results
  var interval = setInterval(function(){
    extremeProduce.render();
  }, 15000);
});  