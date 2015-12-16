var extremeProduce = (function(){
  var PollerInstance = new spredfast.Poller();

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
    }
  }  
}(jQuery));  