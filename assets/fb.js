document.getElementById('downloadButton').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value.trim();
    const loadingSpinner = document.getElementById('loadingSpinner');
    const videoDetails = document.getElementById('videoDetails');
    const errorMessage = document.getElementById('errorMessage');

    // Reset UI
    videoDetails.style.display = 'none';
    errorMessage.textContent = '';
    loadingSpinner.style.display = 'block';

    if (!videoUrl) {
        loadingSpinner.style.display = 'none';
        errorMessage.textContent = 'Please enter a valid Facebook URL.';
        return;
    }

    try {
        // Fetch video data from Facebook API
        const response = await fetch(
            `https://apis.davidcyriltech.my.id/facebook?url=${encodeURIComponent(videoUrl)}`
        );

        const data = await response.json();

        if (data.links) {
            // Populate video details
            document.getElementById('thumbnail').src = data.thumbnail;
            document.getElementById('downloadHD').href = data.links.hd;
            document.getElementById('downloadSD').href = data.links.sd;

            // Show video details
            videoDetails.style.display = 'block';
        } else {
            errorMessage.textContent = 'Failed to fetch video details. Please try again.';
        }
    } catch (error) {
        console.error(error);
        errorMessage.textContent = 'An error occurred. Please try again.';
    } finally {
        loadingSpinner.style.display = 'none';
    }
});
