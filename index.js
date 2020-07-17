//Buttons Id
let button_s = document.querySelector('#students');
let button_c = document.querySelector('#courses');
let button_n = document.querySelector('#new');
// Api URL
let api_Student = 'https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json';
let api_Courses = 'https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json';


//Fetch api STUDENT BUTTON
button_s.addEventListener('click', function(){
    fetch(api_Student)
        .then(response => response.json())
        .then(data => {
            let section = document.getElementById('student-info');
            section.textContent = '';
            let info = data;
            for (let i = 0; i < info.length; i++){
                let nameValue = info[i].name;
                let lastValue = info[i].last_name;
                let status = info[i].status;   
            let div = `<div class="card" >
                        <h4>${info[i].name} ${info[i].last_name}<span class="${info[i].status}"></span></h4>
                         <ol>
          <li>Javascript for Beginners</li>
          <li>Php with Mango and Salsa</li>
          <li>React 3</li>
          <li>Javascript and the DOM</li>
        </ol>
        <p>
          <button class="btn btn-outline-info" type="button" data-toggle="collapse" data-target="#Edit_Info"
            aria-expanded="false" aria-controls="collapseExample">Edit info</button>
          <button class="btn btn-outline-info" type="button" data-toggle="collapse" data-target="#Add_Course"
            aria-expanded="false" aria-controls="collapseExample">
            Add course
          </button>
        </p>
        <div class="collapse" id="Edit_Info">
          <div class="card card-body">
            <form>
              <div class="row">
                <div class="col">
                  <input type="text" class="form-control" placeholder="First name">
                </div>
                <div class="col">
                  <input type="text" class="form-control" placeholder="Last name">
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
                                    
        </div>`
            section.innerHTML += div
                console.log(info);
            }
                    })                    
//catch error

});


//Class Enrollment
class Enrollment {
  constructor(){
    this.student_Array = [];
    this.courses_Array = [];
    this.newStudent_Array = [];
  }
//Methods
//addCourse() receives a list of available courses from the object curses
    addCourse(course) {
      this.courses_Array.push(course)
    }
//addStudent() receives a list of students from the object students
    addStudent(students) {
        this.student_Array.push(students)
    }
//editStudent() receives arguments from the students objects and update them
    editInfo(name, last_name, status){
        this.Student.name = name;
        this.Student.name = last_name;
        this.Student.name = status;
    }
    //addNewStudent() receives arguments from the input and put them to the json file
    addNewStudent(){};
  
}

//Class Student
class Student {
  constructor( name, last_name, status){
    this.name = name;
    this.last_name = last_name;
    this.status = status;
    this.curses_enrolled = null;
  }
}
//Class Curse
class Course {
  constructor( name, duration){
    this.name = name;
    this.duration = duration;
    this.students_enrolled = null;
  }
}
//Class Student
class new_Student {
  constructor( name, last_name, status, id){
    this.name = name;
    this.last_name = last_name;
    this.status = status;
    this.id = id;
  }
}

//Objects

const enrollment = new Enrollment();
console.log(enrollment);

const students = new Student('Elle', 'Young', true);
console.log(students);

const course = new Course('JavaScript', 12);
console.log(course);

const newStudent = new new_Student('Dana', 'Smith', true, 2022);
console.log(newStudent);

enrollment.addStudent(students);
enrollment.addCourse(course);
console.log(enrollment);

