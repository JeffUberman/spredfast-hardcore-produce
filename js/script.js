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
    }
  }  
}(jQuery));  