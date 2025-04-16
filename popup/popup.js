import { saveBlockedKeyword } from "../shared/storage.js";

document.addEventListener('DOMContentLoaded', function() {
    const dataForm = document.getElementById('dataForm');

    dataForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const keyword = document.getElementById('keyword').value;
        saveBlockedKeyword(keyword);
    })
});