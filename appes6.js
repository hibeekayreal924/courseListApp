class Course {
  constructor(course, code, unit) {
    this.course = course;
    this.code = code;
    this.unit = unit;
  }
}

class UI {

  addCourseToList(course) {
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

  showAlert(message, className) {
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

  deleteCourse(target) {
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('courseName').value = "";
    document.getElementById('courseCode').value = "";
    document.getElementById('courseUnit').value = "";
  }
}

// Local Storage Class
class Store {
  static getCourses() {
    let courses;
    if (localStorage.getItem('courses') === null) {
      courses = [];
    } else {
      // to be javascript object
      courses = JSON.parse(localStorage.getItem('courses'));
      console.log(courses)
    } 
    return courses;
    
  }

  static displayCourses() {
    const courses = Store.getCourses();
    
    courses.forEach(function(course){
      const ui = new UI;

      // Add course to UI
      ui.addCourseToList(course); 
    });
  }

  static addCourses(course) {
    // we using actual class name bcos it's a static method, we don't have to instantiate it.
    const courses = Store.getCourses();

    courses.push(course);

    localStorage.setItem('courses', JSON.stringify(courses));
  }

  static removeCourse(code) {
    console.log(code);

    const courses = Store.getCourses();

    courses.forEach(function(course, index){
      if(course.code === code) {
        courses.splice(index, 1)
      }
    });

    localStorage.setItem('courses', JSON.stringify(courses));
  }
}


// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayCourses);

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

  // Add to LS
  Store.addCourses(course);

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

// Remove from LS
Store.removeCourse(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

// Show message
ui.showAlert('Book Removed', 'success')
 
});

// Event Listeners to Clear all Courses
courseList = document.querySelector('#course-list')
clearBtn = document.querySelector('.clear-tasks');
clearBtn.addEventListener('click', clearCourses);

function clearCourses() {
  // courseList.innerHTML = '';

  while(courseList.firstChild) {
    courseList.removeChild(courseList.firstChild);

    // https:jsperf.com/innerhtml-vs-removeChild
  }

  
    // clear from LS
    clearCourseFromLocalStorage();
}

// Clear Courses from LS

function clearCourseFromLocalStorage() {
  localStorage.clear();
}

// Filter courses event
filter.addEventListener('keyup', filterCourses);


function filterCourses(e) {
  const text = e.target.value.toLowerCase();
  // console.log(course);
// query selector returns Node list while getby(id,class) returns an html list
  document.querySelectorAll('.collection-item').forEach(function(course){
    const item1 = course.children[0].textContent;
    const item2 = course.children[1].textContent;
    const item3 = course.children[2].textContent;
    if(item1.toLowerCase().indexOf(text) != -1 || item2.toLowerCase().indexOf(text) != -1 || item3.toLowerCase().indexOf(text) != -1){
      course.style.display = '';
    } else {
      course.style.display = 'none';
    }
     console.log(item1);
     
  });
}