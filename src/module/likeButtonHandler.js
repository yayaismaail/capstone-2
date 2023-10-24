import { addLike } from './likeshandler.js';

function setupLikeButtonListeners() {
  const likeEle = document.querySelectorAll('.like');

  likeEle.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const likeID = e.target.id;
      const likeCount = e.target.nextElementSibling;
      if (e.target.classList.contains('like')) {
        const res = await addLike(likeID);
        const value = parseInt(likeCount.textContent, 10);
        e.target.classList.add('like2');
        e.target.classList.remove('like');
        if (res.status === 201) {
          likeCount.innerHTML = value + 1;
        }
      }
    });
  });
}

export default setupLikeButtonListeners;
