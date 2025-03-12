// Utility functions
function getUserType() {
    return localStorage.getItem('userType') || 'normal';
}

function setUserType(type) {
    localStorage.setItem('userType', type);
}

// Initialize user type if not set
if (!localStorage.getItem('userType')) {
    setUserType('normal');
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize the radio buttons based on stored user type
    const userType = getUserType();
    const radioButtons = document.querySelectorAll('input[name="userType"]');
    radioButtons.forEach((radio) => {
        if (radio.value === userType) {
            radio.checked = true;
        }

        // Add event listeners to radio buttons
        radio.addEventListener('change', function () {
            setUserType(this.value);
        });
    });

    // Like/dislike functionality
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
                // Find the parent comment item
                const commentItem = this.closest('.comment-item, .comment-item-vip');

                // Check if a reply form already exists for this comment
                const existingForm = commentItem.querySelector('.reply-form');
                if (existingForm) {
                    existingForm.remove();
                    return;
                }

                // Create a reply form
                const replyForm = createReplyForm();

                // Append the reply form to the comment content
                const commentContent = commentItem.querySelector('.comment-content');
                commentContent.appendChild(replyForm);

                // Focus on the textarea
                replyForm.querySelector('.comment-textarea').focus();
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

    // Submit button for main comment
    const submitBtn = document.querySelector('.submit-btn');
    const commentTextarea = document.querySelector('.comment-textarea');

    submitBtn.addEventListener('click', function () {
        submitComment(commentTextarea, null);
    });

    // Formatting buttons
    const formatButtons = document.querySelectorAll('.format-btn');
    formatButtons.forEach((button) => {
        button.addEventListener('click', function () {
            alert(`${this.title} formatting would be applied here`);
        });
    });
});

function createReplyForm() {
    const replyForm = document.createElement('div');
    replyForm.className = 'reply-form';

    replyForm.innerHTML = `
        <div class="comment-input">
            <textarea class="comment-textarea" placeholder="اكتب ردك..."></textarea>
            <div class="toolbar">
                <div class="formatting-tools">
                    <button class="format-btn" title="Bold"><b>B</b></button>
                    <button class="format-btn" title="Italic"><i>I</i></button>
                </div>
                <button class="reply-submit-btn">نشر الرد</button>
                <button class="reply-cancel-btn">إلغاء</button>
            </div>
        </div>
    `;

    // Add event listener to the reply submit button
    const replySubmitBtn = replyForm.querySelector('.reply-submit-btn');
    replySubmitBtn.addEventListener('click', function () {
        const textarea = replyForm.querySelector('.comment-textarea');
        const parentComment = this.closest('.comment-item, .comment-item-vip');
        submitComment(textarea, parentComment);
    });

    // Add event listener to the cancel button
    const cancelBtn = replyForm.querySelector('.reply-cancel-btn');
    cancelBtn.addEventListener('click', function () {
        replyForm.remove();
    });

    // Add event listeners to the formatting buttons
    const formatBtns = replyForm.querySelectorAll('.format-btn');
    formatBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
            alert(`${this.title} formatting would be applied here`);
        });
    });

    return replyForm;
}

function submitComment(textarea, parentComment) {
    const commentText = textarea.value.trim();

    if (!commentText) {
        alert('يرجى كتابة تعليق قبل النشر.');
        return;
    }

    // Create a new comment based on user type
    const userType = getUserType();
    const newComment = document.createElement('div');

    if (userType === 'vip') {
        newComment.className = parentComment ? 'comment-item nested-comment comment-item-vip' : 'comment-item-vip';
    } else {
        newComment.className = parentComment ? 'comment-item nested-comment' : 'comment-item';
    }

    // Get first letter of current username for avatar (in a real app, would use actual user data)
    const userInitial = 'U'; // Default initial, would use actual user's name first letter

    // Generate the HTML for the new comment
    newComment.innerHTML = `
        <div class="avatar ${userType === 'vip' ? 'avatar-vip' : ''} avatar-bg">
            <span style="color: white; font-weight: bold; display: flex; justify-content: center; align-items: center; height: 100%;">
                ${userInitial}
            </span>
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <span class="${userType === 'vip' ? 'comment-author-vip' : 'comment-author'}">
                    ${userType === 'vip' ? 'أنت (مميز)' : 'أنت'}
                </span>
                ${userType === 'vip' ? '<span class="verified-icon"></span>' : ''}
                <span class="comment-time">الآن</span>
            </div>
            <div class="${userType === 'vip' ? 'comment-body-vip' : 'comment-body'}">
                ${commentText}
            </div>
            <div class="comment-actions">
                <div class="reaction-btns">
                    <button class="action-btn">
                        <span class="action-icon">👍</span>
                        <span class="like-count">0</span>
                    </button>
                    <button class="action-btn">
                        <span class="action-icon">👎</span>
                        <span class="dislike-count">0</span>
                    </button>
                    ${
                        !parentComment
                            ? `
                    <button class="action-btn">
                        <span class="action-icon">↩️</span>
                        رد
                    </button>
                    `
                            : ''
                    }
                </div>
                <button class="action-btn more-actions">
                    <span class="action-icon">⋯</span>
                </button>
            </div>
        </div>
    `;

    // Add event listeners to the new action buttons
    const newActionButtons = newComment.querySelectorAll('.action-btn');
    newActionButtons.forEach((button) => {
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
                // Find the parent comment item
                const commentItem = this.closest('.comment-item, .comment-item-vip');

                // Check if a reply form already exists for this comment
                const existingForm = commentItem.querySelector('.reply-form');
                if (existingForm) {
                    existingForm.remove();
                    return;
                }

                // Create a reply form
                const replyForm = createReplyForm();

                // Append the reply form to the comment content
                const commentContent = commentItem.querySelector('.comment-content');
                commentContent.appendChild(replyForm);

                // Focus on the textarea
                replyForm.querySelector('.comment-textarea').focus();
            });
        }
    });

    // Add the new comment to the appropriate place
    if (parentComment) {
        // Add as a nested comment
        parentComment.querySelector('.comment-content').appendChild(newComment);

        // Remove the reply form after submitting
        const replyForm = parentComment.querySelector('.reply-form');
        if (replyForm) {
            replyForm.remove();
        }
    } else {
        // Add as a top-level comment at the beginning of the comments list
        const commentsList = document.querySelector('.comments-list');
        commentsList.insertBefore(newComment, commentsList.firstChild);
    }

    // Clear the textarea
    textarea.value = '';

    // Update comment count
    updateCommentCount();
}

function updateCommentCount() {
    const allComments = document.querySelectorAll('.comment-item, .comment-item-vip');
    const commentCountElement = document.querySelector('.comment-count');
    commentCountElement.textContent = allComments.length;
}


updateCommentCount();
// More actions dropdown functionality
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('more-actions') || e.target.parentElement.classList.contains('more-actions')) {
        // Create the dropdown menu if it doesn't exist
        let dropdown = document.querySelector('.more-actions-dropdown');

        if (dropdown) {
            // If dropdown exists, remove it (toggle functionality)
            dropdown.remove();
            return;
        }

        // Create dropdown
        dropdown = document.createElement('div');
        dropdown.className = 'more-actions-dropdown';
        dropdown.innerHTML = `
            <div class="dropdown-menu">
                <button class="dropdown-item">تعديل</button>
                <button class="dropdown-item">إبلاغ</button>
                <button class="dropdown-item delete-btn">حذف</button>
            </div>
        `;

        // Style dropdown
        const styles = `
            .more-actions-dropdown {
                position: absolute;
                background-color: #333;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                z-index: 100;
                right: 0;
                top: 100%;
                margin-top: 5px;
            }
            .dropdown-menu {
                display: flex;
                flex-direction: column;
                padding: 5px 0;
                width: 130px;
            }
            .dropdown-item {
                background: none;
                border: none;
                color: #fff;
                padding: 8px 15px;
                text-align: right;
                cursor: pointer;
            }
            .dropdown-item:hover {
                background-color: #444;
            }
            .delete-btn {
                color: #ff4d4d;
            }
        `;

        // Add styles to document
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);

        // Get the button that was clicked
        const actionBtn = e.target.closest('.more-actions');
        const commentItem = actionBtn.closest('.comment-item, .comment-item-vip');

        // Position dropdown relative to the button
        actionBtn.style.position = 'relative';
        actionBtn.appendChild(dropdown);

        // Add event listeners to dropdown items
        const editBtn = dropdown.querySelector('.dropdown-item:nth-child(1)');
        const reportBtn = dropdown.querySelector('.dropdown-item:nth-child(2)');
        const deleteBtn = dropdown.querySelector('.delete-btn');

        editBtn.addEventListener('click', function () {
            alert('تعديل التعليق');
            dropdown.remove();
        });

        reportBtn.addEventListener('click', function () {
            alert('تم الإبلاغ عن هذا التعليق');
            dropdown.remove();
        });

        deleteBtn.addEventListener('click', function () {
            if (confirm('هل أنت متأكد من حذف هذا التعليق؟')) {
                commentItem.remove();
                updateCommentCount();
            }
            dropdown.remove();
        });

        // Close dropdown when clicking outside
        setTimeout(() => {
            const closeDropdown = function (e) {
                if (
                    !dropdown.contains(e.target) &&
                    !e.target.classList.contains('more-actions') &&
                    !e.target.parentElement.classList.contains('more-actions')
                ) {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            };
            document.addEventListener('click', closeDropdown);
        }, 0);
    }
});

// Auto-resize textarea as user types
document.addEventListener('input', function (e) {
    if (e.target.classList.contains('comment-textarea')) {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }
});
