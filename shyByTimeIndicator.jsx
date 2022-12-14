(function() {
    var comp = app.project.activeItem;

    //If a composition is selected
    if(comp && comp instanceof CompItem){
        var layers = comp.numLayers;
        var curTime = comp.time;
        
        for(i=1; i<=layers; i++){
            var curLayer = comp.layer(i)
            //Shy layer if the time indicator is not over it, otherwise show it and select it.
            if(curLayer.inPoint < curTime && curLayer.outPoint > curTime){
                curLayer.shy = false;
                curLayer.selected = true;
            }else{
                curLayer.shy = true;
            }
        }
    }else{
        alert('Select a composition!');
    }
})();