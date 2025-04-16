import { saveBlockedKeyword } from "../provider/storage.js";

document.addEventListener('DOMContentLoaded', async function() {
    const dataForm = document.getElementById('dataForm');

    dataForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const keyword = document.getElementById('keyword').value;
        await saveBlockedKeyword(keyword);
    })
});