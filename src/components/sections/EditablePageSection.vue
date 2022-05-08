<template>
  <div class="builder"
       :class="{'builder_open': showBuilder}">
    <div class="builder__wrapper">
      <div class="builder__bg"></div>
      <div class="builder__content">
        <div class="library">
          <div class="library__body">
            <div class="library__hid-scroll">
              <div class="library__header">
                <div class="tittle-block">
                  <h6>Blocks library</h6>
                </div>
                <button class="search-btn">
                  <img :src="searchIcon" alt="Search icon" aria-hidden="true">
                </button>
                <button class="cross-button cross-btn"
                        aria-label="Close library"
                        @click="showBuilder = false">
                  Close library
                </button>
              </div>
              <ul class="library__list">
                <li v-for="(item, index) of libraryList"
                    :key="index"
                    class="library__item"
                    :class="{'library__item_active': activeItem === index}"
                    @click="activeItem = index">
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="library__result">
            <div class="library__hid-scroll">
              <div class="library__blocks">

                <div class="library__blocks-item">
                  <img src="https://assets.tildacdn.com/files/tplicons/tpl_18.png" alt="">
                  <span>Paragraph Block</span>
                </div>
                <div class="library__blocks-item">
                  <img src="https://assets.tildacdn.com/files/tplicons/tpl_18.png" alt="">
                  <span>Paragraph Block</span>
                </div>
                <div class="library__blocks-item">
                  <img src="https://assets.tildacdn.com/files/tplicons/tpl_18.png" alt="">
                  <span>Paragraph Block</span>
                </div>
                <div class="library__blocks-item">
                  <img src="https://assets.tildacdn.com/files/tplicons/tpl_18.png" alt="">
                  <span>Paragraph Block</span>
                </div>
                <div class="library__blocks-item">
                  <img src="https://assets.tildacdn.com/files/tplicons/tpl_18.png" alt="">
                  <span>Paragraph Block</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PageConstructor/>
</template>

<script>
import PageConstructor from "@/components/page/PageConstructor"

import searchIcon from '@/assets/img/svg/search.svg'

export default {
  name: "EditablePageSection",

  data() {
    return {
      searchIcon,
      showBuilder: true,
      libraryList: ['Wrapper', 'Gallery', 'Menus', 'Paragraph', 'links', 'Images', 'Wrapper', 'Gallery', 'Menus', 'Paragraph', 'links', 'Images', 'Wrapper', 'Gallery', 'Menus', 'Paragraph', 'links', 'Images', 'Wrapper', 'Gallery', 'Menus', 'Paragraph', 'links', 'Images', 'Wrapper', 'Gallery', 'Menus', 'Paragraph', 'links', 'Images', 'Wrapper', 'Gallery', 'Menus', 'Paragraph', 'links', 'Images'],
      activeItem: null
    }
  },

  components: {
    PageConstructor
  }
}
</script>