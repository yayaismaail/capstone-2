const likeCounterInPopup = (showName, newLikeCount) => {
  const popupContainer = document.getElementById('popup-container');
  if (popupContainer) {
    const likeCountDisplayer = popupContainer.querySelector('#like-count-display');
    if (likeCountDisplayer && likeCountDisplayer.getAttribute('Tvshow-data') === showName) {
      likeCountDisplayer.textContent = newLikeCount.toString();
    }
  }
};
export default { likeCounterInPopup };