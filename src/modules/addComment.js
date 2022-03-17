import totalComment from './commentCounter.js';
import { postComments, getCommentsData } from './getComments.js';

const commentTemplate = (data, container) => {
  container.innerHTML = '';
  const commentCounter = document.createElement('h2');
  commentCounter.id = 'commentCounter';
  container.appendChild(commentCounter);
  const paragraph = document.createElement('p');
  const key = Object.keys(data)[0];
  if (key === 'error') {
    commentCounter.innerHTML = 'Comment (0)';
    container.appendChild(commentCounter);
    paragraph.innerHTML = 'No comments available';
    paragraph.style.color = 'green';
    paragraph.style.fontWeight = 'bold';
    paragraph.style.fontStyle = 'italic';
    paragraph.style.marginTop = '10px';
    container.appendChild(paragraph);
  } else {
    data.forEach(((item) => {
      commentCounter.innerHTML = `Comment (${totalComment(data)})`;
      const comment = document.createElement('div');
      comment.className = 'comment';
      comment.innerHTML = `
        <p> ${item.username} : </p>
        <p> ${item.comment} </p>
        `;
      container.appendChild(comment);
    }));
  }
};
const addComment = () => {
  document.addEventListener('click', async (e) => {
    e.preventDefault();
    const commentContainer = e.target.parentNode.previousElementSibling;
    const comments = e.target.previousElementSibling;
    const title = e.target.parentNode.childNodes[0];
    const error = e.target.parentNode.parentNode.childNodes[4];
    const form = e.target.parentNode;
    const showId = Number(e.target.parentNode.parentNode.id);
    if (e.target.id === 'submit') {
      error.innerHTML = '';
      if (title.value === '' || comments.value === '') {
        error.innerHTML = 'Please enter your name and comment!!';
        error.style.color = 'red';
      } else {
        await postComments(showId, title.value, comments.value);
        const commentsData = await getCommentsData(showId);
        commentTemplate(commentsData, commentContainer);
        form.reset();
      }
    }
  });
};
export { addComment, commentTemplate };
