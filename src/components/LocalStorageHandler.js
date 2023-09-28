
const id_key = "id";

function getAllQuestions() {
  console.log(items);
  const id = JSON.parse(localStorage.getItem(id_key));
  localStorage.removeItem(id_key);
  
  const items = { ...localStorage };
  localStorage.setItem(id_key, JSON.stringify(id));

  return items;
  
}

function getQuestion(title) {
  //This if is not really necessary and I added it before reading the requirement
  if (localStorage.getItem(title) === null) {
    return null;
  }
  return JSON.parse(localStorage.getItem(title));
}

function deleteQuestions(title) {
  if (localStorage.getItem(title) === null) {
    return "no such item";
  }
  localStorage.removeItem(title);
  return "item " + title + " removed.";
}

function postQuestion(data) {
  //title should be unique
  if (localStorage.getItem(data.title) !== null) {
    //return "Question with the same title already exists";
    alert("Question with the same title already exists");
    return;
  }
  console.log(data);  
  const id = JSON.parse(localStorage.getItem(id_key));
  console.log(typeof(data));
  let curr_id = 1;
  if (id !== null) {
    curr_id = id + 1;
  }
  localStorage.setItem(id_key, JSON.stringify(curr_id));
  data.id = curr_id
  console.log(data);
  const jsonData = JSON.stringify(data);

  localStorage.setItem(data.title, jsonData);
  window.location.reload();
  return "Question added";
}

export  {postQuestion, deleteQuestions, getAllQuestions, getQuestion};