(function() {
    const comp = app.project.activeItem;
    //Set up window
    const win = new Window("palette", "Grid Creator", undefined);
    const sizeGroup = win.add("group", undefined, sizeGroup);
    const xPanel = sizeGroup.add("panel", undefined, "")
    const yPanel = sizeGroup.add("panel", undefined, "")

    //X side of window
    const xSizeText = xPanel.add("statictext", undefined, "copies x:");
    const xSize = xPanel.add("edittext", undefined, "4");
    xSize.characters = 2;
    xSize.borderless = true;

    //Y Side of window

    const ySizeText = yPanel.add("statictext", undefined, "copies y:");
    const ySize = yPanel.add("edittext", undefined, "4");
    ySize.characters = 2;
    xSize.borderless = true;

    const randomizeRot = win.add("checkbox", undefined, "Randomize Rotation");

    const offsetText = win.add("statictext", undefined, "offset amount");
    const offset = win.add("edittext", undefined, "0");
    
    // Create grid button
    const createGridButton = win.add("button", undefined, "create grid!");
            

    var activeComp = app.project.activeItem;
    var activeLayers = activeComp.selectedLayers;
    var origNumLayers = activeComp.numLayers;

    //Check if comp is selected, if one is proceed with the script
    if(comp && comp instanceof CompItem){
        win.show();        
        createGridButton.onClick = function(){
            app.beginUndoGroup("Grid Creation");
            const xs = Number(xSize.text); 
            const ys = Number(ySize.text);
            const offsetModifier = Number(offset.text);
            cur_layer = 0;


            for(var i = 0; i < activeLayers.length; i++){
                activeLayers[i].enabled = false;
                activeLayers[i].selected = false;
            }


            for(y=0;y<ys;y++){
                yLoc = (comp.width / ys) * (y + 0.5);
                for(x=0;x<xs;x++){
                    newLayer = activeLayers[cur_layer].duplicate();
                    newLayer.scale.setValue([100 / xs, 100 / ys]);
                    newLayer.enabled = true;
                    xLoc = (comp.width / xs) * (x + 0.5);
                    newLayer.position.setValue([xLoc, yLoc]);
                    if(randomizeRot.value){
                        alert('gg')
                        newLayer.rotation.setValue(Math.ceil(Math.random() * 4) * 90);
                    }
                    newLayer.startTime = - Math.random() * offsetModifier
                }
            }
            app.endUndoGroup();
        }

    }else{
        alert('Select a comp')
    }
    
})();