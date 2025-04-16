import { getBlockedKeywords } from "../shared/storage.js";

function isBlockedURL(url) {
    if (!url) return false;
    
    const blockedKeywords = getBlockedKeywords()
    for (const keyword of blockedKeywords) {
        if (url.includes(keyword)) {
            return true;
        }
    }
    return false;
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && isBlockedURL(changeInfo.url)) {
        chrome.tabs.update(tabId, {url: "background/blocked.html"});
    }
});

chrome.tabs.onCreated.addListener((tab) => {
    if (tab.pendingUrl && isBlockedURL(tab.pendingUrl)) {
        chrome.tabs.update(tab.id, {url: "background/blocked.html"});
    }
});