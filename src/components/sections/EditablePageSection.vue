<template>
  <div class="builder"
       :class="{'builder_open': showBuilder}">
    <div class="builder__wrapper">
      <div class="builder__bg"
           @click="closeBuilder"></div>
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
                        @click="closeBuilder">
                  Close library
                </button>
              </div>
              <ul class="library__list">
                <li v-for="(item, index) of libraryList"
                    :key="index"
                    class="library__item"
                    :class="{'library__item_active': activeItem === index}"
                    @click="activeItem = index">
                  <span @click="openBlocksResult">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="library__result"
               :class="{'library__result_open': showBuilderResult}">
            <div class="library__hid-scroll">
              <div class="library__blocks">

                <div v-for="block of blockContent"
                     :key="block.id"
                     class="library__blocks-item"
                     @click="() => addLayout(block.layout)">
                  <img :src="block.prevSrc" alt="Block preview">
                  <span>{{ block.title }}</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PageConstructor :layout="layoutScheme"/>
</template>

<script>
import PageConstructor from "@/components/page/PageConstructor"

import searchIcon from '@/assets/img/svg/search.svg'

export default {
  name: "EditablePageSection",

  data() {
    return {
      searchIcon,
      showBuilder: false,
      showBuilderResult: false,
      libraryList: ['Wrapper', 'About', 'Headers', 'Paragraphs', 'Images', 'Gallery', 'Crucial phrase', 'Advantages', 'Columns', 'Dividers', 'Menus', 'Links', 'Footers', 'Video', 'Forms', 'Buttons', 'Shop', 'Team', 'Comments', 'Stages', 'Contacts', 'Social', 'Services', 'News', 'Others'],
      activeItem: null,

      allBlocks: [
        {
          id: 11,
          catId: 1,
          prevSrc: 'https://assets.tildacdn.com/files/tplicons/tpl_18.png',
          title: 'Paragraph Block',
          layout: {
            id: 1,
            type: 'Paragraph',
            title: 'Test description',
            description: '"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"',
            imgSrc: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
          },
        }
      ],

      blockContent: [],

      layoutScheme: [
        {
          id: 1,
          type: 'Paragraph',
          title: 'Test description',
          description: '"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"',
          imgSrc: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        }
      ]
    }
  },

  provide() {
    return {
      openBuilder: this.openBuilder
    }
  },

  components: {
    PageConstructor
  },

  methods: {
    openBuilder( positionIndex ) {
      console.log( positionIndex )
      this.showBuilder = true
    },
    closeBuilder() {
      this.showBuilder = false
      this.showBuilderResult = false
      setTimeout( () => {
        this.activeItem = null
        this.blockContent = []
      }, 300 )
    },
    openBlocksResult() {
      this.blockContent = this.allBlocks.filter( block => block.catId === this.activeItem )
      this.showBuilderResult = true
    },
    addLayout( layout ) {
      this.layoutScheme.push(layout)
      this.closeBuilder()
    }
  }
}
</script>