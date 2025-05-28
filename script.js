const students=[];

document.getElementById("studentForm").addEventListener("submit",function (e){
 e.preventDefault();

 const name=document.getElementById("name").value.trim();
 const lastName=document.getElementById("lastName").value.trim();
 const grade=parseFloat(document.getElementById("grade").value);

 if(!name || !lastName || isNaN(grade) || grade <1 || grade>7){
   alert("Error al Ingresar los datos")
   return  
 }
 
 const student={name,lastName,grade}
  students.push(student)
  console.log(students)
  addStudentToTable(student)

  this.reset();
});

const tableBody=document.querySelector("#studentTable tbody");
function addStudentToTable(student){
  const row=document.createElement("tr");
  row.innerHTML=`
  <td>${student.name}</td>
   <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td><button class= "delete">Eliminar</button> <button class= "modify">Modificar</button></td>
  `;

  row.querySelector(".delete").addEventListener("click", function(){
    deleteEstudiante(student, row)
  })
tableBody.appendChild(row);
calcularPromedio();
}


function deleteEstudiante(student, row){
  const index= students.indexOf(student);
  if (index > -1){
    students.splice(index, 1);
    row.remove();
    calcularPromedio()
  }
}


const promedios= document.getElementById("average")
function calcularPromedio(){
 if(students.lenght===0){
   promedios.textContent="Promedio General del Curso: N/A"
   return
 }
 var total= students.reduce((sum, student)=> sum+student.grade, 0);
 var prom= total/students.length;
 promedios.textContent="Promedio General del Curso: "+prom.toFixed(2);
}