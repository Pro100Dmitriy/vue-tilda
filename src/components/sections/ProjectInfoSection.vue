<template>
  <div class="project-info">
    <ContainerLayout>
      <div class="project-info__wrapper">
        <div class="project-info__top">
          <ul class="project-info__list">
            <li class="project-info__item">
              <button class="project-info__button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="14px" height="14px">
                  <path d="M28 14c0-7.7-6.3-14-14-14S0 6.3 0 14c0 7.5 5.9 13.7 13.5 14h1C22 27.7 28 21.5 28 14zM14 25.9c-1.4-1.3-2.4-3-2.9-4.9H17c-.6 1.8-1.6 3.5-3 4.9zM10.5 19c-.3-1.3-.4-2.7-.5-4h7.9c0 1.3-.2 2.7-.5 4h-6.9zm-8.4-4h6c0 1.3.2 2.7.4 4H3.1c-.5-1.3-.9-2.6-1-4zM14 2.3c1.4 1.3 2.4 2.9 2.9 4.7h-5.8c.5-1.8 1.5-3.4 2.9-4.7zM17.5 9c.3 1.3.4 2.7.5 4h-7.9c0-1.3.2-2.7.5-4h6.9zm8.4 4h-6c0-1.3-.2-2.7-.4-4h5.4c.5 1.3.9 2.6 1 4zM8.1 13h-6c.1-1.4.5-2.7 1.1-4h5.3c-.3 1.3-.4 2.7-.4 4zm11.8 2h6c-.1 1.4-.5 2.7-1.1 4h-5.3c.3-1.3.4-2.7.4-4zm3.8-8H19c-.5-1.7-1.2-3.2-2.2-4.6C19.6 3 22 4.7 23.7 7zM11.2 2.4c-1 1.4-1.7 3-2.2 4.6H4.3C6 4.7 8.4 3 11.2 2.4zM4.3 21H9c.5 1.6 1.2 3.2 2.2 4.6-2.8-.7-5.2-2.3-6.9-4.6zm12.6 4.6c1-1.4 1.7-3 2.1-4.6h4.7c-1.7 2.3-4.1 3.9-6.8 4.6z"></path>
                </svg>
                Domen connect
              </button>
            </li>
            <li class="project-info__item">
              <button class="project-info__button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 28" width="17px" height="14px">
                  <path d="M28.1 14v10H6V14H3v13h28.1V14z"></path>
                  <path d="M15.1 19h4V9h6.3L17.1.6 8.7 9h6.4z"></path>
                </svg>
                Publishing all pages
              </button>
            </li>
            <li class="project-info__item">
              <button class="project-info__button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 28" width="20px" height="14px">
                  <path d="M9 .9H5v5H0v4h5v5h4v-5h5v-4H9zM16 5.9h24v4H16zM16 13.9h24v4H16zM16 21.9h24v4H16z"></path>
                </svg>
                Requests
              </button>
            </li>
          </ul>
          <div class="project-info__link-page">
            <p>Page URL:</p>
            <router-link to="/">http://project5505388.tilda.ws</router-link>
          </div>
        </div>
        <div class="project-info__bottom">
          <div class="project-info__title">
            <h1>{{ title }}</h1>
          </div>
          <div class="project-info__controls">
            <FillButton class="controls__settings"
                        ariaLabel="Show page Settings">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="14px" height="14px">
                <path d="M25.72 15.27l1.33-1a2.47 2.47 0 00-.75-4.29l-1.6-.51a1.72 1.72 0 01-1.15-2l.37-1.66A2.43 2.43 0 0020.62 3l-1.55.65a1.68 1.68 0 01-2.15-.79l-.77-1.51a2.41 2.41 0 00-4.3 0l-.77 1.51a1.68 1.68 0 01-2.15.79L7.38 3a2.43 2.43 0 00-3.3 2.8l.37 1.66a1.72 1.72 0 01-1.15 2l-1.6.51a2.47 2.47 0 00-.7 4.27l1.33 1a1.73 1.73 0 01.4 2.29L1.78 19a2.45 2.45 0 002.15 3.77l1.67-.08a1.7 1.7 0 011.76 1.49l.22 1.68a2.42 2.42 0 004 1.49l1.23-1.15a1.68 1.68 0 012.29 0l1.23 1.15a2.42 2.42 0 004-1.49l.22-1.68a1.7 1.7 0 011.76-1.49l1.67.08A2.45 2.45 0 0026.22 19l-.9-1.43a1.73 1.73 0 01.4-2.3zM14 20.77A6.77 6.77 0 1120.77 14 6.77 6.77 0 0114 20.77z" fill="#fa8669"></path>
              </svg>
              Settings
            </FillButton>
            <FillButton class="controls__add-page"
                        ariaLabel="Add new page">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="14px" height="14px">
                <path fill="#fff" d="M25.79 12H16V2.21h-4V12H2.21v4H12v9.79h4V16h9.79z"></path>
              </svg>
              Add new page
            </FillButton>
          </div>
        </div>
      </div>
    </ContainerLayout>
  </div>
</template>

<script>
import ContainerLayout from "@/layouts/ContainerLayout"
import FillButton from "@/components/UI/FillButton"

export default {
  name: "ProjectInfoSection",

  props: {
    title: { type: String, require: true }
  },

  components: {
    ContainerLayout, FillButton
  }
}
</script>