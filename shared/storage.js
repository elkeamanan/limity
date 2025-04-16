let blockedKeywords = [];

chrome.storage.local.get(["blockedKeywords"], function(result) {
    blockedKeywords = result.blockedKeywords || [];
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.blockedKeywords) {
        blockedKeywords = changes.blockedKeywords.newValue || [];
    }
});

export function getBlockedKeywords() {
    return blockedKeywords
}

export function saveBlockedKeyword(keyword) {
    if (blockedKeywords.includes(keyword)) {
        alert(`${keyword} already stored as blocked keyword`)
    } else {
        blockedKeywords.push(keyword)
        chrome.storage.local.set({'blockedKeywords': blockedKeywords})
        alert(`${keyword} successfully stored as blocked keyword`)
    }
}