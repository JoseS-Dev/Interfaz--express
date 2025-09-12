<template>
  <main class="flex flex-col w-full h-full min-h-screen bg-white lg:flex-row">
    <section
      class="flex flex-col items-center justify-center w-full px-5 py-8 bg-gray-100 border-b-2 border-blue-600 lg:border-b-0 lg:border-r-2 lg:w-1/4"
    >
      <article class="flex flex-col text-center tracking-widese">
        <h1 class="text-2xl font-bold">Panel Administrativo</h1>
        <p class="font-semibold text-md">
          En esta parte administrativa podrás modificar los colores y la
          tipografía de la plantilla
        </p>
      </article>
    </section>
    <section
      class="flex flex-col items-center justify-center w-full py-8 bg-white lg:w-3/4"
    >
      <div
        class="grid w-full max-w-6xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-3"
      >
        <button
          @click="$router.push('/admin/colors')"
          class="border-2 border-black rounded-2xl text-2xl md:text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200 min-h-[10rem] p-6"
        >
          Cambiar Colores
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="#eee"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-palette-icon lucide-palette"
          >
            <path
              d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"
            />
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          </svg>
        </button>
        <button
          @click="$router.push('/admin/fonts')"
          class="border-2 border-black rounded-2xl text-2xl md:text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200 min-h-[10rem] p-6"
        >
          Cambiar Tipografía
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="#eee"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-file-type-icon lucide-file-type"
          >
            <path
              d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
            />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M9 13v-1h6v1" />
            <path d="M12 12v6" />
            <path d="M11 18h2" />
          </svg>
        </button>
        <button
          @click="$router.push('/admin/images')"
          class="border-2 border-black rounded-2xl text-2xl md:text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200 min-h-[10rem] p-6"
        >
          Administrar Imágenes
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
        </button>
        <button
          @click="$router.push('/admin/videos')"
          class="border-2 border-black rounded-2xl text-2xl md:text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200 min-h-[10rem] p-6"
        >
          Administrar Videos
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video">
            <polygon points="23 7 16 12 23 17 23 7"/>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
        </button>
        <button
          @click="$router.push('/admin/loader')"
          class="border-2 border-black rounded-2xl text-2xl md:text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200 min-h-[10rem] p-6"
        >
          Loader
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader">
            <path d="M12 2v4"/>
            <path d="M12 18v4"/>
            <path d="M4.93 4.93l2.83 2.83"/>
            <path d="M16.24 16.24l2.83 2.83"/>
            <path d="M2 12h4"/>
            <path d="M18 12h4"/>
            <path d="M4.93 19.07l2.83-2.83"/>
            <path d="M16.24 7.76l2.83-2.83"/>
          </svg>
        </button>
        <button
          @click="$router.push('/admin/users')"
          class="border-2 border-black rounded-2xl text-2xl md:text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200 min-h-[10rem] p-6"
        >
          Usuarios
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users">
            <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </button>
      </div>
    </section>
  </main>
</template>
