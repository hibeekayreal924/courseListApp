// Course Constructor
function Course(course, code, unit) {
  this.course = course;
  this.code = code;
  this.unit = unit;

}
// UI Constructor 
function UI() {}


// Add Course TO List
UI.prototype.addCourseToList = function(course) {
  console.log(course);
  const list = document.getElementById('course-list');
  // Create element
  const row = document.createElement('tr');
  row.className = 'collection-item';
  //Insert cols
  row.innerHTML = `
    <td>${course.course}</td>
    <td>${course.code}</td>
    <td>${course.unit}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
  console.log(row);
}

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  console.log(div.className);
  // Get parent
  const container = document.querySelector('.contain');
  // Get form
  const form = document.querySelector('#course-form');
  // Insert alert
  container.insertBefore(div, form);

  // Timeout after 3 sec

  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);

}

//  Delete Course
UI.prototype.deleteCourse = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

// Clear Fields
UI.prototype.clearFields = function(){
  document.getElementById('courseName').value = "";
  document.getElementById('courseCode').value = "";
  document.getElementById('courseUnit').value = "";

}

// Event Listeners for add course
document.getElementById('course-form').addEventListener('submit', function(e){

  // Get form values
  const courseName = document.querySelector('#courseName').value,
        courseCode = document.querySelector('#courseCode').value,
        courseUnit = document.querySelector('#courseUnit').value

  // Instantiate course
  const course = new Course(courseName, courseCode, courseUnit);
  // Instantiate the UI

  const ui = new UI()

  // Validate 
  if(courseName === "" || courseCode === "" || courseUnit === ""){
  // Error alert
  ui.showAlert('Please fill in all fields', 'error');
  }else {
      // Add course to list
  ui.addCourseToList(course); 

  //  Show success
  ui.showAlert('Course Added!', 'success');

  // Clear fields
  ui.clearFields();
  }



  e.preventDefault();

});

// Event Listeners for delete
document.getElementById('course-list').addEventListener('click', function(e){

// Instantiate the UI
const ui = new UI()

// Delete book
ui.deleteCourse(e.target);

// Show message
ui.showAlert('Book Removed', 'success')
 
});


// // Define UI VARS

// const form = document.querySelector('#course-form');
// const taskList = document.querySelector('.collection');
// const clearBtn = document.querySelector('.clear-tasks');
// const filter = document.querySelector('#filter');
// const courseName = document.querySelector('#courseName');
// const courseCode = document.querySelector('#courseCode');


// // Load all event Listeners
// loadEventListeners();


// function loadEventListeners() {
//   // Add task event 
//   form.addEventListener('submit', addCourse);
// }


// // Add Task

// function addCourse(e){
//   if(courseName.value === ''  || courseCode.value === ''){
//     alert('Add course name & course code')
//   }else if (courseName.value !== '' && courseCode.value !== ''){
//     console.log('CORRECT')
//   }


// // create li element
// const li = document.createElement('li');
// // Add class to li
// li.className = 'collection-item';
// // Create text node and append to li
// li.appendChild(document.createTextNode(courseName.value));
// // Create text node and append to li
// li.appendChild(document.createTextNode(courseCode.value));
// // Create new link element
// const link = document.createElement('a');
// // Add class to 'a-link'
// link.className = 'delete-item secondary-content';
 
// // Add icon html
// link.innerHTML = '<i class="fa fa-remove"></i>' ;
// // Append the link to li
// li.appendChild(link);

// //console.log(li);
// // Append the li to ul
// taskList.appendChild(li);

// console.log(li.textContent);

// // CLear input
// courseName.value = '';
// courseCode.value = '';

//   e.preventDefault();
// }