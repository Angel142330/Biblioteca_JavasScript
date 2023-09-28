class Libro {
  constructor(titulo, autor, anio, genero) {
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
    this.genero = genero;
  }
}

//Libros por defecto
let libros = [
  new Libro("El corazón de la piedra","José María García López",2013,"Romántica"),
  new Libro("Salmos de víspera", "Esteban Hernández Castelló", 2003, "Ficción"),
  new Libro("La polifonía clásica", "Samuel Rubio", 1956, "Música"),
];

const tablaLibros = document.querySelector(".verLibros");
pintarLibros()

function pintarLibros() {

  const encabezados = ["Título", "Autor", "Año", "Género", ""];
  let tablaHTML = `<table><thead><tr>`;

  // Crear la fila de encabezados
  encabezados.forEach((encabezado) => {
    tablaHTML += `<th>${encabezado}</th>`; //Por cada encabeza un th
  });

  // Llenar la tabla con los datos de los libros
  libros.forEach((libro) => {
    tablaHTML += 
    `<tr>
      <td>${libro.titulo}</td>
      <td>${libro.autor}</td>
      <td>${libro.anio}</td>
      <td>${libro.genero}</td>
      <td class="acciones-cell"> 
        <img src="borrar.png" alt="Eliminar" class="eliminar-libro" style="width: 20px; cursor: pointer;">
      </td>
    </tr>`;
  });

  tablaLibros.innerHTML = tablaHTML;

  // Agregar el evento de clic a los iconos de eliminar
  const eliminarIconos = document.querySelectorAll(".eliminar-libro");
  eliminarIconos.forEach((icono, index) => {
    icono.addEventListener("click", ()=> {
      eliminarLibro(index);
    });
  });
}

/*Biblioteca para hacer el confirm chulo Sweetalert2*/ 
function eliminarLibro(index) {
  
  Swal.fire({
    title: `Estas seguro de eliminar el registro ${libros[index].titulo}`,
    text: 'Verifica antes de continuar',
    icon: 'question',
    showCancelButton:true,
    confirmButtonColor:'#3085d6',
    cancelButtonColor:'#d33',
    confirmButtonText:'Si eliminar!'
  }).then((result)=>{
    if(result.isConfirmed){
      libros.splice(index, 1);
      pintarLibros();
      Swal.fire(
        'Eliminado',
        'Se elimino su registro de la manera correcta',
        'success'
      )
    }
  })
}


// Obtener referencias a los formularios para agregar libros
const agregarBtn = document.getElementById("agregar");
const agregarLibroForm = document.getElementById("agregarLibroForm");


agregarBtn.addEventListener("click", function () {
  agregarLibroForm.style.display = "block";
  
});


// Agregar un evento para manejar la adición de libros
agregarLibroForm.addEventListener("submit", function (e) {
  e.preventDefault();//para que no recargue la

  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const anio = document.getElementById("anio").value;
  const genero = document.getElementById("genero").value;

  libros.push(new Libro(titulo, autor, anio, genero));
  pintarLibros();

  agregarLibroForm.reset();
  agregarLibroForm.style.display = "none";
  //console.log(libros);
});

