document.addEventListener('DOMContentLoaded', function() {
    const dataForm = document.getElementById('dataForm');

    dataForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const keyword = document.getElementById('keyword').value;

        chrome.storage.local.get(["blockedKeywords"], function(result) {
            let blockedKeywords = result.blockedKeywords || [];

            if (blockedKeywords.includes(keyword)) {
                alert(`${keyword} already stored as blocked keyword`)
            } else {
                blockedKeywords.push(keyword)
                chrome.storage.local.set({'blockedKeywords': blockedKeywords})
                alert(`${keyword} successfully stored as blocked keyword`)
            }
        })
    })
});