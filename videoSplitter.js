function splitVideo() {
    const videoUpload = document.getElementById('videoUpload');
    const splitDuration = parseInt(document.getElementById('splitDuration').value);
    const videoSegments = document.getElementById('videoSegments');
    videoSegments.innerHTML = '';

    if (videoUpload.files.length === 0) {
        alert('Please upload a video file.');
        return;
    }

    if (!splitDuration || splitDuration <= 0) {
        alert('Please enter a valid split duration.');
        return;
    }

    const file = videoUpload.files[0];
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.src = url;

    video.addEventListener('loadedmetadata', () => {
        const totalDuration = video.duration;
        let currentTime = 0;
        let segmentIndex = 0;

        while (currentTime < totalDuration) {
            let end = currentTime + splitDuration;
            if (end > totalDuration) end = totalDuration;
            createSegment(url, currentTime, end, segmentIndex);
            currentTime += splitDuration;
            segmentIndex++;
        }
    });

    video.load();
}

function createSegment(url, start, end, index) {
    const segmentContainer = document.createElement('div');
    const segmentTitle = document.createElement('h3');
    segmentTitle.textContent = `Segment ${index + 1}: ${start}s - ${end}s`;
    const segmentVideo = document.createElement('video');
    segmentVideo.controls = true;
    segmentVideo.src = `${url}#t=${start},${end}`;
    segmentContainer.appendChild(segmentTitle);
    segmentContainer.appendChild(segmentVideo);
    document.getElementById('videoSegments').appendChild(segmentContainer);
}
