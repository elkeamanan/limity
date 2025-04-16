import { getBlockedKeywords } from "../provider/storage.js";

async function isBlockedURL(url) {
    if (!url) return false;
    
    const blockedKeywords = await getBlockedKeywords()

    for (const keyword of blockedKeywords) {
        if (url.includes(keyword)) {
            return true;
        }
    }
    return false;
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        isBlockedURL(changeInfo.url).then(isBlocked => {
            if (isBlocked) {
                chrome.tabs.update(tabId, {url: "background/blocked.html"});
            }
        });
    }
});

chrome.tabs.onCreated.addListener((tab) => {
    if (tab.pendingUrl) {
        isBlockedURL(tab.pendingUrl).then(isBlocked => {
            if (isBlocked) {
                chrome.tabs.update(tab.id, {url: "background/blocked.html"});
            }
        });
    }
});