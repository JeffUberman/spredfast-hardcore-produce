var extremeProduce = (function(){
  var PollerInstance = new spredfast.Poller();
  var resultsCache;

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
    }
  }  
}(jQuery));  