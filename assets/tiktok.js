document.getElementById('fetchButton').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value.trim();
    const messageDiv = document.getElementById('message');
    const resultSection = document.getElementById('resultSection');
    const avatar = document.getElementById('avatar');
    const nickname = document.getElementById('nickname');
    const desc = document.getElementById('desc');
    const downloadVideoButton = document.getElementById('downloadVideoButton');
    const downloadAudioButton = document.getElementById('downloadAudioButton');

    // Reset UI
    messageDiv.textContent = '';
    resultSection.style.display = 'none';

    if (!videoUrl) {
        messageDiv.textContent = "Please enter a TikTok video URL.";
        return;
    }

    try {
        const response = await fetch(`https://apis.davidcyriltech.my.id/download/tiktok?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();

        if (data.success) {
            // Display video details
            avatar.src = data.result.author.avatar;
            nickname.textContent = data.result.author.nickname;
            desc.textContent = data.result.desc;

            // Set download links
            downloadVideoButton.href = data.result.video;
            downloadAudioButton.href = data.result.music;

            // Show result section
            resultSection.style.display = 'block';
        } else {
            messageDiv.textContent = "Failed to fetch video details. Please try again.";
        }
    } catch (error) {
        messageDiv.textContent = "An error occurred. Please try again.";
        console.error(error);
    }
});
