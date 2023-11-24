const handleDeletePost = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document
.querySelector('.delete-post-btn')
.addEventListener('click', handleDeletePost);