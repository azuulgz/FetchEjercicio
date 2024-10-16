// Función para hacer fetch de los usuarios
async function fetchUsers(page = 1) {
  const response = await fetch(`https://reqres.in/api/users?delay=3&page=${page}`);
  const data = await response.json();
  return data;
}

// Función para mostrar los usuarios
function displayUsers(users) {
  const userList = document.getElementById('user-list');
  userList.innerHTML = ''; // Limpiar el contenido anterior

  users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.innerHTML = `
          <div class="contenedor-fotos">
              <img src="${user.avatar}" alt="${user.first_name}">
              <p class="nombre-usuario">${user.first_name} ${user.last_name}</p>
              <p>ID: ${user.id}</p> <!-- Muestra el ID del usuario -->
              <p>${user.email}</p> <!-- Muestra el email del usuario -->
          </div>
      `;
      userList.appendChild(userDiv);
  });
}

// Función para mostrar la paginación
function displayPagination(totalPages) {
  const paginationDiv = document.getElementById('pagination');
  paginationDiv.innerHTML = ''; // Limpiar la paginación anterior

  for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = `Página ${i}`;
      button.onclick = () => loadPage(i);
      paginationDiv.appendChild(button);
  }
}

// Función para cargar una página
async function loadPage(page) {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '<div class = "placeholder-back"><span class="placeholder loader"></span></div>';

  const data = await fetchUsers(page);
  
  await new Promise(resolve => setTimeout(resolve, 500));

  displayUsers(data.data);
  displayPagination(data.total_pages);
}

loadPage(1);
