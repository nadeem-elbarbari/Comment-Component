// Like/dislike functionality
// Simple interactions
document.addEventListener('DOMContentLoaded', function () {
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach((button) => {
        if (
            button.querySelector('.action-icon').textContent.includes('👍') ||
            button.querySelector('.action-icon').textContent.includes('👎')
        ) {
            button.addEventListener('click', function () {
                const countSpan = this.querySelector('.like-count, .dislike-count');
                let count = parseInt(countSpan.textContent);

                if (!this.classList.contains('active')) {
                    count += 1;
                    this.classList.add('active');
                } else {
                    count -= 1;
                    this.classList.remove('active');
                }

                countSpan.textContent = count;
            });
        } else if (button.querySelector('.action-icon').textContent.includes('↩️')) {
            button.addEventListener('click', function () {
                alert('Reply would be posted here');
            });
        }
    });

    // Sort dropdown
    const sortDropdown = document.querySelector('.sort-dropdown');
    sortDropdown.addEventListener('click', function () {
        alert('Sort options would appear here');
    });

    // Show more button
    const showMoreBtn = document.querySelector('.show-more');
    showMoreBtn.addEventListener('click', function () {
        alert('More comments would load here');
    });

    // Submit button
    const submitBtn = document.querySelector('.submit-btn');
    const commentTextarea = document.querySelector('.comment-textarea');

    submitBtn.addEventListener('click', function () {
        const commentText = commentTextarea.value.trim();
        if (commentText) {
            alert(`Your comment: "${commentText}" would be posted here`);
            commentTextarea.value = '';
        } else {
            alert('Please enter a comment before submitting');
        }
    });

    // Formatting buttons
    const formatButtons = document.querySelectorAll('.format-btn');
    formatButtons.forEach((button) => {
        button.addEventListener('click', function () {
            alert(`${this.title} formatting would be applied here`);
        });
    });
});

