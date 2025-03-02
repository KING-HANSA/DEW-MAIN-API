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
        errorMessage.textContent = 'Please enter a valid YouTube URL.';
        return;
    }

    try {
        // Fetch video data
        const videoResponse = await fetch(
            `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`
        );
        const audioResponse = await fetch(
            `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`
        );

        const videoData = await videoResponse.json();
        const audioData = await audioResponse.json();

        if (videoData.success && audioData.success) {
            // Populate video details
            document.getElementById('thumbnail').src = videoData.result.thumbnail;
            document.getElementById('videoTitle').textContent = videoData.result.title;

            // Set download links
            const videoButton = document.getElementById('downloadVideo');
            videoButton.href = videoData.result.download_url;

            const audioButton = document.getElementById('downloadAudio');
            audioButton.href = audioData.result.download_url;

            // Show video details
            videoDetails.style.display = 'block';
        } else {
            errorMessage.textContent = 'Failed to fetch download links. Please try again.';
        }
    } catch (error) {
        console.error(error);
        errorMessage.textContent = 'An error occurred. Please try again.';
    } finally {
        loadingSpinner.style.display = 'none';
    }
});
