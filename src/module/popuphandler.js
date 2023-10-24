import { addComment, fetchComments } from './commenthandler.js';

const overlayElement = document.querySelector('#popup');

function createModalTemplate(item) {
  const modalHTML = `
    <div class="modal-container">
      <div class="close-button">
        <i class="fa fa-close modal-close-button"></i>
      </div>
      <div class="item-info">
        <img src="${item.image.original}" alt="" class="main-image">
        <h2 class="item-title">${item.name}</h2>
        <div class="item-summary">
          ${item.summary}
        </div>
        <div class="item-details">
          <h2>Air date: ${item.airdate}</h2>
          <h2>Air time: ${item.airtime}</h2>
        </div>
      </div>
      <h2 class="comments-title">Comments (0)</h2>
      <ul class="comment-list">
      </ul>
      <form>
        <input type="text" name="username" class="username-input" placeholder="Your name" required/>
        <textarea name="comment" class="comment-input" rows="6" maxlength="50" placeholder="Enter your comment here..." required></textarea>
        <button type="submit" class="create-comment" data-episode-id="${item.id}">Comment</button>
      </form>
    </div>
  `;

  return modalHTML;
}

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlayElement.classList.add('active');
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlayElement.classList.remove('active');
}

const episodeButtonClickListener = async (episodeId) => {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/1/episodebynumber?season=1&number=${episodeId}`);
    if (response.status !== 200) throw new Error('Error fetching data');
    const episodeData = await response.json();
    const modalTemplate = createModalTemplate(episodeData);
    const modalElement = document.createElement('div');
    modalElement.innerHTML = modalTemplate;
    modalElement.classList.add('modal');
    const popupElement = document.getElementById('popup');
    popupElement.after(modalElement);
    openModal(modalElement);
    fetchComments(episodeId);

    const commentButtons = document.querySelectorAll('.create-comment');
    commentButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        const modal = event.target.closest('.modal');
        const username = modal.querySelector('.username-input').value;
        const comment = modal.querySelector('.comment-input').value;
        const episodeId = event.target.getAttribute('data-episode-id');
        await addComment(episodeId, username, comment);
        fetchComments(episodeId);
        modal.querySelector('form').reset();
      });
    });

    const closeButtons = document.querySelectorAll('.modal-close-button');
    closeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
      });
    });

    return response;
  } catch (error) {
    return error;
  }
};

export default episodeButtonClickListener;