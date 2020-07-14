const info= document.getElementById('info')
const student_btn = document.getElementById('students')
const courses_btn = document.getElementById('courses')
const newStudent_btn = document.getElementById('new_student')

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
student_btn.addEventListener('click', getStudents)
courses_btn.addEventListener('click', getCourses)
newStudent_btn.addEventListener('click', getForm)



// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

// ------------------------------------------
//  GET STUDENTS DATA
// ------------------------------------------
function getStudents() {
    fetch('https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json')
    .then(checkStatus)
    .then(res => res.json())
    .then(data => {
        var newHTML = '<ul class="bulleted">';
        for (var i = 0; i < data.length; i++) {
            newHTML += `<li>${data[i].name} ${data[i].last_name}`;
            if(data[i].status === true) {
                newHTML += '<span class="active"></span>';
            }else{
                newHTML += `<span class="notactive"></span>`; 
            }
            newHTML += `<div class="mt-4">`; 
            newHTML += `<button type="button" class="btn btn-outline-info" id="addBtn">Add Course</button>`;
            newHTML += `<button type="button" class="btn btn-outline-info" id="addBtn">Edit info</button>`;
            newHTML += `</div></li>`;  
            }
            newHTML += '</ul>';
            info.innerHTML = newHTML;
        })
    }

// ------------------------------------------
//  GET COURSES DATA
// ------------------------------------------
function getCourses() {
    fetch(' https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json')
    .then(checkStatus)
    .then(res => res.json())
    .then(data => {
        var newHTML = '<ul class="bulleted">';
        for (var i = 0; i < data.length; i++) {
            newHTML += `<li>${data[i].name} <span class="badge badge-pill badge-info p-2">${data[i].duration}</span>`
            newHTML += `<div><button type="button" class="btn btn-outline-info mt-4" id="addBtn">Add Student</button></div></li>`;
        }
        newHTML += '</ul>';
        info.innerHTML = newHTML;
        const add_student_btn = document.getElementById('addBtn');
        add_student_btn.addEventListener('click',addStudent);
})
}

function addStudent(){
    var newHTML = `<select id="studList"></select>`
    info.innerHTML = newHTML;
    const select = document.getElementById('studList');

    function fetchData(url) {
        return fetch(url)
                 .then(checkStatus)  
                 .then(res => res.json())
                 .catch(error => console.log('Looks like there was a problem!', error))
      }
      
      Promise.all([
        fetchData('https://dog.ceo/api/breeds/list'),
      ])
      .then(data => {
        const studList = data[0].message;
        
        generateOptions(studList);
      })
      

}


// ------------------------------------------
//  DISPLAY THE FOEM FOR NEW STUDENT
// ------------------------------------------
function getForm(e){
    e.preventDefault();
    var newHTML = `<form>
    <label for="name" >Name</label>
    <input class="border border-info" id="name" type="text">
    <label for="last_name" class="ml-4">Last name</label>
    <input class="border border-info" id="last_name" type="text">
    <button type="submit" class="btn btn-outline-info ml-4" id="submit">Submit</button>
    </form>`
    info.innerHTML = newHTML;
    const postBtn = document.getElementById('submit');
    postBtn.addEventListener('click',postData);
}

// ------------------------------------------
//  POST DATA
// ------------------------------------------

function postData(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const last_name = document.getElementById('last_name').value;
    const config = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, last_name})
  }
  fetch(' https://student-challenge-api.herokuapp.com/students', config)
  .then(checkStatus)
  .then(res => res.json())
  .then(data => console.log(data))

}