
const id_key = "id";

function getQuestions() {
  console.log(items);
  const id = JSON.parse(localStorage.getItem(id_key));
  localStorage.removeItem(id_key);
  
  const items = { ...localStorage };
  localStorage.setItem(id_key, JSON.stringify(id));

  return items;
  
}

function deleteQuestions(title) {
  localStorage.removeItem(title);
}

function postQuestion(data) {
  //title should be unique
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
}

export  {postQuestion, deleteQuestions, getQuestions};