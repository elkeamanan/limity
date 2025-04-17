import { getBlockedKeywords, removeBlockedKeyword, saveBlockedKeyword } from "../provider/storage.js";

document.addEventListener('DOMContentLoaded', async function() {
    const blockedKeywords = await getBlockedKeywords()
    const keywordSection = document.getElementById('keywords')

    const keywordContainer = document.createElement("div");
    keywordContainer.className = "keyword-container";
    keywordSection.appendChild(keywordContainer);

    for (const keyword of blockedKeywords) {
        const keywordBox = document.createElement("div");
        keywordBox.className = "keyword-box";
        
        const keywordText = document.createElement("span");
        keywordText.textContent = keyword;
        keywordBox.appendChild(keywordText);
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "x";
        removeButton.className = "remove-keyword-btn";
        removeButton.title = "Remove keyword";
        removeButton.addEventListener("click", async () => {
            const removed = await removeBlockedKeyword(keyword);
            if (removed) {
                keywordBox.remove();
            }
        });
        
        keywordBox.appendChild(removeButton);
        keywordContainer.appendChild(keywordBox);
    }

    const dataForm = document.getElementById('dataForm');

    dataForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const keyword = document.getElementById('keyword').value;
        await saveBlockedKeyword(keyword);
    })
});