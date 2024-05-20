function showContent(index) {
    // Hide all content items
    const contentItems = document.querySelectorAll('.content-item');
    contentItems.forEach(item => item.classList.remove('active'));

    // Show the selected content item
    const selectedItem = document.getElementById(`content-${index}`);
    selectedItem.classList.add('active');
}

// Initialize by showing the first content item
document.addEventListener('DOMContentLoaded', () => {
    showContent(0);
});