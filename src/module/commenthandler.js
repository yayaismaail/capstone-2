const movieAPI = 'https://api.tvmaze.com/shows/1/episodes?specials=1';
const commentAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Bz8sde1lr8WmKzCrHh97/comments';
const likesAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/hHoxKTRKINp4PN8g78ys/likes';

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
  } catch (error) {
    return error;
  }
};

const fetchComments = async (itemId) => {
  try {
    const data = await fetchData(`${commentAPI}?item_id=${itemId}`);
    const commentList = document.querySelector('.comment-list');
    commentList.innerHTML = '';
    data.forEach((item) => {
      const commentEl = document.createElement('li');
      commentEl.classList.add('comment-item');
      commentEl.innerHTML = `<h3>${item.creation_date} ${item.username}: ${item.comment}</h3>`;
      commentList.appendChild(commentEl);
    });
    document.querySelector('.comments-title').innerHTML = `Comments (${data.length})`;
    return data;
  } catch (error) {
    return error;
  }
};

const addComment = async (id, userName, comment) => {
  try {
    const response = await fetchData(commentAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: id,
        username: userName,
        comment,
      }),
    });
    if (!response.ok) throw new Error(`Error creating comment for id ${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
const commentsCount = () => {
  const comments = document.querySelectorAll('.comments');
  return comments.length;
};

const itemsCount = async () => {
  const data = await fetch(movieAPI);
  const json = await data.json();
  return json;
};
export { commentsCount, itemsCount };
export { addComment, fetchComments };
export { movieAPI, commentAPI, likesAPI };