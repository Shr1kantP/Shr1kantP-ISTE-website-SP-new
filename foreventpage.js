function toggleOtherField() {
    const fieldEducation = document.getElementById('field-education');
    const otherField = document.getElementById('other-field');
    otherField.classList.toggle('hidden', fieldEducation.value !== 'Other');

    if (fieldEducation.value === 'Other') {
        document.getElementById('field-education-other').setAttribute('name', 'fieldEducation');
        fieldEducation.removeAttribute('name');
    } else {
        fieldEducation.setAttribute('name', 'fieldEducation');
        document.getElementById('field-education-other').removeAttribute('name');
    }
}

document.getElementById('registration-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);
    const submitBtn = document.getElementById('submit-btn');
    const progressContainer = document.getElementById('progress-container');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    // Progress UI kickoff
    submitBtn.disabled = true;
    progressContainer.style.display = 'block';
    progressFill.style.width = '0%';
    progressText.textContent = 'Uploading...';

    // Add extra fields manually
    const day1Event = document.querySelector('input[name="day_1_event"]:checked')?.value || '';
    formData.set('day_1_event', day1Event);

    const day2Event = document.querySelector('input[name="day_2_event"]:checked')?.value || '';
    formData.set('day_2_event', day2Event);

    // Simulated progress (visual only)
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress = Math.min(progress + 10, 90);
        progressFill.style.width = `${progress}%`;
    }, 300);

    // Submit the FormData (keep as multipart/form-data!)
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
        .then(res => res.text()) // If using Google Apps Script, use `.text()`
        .then(responseText => {
            clearInterval(progressInterval);
            progressFill.style.width = '100%';
            progressText.textContent = 'Upload Complete!';

            // Optional: log server response
            console.log('Server Response:', responseText);

            setTimeout(() => {
                progressContainer.style.display = 'none';
                submitBtn.disabled = false;
                alert('Registration submitted successfully!');
                form.reset();
                toggleOtherField();
            }, 600);
        })
        .catch(error => {
            clearInterval(progressInterval);
            progressFill.style.width = '0%';
            progressText.textContent = 'Upload Failed!';
            console.error('Error:', error);

            setTimeout(() => {
                progressContainer.style.display = 'none';
                submitBtn.disabled = false;
                alert('Error submitting registration. Please try again.');
            }, 1000);
        });
});

// Navigation Buttons – keep these outside the form submit handler
document.getElementById("index").onclick = () => location.href = "index.html";
document.getElementById("Brochure").onclick = () => location.href = "brochurepage.html";
document.getElementById("goTeam").onclick = () => location.href = "team-page.html";
document.getElementById("goContact").onclick = () => location.href = "contact-page.html";