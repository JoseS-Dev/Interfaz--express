<template>
  <main
    class="flex flex-col lg:flex-row w-full h-176 bg-white"
  >
    <section
      class="border-b-2 lg:border-b-0 lg:border-r-2 border-blue-600 w-full lg:w-1/4 flex flex-col items-center justify-center px-5 bg-gray-100 py-8"
    >
      <article class="text-center flex flex-col gap-2 tracking-widese">
        <h1 class="text-2xl font-bold">Panel Administrativo</h1>
        <p class="text-md font-semibold">
          En esta parte administrativa podrás modificar los colores y la
          tipografía de la plantilla
        </p>
      </article>
    </section>
    <section
      class="w-full lg:w-3/4 flex flex-col items-center justify-center bg-white py-8"
    >
      <article
        class="w-full flex flex-col md:flex-row items-center justify-around gap-8"
      >
        <button
          @click="$router.push('/admin/colors')"
          class="border-2 border-black max-w-lg w-full md:w-[28rem] h-64 rounded-2xl text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200"
        >
          Cambiar Colores
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
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
          class="border-2 border-black max-w-lg w-full md:w-[28rem] h-64 rounded-2xl text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200"
        >
          Cambiar Tipografía
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
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
      </article>
    </section>
  </main>
</template>
