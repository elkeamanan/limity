import { getBlockedKeywords, saveBlockedKeyword } from "../provider/storage.js";

document.addEventListener('DOMContentLoaded', async function() {
    const blockedKeywords = await getBlockedKeywords()
    const keywordSection = document.getElementById('keywords')

    const keywordContainer = document.createElement("div");
    keywordContainer.className = "keyword-container";
    keywordSection.appendChild(keywordContainer);

    for (const keyword of blockedKeywords) {
        const newDiv = document.createElement("div");
        newDiv.textContent = keyword;
        newDiv.className = "keyword-box";
        keywordContainer.appendChild(newDiv);
    }

    const dataForm = document.getElementById('dataForm');

    dataForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const keyword = document.getElementById('keyword').value;
        await saveBlockedKeyword(keyword);
    })
});