var minimalZoom = 1.15


function onNewTab(tab)
{
    console.log("justzoom:test");
    browser.tabs.setZoom(tab.id, minimalZoom);
    browser.tabs.setZoomSettings(tab.id, {scope:"per-tab"})
}


function onTabUpdated(id,info,tab)
{
    if(tab.openerTabId != id && info.status == "loading")
    {
        console.log("set default zoom");
        browser.tabs.setZoom(id, minimalZoom);
    }

    console.log(info);
}

browser.tabs.onCreated.addListener(onNewTab)
browser.tabs.onUpdated.addListener(onTabUpdated);
