export async function getBlockedKeywords() {
    return new Promise(resolve => {
        chrome.storage.local.get(['blockedKeywords'], result => {
            resolve(result.blockedKeywords || []);
        });
    });
}
  
export async function saveBlockedKeyword(keyword) {
    return getBlockedKeywords().then(keywords => {
        if (keywords.includes(keyword)) {
            alert(`${keyword} already stored as blocked keyword`);
            return false;
        }
    
        const updatedKeywords = [...keywords, keyword];
        return new Promise(resolve => {
            chrome.storage.local.set({ 'blockedKeywords': updatedKeywords }, () => {
            alert(`${keyword} successfully stored as blocked keyword`);
            resolve(true);
        });
    });
});
}

export async function removeBlockedKeyword(keyword) {
    return getBlockedKeywords().then(keywords => {
        if (!keywords.includes(keyword)) {
            alert(`${keyword} is not in the blocked keywords list`);
            return false;
        }
        
        const updatedKeywords = keywords.filter(k => k !== keyword);
        return new Promise(resolve => {
            chrome.storage.local.set({ 'blockedKeywords': updatedKeywords }, () => {
                alert(`${keyword} successfully removed from blocked keywords`);
                resolve(true);
            });
        });
    });
}
  