
/*==
Thanks to Natalia!
==*/

/*==
Dom elements
==*/
let studentsCard = document.querySelector('#student-info');
let students_btn = document.querySelector('#students_btn');
let coursesCard = document.querySelector('#courses-info');
let courses_btn = document.querySelector('#courses_btn');
let addNewStudent = document.querySelector('#add_btn');
let edit_btn = document.querySelector('#editSave_btn');

/*==
Api URL
==*/
const studentsApi = 'https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json';
const coursesApi = 'https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json';
/*==
Create Arrays of Objects
==*/
let students = [];
let courses = [];
/*==
Create Class and Methods
==*/
class Enrollment {
  constructor(students, courses){
    this.students = students;
    this.courses = courses;
    students.forEach(student => {
      student.courses = [];
    });
    courses.forEach(course => {
      course.students = [];
    });
  }
/*==
Method Show Student
==*/
  showStudents = () => {
  document.querySelector('#student-info').hidden = false;
  document.querySelector('#courses-info').hidden = true;
    studentsCard.innerHTML = ''; 
    let options = '';
    courses.forEach(course => {
      options += '<option value="' + course.id + '">' + course.name +  '</option>';  
    });
    students.forEach(student => {
      let studentsCourses = '';
      student.courses.forEach( course => {
       studentsCourses += "<li>" + course.name + "</li>"    
      });
      //Students Card
      studentsCard.innerHTML += 
              `<div class="card" >
                  <div>
                    <h5>${student.name} ${student.last_name}
                   <span class="${student.status}"></span>
                    </h5>
                    <p><ul> ${studentsCourses} </ul></p>
                    <select class="courseList">
                    ${options}
                    </select>
                      <button  class="btn btn-outline-info addToCourse" type="button" studentId="${student.id}">Add Course</button>
                      <button  class="btn btn-outline-info editInfo" onclick="enrollment.editStudent('${student.id}')" type="button" studentId="${student.id}">Edit info</button>
                  </div>
              </div>`
             
    });

 // Display the courses in the addCourse button
let addCourseActions = document.querySelectorAll('.addToCourse');
    addCourseActions.forEach(el => el.addEventListener('click', () => {
      let courseId = el.parentElement.getElementsByTagName('select')[0].value;
        let studentId = el.attributes["studentId"].value;
         addCourseToStudent(courseId, studentId);
      }));


        // Check if the Student is Inactive don't show the AddCourse Button
 let status = document.getElementsByTagName('span');
       let hideButton = document.querySelectorAll('.addToCourse');
        for (let i=0; i < status.length; i++) {
          let stat = status[i];
            if (stat.classList.contains('false')){
              let buttonToHide = hideButton[i];
              buttonToHide.style.display='none';
            }
  }

 // Edit Button Event Listener and Actions, Prevent refresh page on Submit
edit_btn.addEventListener('click', (e) =>{
  e.preventDefault();
        let studentId = e.target.getAttribute('studentId');
        let name = document.getElementById('name-edit').value;
        let last_name = document.getElementById('lastName-edit').value;
        let active = document.getElementById('status-drop-down-edit').value;
        let studentToEdit = this.students.filter( student => student.id === parseInt(studentId))[0];

        studentToEdit.name = name;
        studentToEdit.last_name = last_name;
        studentToEdit.status = active;
      
        $('#modal-edit-student').modal('hide');
        this.showStudents();
      });
}
/*==
Method edit Student
==*/
  editStudent = ( studentId ) =>{
    let studentToEdit = this.students.filter( student => student.id === parseInt(studentId))[0];
  
    document.querySelector('#editSave_btn').setAttribute('studentId', studentId);
    document.getElementById('name-edit').value = studentToEdit.name;
    document.getElementById('lastName-edit').value = studentToEdit.last_name;
    document.getElementById('status-drop-down-edit').value = studentToEdit.status;
  
    $('#modal-edit-student').modal('show');
}
   //Method Show Courses
  showCourses = () =>{
  document.querySelector('#student-info').hidden = true;
  document.querySelector('#courses-info').hidden = false;
  let options = '';
  students.forEach(student => {
   //check if status is active hide inactive students
    if (student.status === true){
    options += '<option value="' + student.id + '">' + student.name + ' ' +  student.last_name +  '</option>';  
    }
  });

  coursesCard.innerHTML = ''; 
    courses.forEach(course => {
      let allStudents = '';
      course.students.forEach( student => {
        allStudents += "<li>" + student.name + ' ' +  student.last_name +"</li>"  
      });

      coursesCard.innerHTML += `
      <div class="card" >
        <h5>${course.name}<span class="duration">${course.duration}</span></h5>
        <div><ul> ${allStudents} </ul></div>
        <div class="container-button" >
          <select class="courseList">
          ${options}
          </select>
         <button class="btn btn-outline-info addStudent" type="button" courseId="${course.id}">Add Student</button>
      </div>
     </div>`
      
}); 

const addStudentActions= document.querySelectorAll('.addStudent');
  addStudentActions.forEach (el => el.addEventListener('click', (e) => {
      let studentId = el.parentElement.getElementsByTagName('select')[0].value;
      let courseId = el.attributes["courseId"].value;
      addStudentToCourse(studentId, courseId);
  }));
  }

}
//Helper Functions

//Add Course to Student
let addCourseToStudent = ( courseId, studentId ) => {
  let courseToAdd = courses.filter( course => course.id === parseInt(courseId))[0];
  let studentToAddTo = students.filter( student => student.id === parseInt(studentId))[0];
  
    if (studentToAddTo.courses.filter( course => course.id === parseInt(courseId)).length > 0)
    {
      alert('This course already exists for that student');
      return false;
    }

    else if( studentToAddTo.courses.length === 4)
    {
      alert('This student is already enrolled in 4 courses');
      return false;
    }
    else if ( courseToAdd.students.length === 3)
    {
      alert('This course has been reached the limit of 3 students');
      return false;
    }

  studentToAddTo.courses.push(courseToAdd);
  courseToAdd.students.push(studentToAddTo);
  enrollment.showStudents();
}   
//Add  Student to Course
let addStudentToCourse = ( studentId, courseId ) => {
  let studentToAdd = students.filter( student => student.id === parseInt(studentId))[0];
  let courseToAddTo = courses.filter( course => course.id === parseInt(courseId))[0];

    if (courseToAddTo.students.filter( student => student.id === parseInt(studentId)).length > 0){
      alert('This course already exists for that student');
      return false;
    }
    else if ( courseToAddTo.students.length === 3)
    {
      alert('This course has reached the limit of 3 students');
      return false;
    }
    else if ( studentToAdd.courses.length === 4)
    {
      alert('This student is already enrolled in 4 courses');
      return false;
    }
  courseToAddTo.students.push(studentToAdd);
  studentToAdd.courses.push(courseToAddTo);
  enrollment.showCourses();
}
//Add  Student to Course
let addNewStudentToStudents = () => {
  const name = document.getElementById('name').value;
  const last_name = document.getElementById('lastName').value;
  const status =  document.getElementById('status-drop-down').value;
  
  students.push({ name: name, last_name: last_name, status:status, id: students.length, courses:[]});
  
  $('#modal-new-student').modal('hide');
  $('#addNewStudentForm').trigger("reset");
  enrollment.showStudents();
}

//Get Info from the Api
const getData = async ()  => {
  let response = await fetch(studentsApi);
  students = await response.json();

  response = await fetch(coursesApi);
  courses = await response.json();

  console.log(students, courses);
 
  enrollment = new Enrollment(students, courses);

}


//Buttons  Event Listeners
students_btn.addEventListener('click', () =>{
  enrollment.showStudents();
  
});
addNewStudent.addEventListener('click', (e) =>{
  e.preventDefault();
  addNewStudentToStudents();
});
courses_btn.addEventListener('click', () =>{
  enrollment.showCourses();
});

//Call Function and instance Class
getData();

