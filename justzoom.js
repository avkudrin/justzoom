var minimalZoom = 1.2


function onNewTab(tab)
{
    console.log("justzoom:test");
    browser.tabs.setZoom(tab.id, minimalZoom);
    browser.tabs.setZoomSettings(tab.id, {scope:"per-tab"})
}

function onTabUpdated(id,info,tab)
{
    if(info.status == "loading")
    {
        gettingZoomSettings = browser.tabs.getZoomSettings(id);
        gettingZoomSettings.then(
            function gotZoomSettings(zoomSettings)
            {
                gettingZoom = browser.tabs.getZoom(id);
                gettingZoom.then(function gotZoom(zoom){
                    if(zoom == zoomSettings.defaultZoomFactor)
                    {
                        console.log("Set default zoom");
                        browser.tabs.setZoom(id, minimalZoom);
                    }
                },
                function zoomError(reason){
                    console.debug ("Failed to get zoom");
                    
                });
            },
            function zoomSettingsError(reason)
            {
                console.debug ("Failed to get zoom settings");
            }
        )



    }

    console.log(info);
}

browser.tabs.onCreated.addListener(onNewTab)
browser.tabs.onUpdated.addListener(onTabUpdated);
