const students=[];
const tableBody=document.querySelector("#studentTable tbody");
const averageDiv= document.getElementById("average");
const totalAlumn= document.getElementById("totales");
const noEximido= document.getElementById("noEximidos");
var noExim= 0
let editstudent = null;
let exim = false

document.getElementById("studentForm").addEventListener("submit",function (e){
 e.preventDefault();

 const name=document.getElementById("name").value.trim();
 const lastName=document.getElementById("lastName").value.trim();
 const grade=parseFloat(document.getElementById("grade").value);

 if(!name || !lastName || isNaN(grade) || grade <1 || grade>7){
   alert("Error al Ingresar los datos")
   return  
 }
 
 if(editstudent!==null){
  const index=students.findIndex(s=> s.id === editstudent);
  if(index!==-1){
      students[index]={id: editstudent, name, lastName, grade};
      const row=tableBody.querySelector(`tr[data-id="${editstudent}"]`);
      row.querySelector(".name-column").textContent=name;
      row.querySelector(".lastName-column").textContent=lastName;
      row.querySelector(".grade-column").textContent=grade;
  }
  editstudent=null;
} else{
  const student= {
      id: name,
      name,
      lastName,
      grade
  };

  students.push(student);
  addStudentToTable(student);
}
  calcularPromedio()
  totales()
  noEximidos()
  this.reset();
});


function addStudentToTable(student){
  const row=document.createElement("tr");
  row.setAttribute("data-id", student.id);
  row.innerHTML=`
  <td class= "name-column">${student.name}</td>
   <td class= "lastName-column">${student.lastName}</td>
    <td class= "grade-column">${student.grade}</td>
    <td><button class= "delete">Eliminar</button> <button class= "modify">Modificar</button></td>
  `;
  row.querySelector(".modify").addEventListener("click",function(){
    const estudianteEditado=students.find(s=> s.id === student.id);
    editarEstudiante(estudianteEditado);
    });
  row.querySelector(".delete").addEventListener("click", function(){
    deleteEstudiante(student.id, row)
  })
tableBody.appendChild(row);
calcularPromedio();
}

function editarEstudiante(student){
  editstudent=student.id;
  document.getElementById("name").value=student.name;
  document.getElementById("lastName").value=student.lastName;
  document.getElementById("grade").value=student.grade;
}

function deleteEstudiante(studentId, row){
  const index = students.findIndex(s => s.id === studentId);
  if (index > -1){
    students.splice(index, 1);
    row.remove();
    calcularPromedio();
    totales();
    noEximidos(exim = true);
  }
  if (editstudent === studentId) {
    editstudent = null;
    document.getElementById("studentForm").reset();
}
}

const promedios= document.getElementById("average");

function calcularPromedio(){
 if(students.length===0){
   promedios.textContent="Promedio General del Curso: N/A"
   return
 }
 var total= students.reduce((sum, student)=> sum+student.grade, 0);
 var prom= total/students.length;
 promedios.textContent= "Promedio General del Curso: "+prom.toFixed(2);
}

function totales(){
  total= students.length;
  totalAlumn.textContent="Alumnos totales= "+total;
}

function noEximidos(exim){
  const index=students.findIndex(s=> s.id);
  if(students[index].grade < 5.0){
    if(exim = true){
      noExim= noExim + 1
      noEximido.textContent= "Alumnos a realizar examen= "+noExim;
    }
    else{
      noExim= noExim + 1
     noEximido.textContent= "Alumnos a realizar examen= "+noExim;
    }
  }
}