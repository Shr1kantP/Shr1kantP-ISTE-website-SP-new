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

    // Disable submit and show progress
    submitBtn.disabled = true;
    progressContainer.style.display = 'block';
    progressFill.style.width = '0%';
    progressText.textContent = 'Uploading...';

    // Make sure checkboxes are correctly represented
    const day1Checks = document.querySelectorAll('input[name="day_1_events[]"]:checked');
    const day2Checks = document.querySelectorAll('input[name="day_2_events[]"]:checked');

    // Remove previously set form values to avoid duplicates
    formData.delete('day_1_event');
    formData.delete('day_2_event');

    // Debug log
    console.log("Selected Day 1 Events:");
    day1Checks.forEach(cb => console.log(cb.value));
    console.log("Selected Day 2 Events:");
    day2Checks.forEach(cb => console.log(cb.value));

    // Simulate progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 10;
        progressFill.style.width = `${progress}%`;
        if (progress >= 90) clearInterval(progressInterval);
    }, 400);

    // Send form data to GAS
    fetch(form.action, {
        method: 'POST',
        body: formData,
    })
        .then(res => res.json())
        .then(data => {
            clearInterval(progressInterval);
            progressFill.style.width = '100%';
            progressText.textContent = 'Upload Complete!';
            setTimeout(() => {
                progressContainer.style.display = 'none';
                submitBtn.disabled = false;
                if (data.result === 'success') {
                    alert('Registration submitted successfully!');
                    form.reset();
                    toggleOtherField();
                } else {
                    alert('Error submitting registration: ' + data.error);
                }
            }, 500);
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