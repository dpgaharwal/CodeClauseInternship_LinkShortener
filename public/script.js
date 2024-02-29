document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('shorten-form');
    const urlInput = document.getElementById('url-input');
    const urlList = document.getElementById('url-list');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const url = urlInput.value.trim();

        if (url !== '') {
            shortenUrl(url);
        }
    });

    function shortenUrl(url) {
        fetch('/url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        })
        .then(response => response.json())
        .then(data => {
            const row = `
                <tr>
                    <td>${url}</td>
                    <td>${window.location.origin}/${data.id}</td>
                </tr>
            `;
            urlList.insertAdjacentHTML('beforeend', row);
        })
        .catch(error => console.error('Error:', error));
    }
});
