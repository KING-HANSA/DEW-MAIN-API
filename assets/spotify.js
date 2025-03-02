document.getElementById('fetchButton').addEventListener('click', async () => {
    const songUrl = document.getElementById('songUrl').value.trim();
    const messageDiv = document.getElementById('message');
    const resultSection = document.getElementById('resultSection');
    const thumbnail = document.getElementById('thumbnail');
    const channel = document.getElementById('channel');
    const title = document.getElementById('title');
    const duration = document.getElementById('duration');
    const downloadMp3Button = document.getElementById('downloadMp3Button');
    const loadingBar = document.getElementById('loadingBar');

    // Reset UI
    messageDiv.textContent = '';
    resultSection.style.display = 'none';
    loadingBar.style.display = 'block';
    loadingBar.style.width = '0%';

    if (!songUrl) {
        messageDiv.textContent = "Please enter a Spotify song URL.";
        loadingBar.style.display = 'none';
        return;
    }

    try {
        loadingBar.style.width = '100%'; // Simulating loading

        const response = await fetch(`https://apis.davidcyriltech.my.id/spotifydl?url=${encodeURIComponent(songUrl)}`);
        const data = await response.json();

        if (data.success) {
            // Display song details
            thumbnail.src = data.thumbnail;
            channel.textContent = `Artist: ${data.channel}`;
            title.textContent = `Title: ${data.title}`;
            duration.textContent = `Duration: ${data.duration}`;

            // Set download link
            downloadMp3Button.href = data.DownloadLink;

            // Show result section
            resultSection.style.display = 'block';
        } else {
            messageDiv.textContent = "Failed to fetch song details. Please try again.";
        }
    } catch (error) {
        messageDiv.textContent = "An error occurred. Please try again.";
        console.error(error);
    } finally {
        loadingBar.style.display = 'none';
    }
});
