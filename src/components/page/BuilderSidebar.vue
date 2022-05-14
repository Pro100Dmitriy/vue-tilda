<template>
  <div class="builder"
       :class="{'builder_open': showBuilder}">
    <div class="builder__wrapper">
      <div class="builder__bg"
           @click="closeBuilder( beforeClose )"></div>
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
                        @click="closeBuilder( beforeClose )">
                  Close library
                </button>
              </div>
              <ul class="library__list">
                <li v-for="item of libraryList"
                    :key="item.id"
                    class="library__item"
                    :class="{'library__item_active': activeCategory === item.id}"
                    @click="blockVariation(item.id)">
                  <span>{{ item.title }}</span>
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
                     @click="() => addLayout(block.layout, beforeClose)">
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
</template>

<script>
import searchIcon from '@/assets/img/svg/search.svg'

export default {
  name: "BuilderSidebar",

  props: {
    showBuilder: { type: Boolean, required: true }
  },

  data() {
    return {
      searchIcon,

      showBuilderResult: false,
      activeCategory: null,
      libraryList: [{id:1, title: 'Wrapper'}, {id:2, title: 'Paragraphs'}, {id:3, title: 'About'}, {id:4, title: 'Headers'}, {id:5, title: 'Images'}, {id:6, title: 'Gallery'}, {id:7, title: 'Crucial phrase'}, {id:8, title: 'Advantages'}, {id:9, title: 'Columns'}, {id:10, title: 'Dividers'}, {id:11, title: 'Menus'}, {id:12, title: 'Links'}, {id:13, title: 'Footers'}, {id:14, title: 'Video'}, {id:15, title: 'Forms'}, {id:16, title: 'Buttons'}, {id:17, title: 'Shop'}, {id:18, title: 'Team'}, {id:19, title: 'Comments'}, {id:20, title: 'Stages'}, {id:21, title: 'Contacts'}, {id:22, title: 'Social'}, {id:23, title: 'Services'}, {id:24, title: 'News'}, {id:25, title: 'Others'}],

      allBlocks: [
        {
          id: 11,
          catId: 1,
          prevSrc: 'https://assets.tildacdn.com/files/tplicons/tpl_18.png',
          title: 'Wrapper block with image',
          layout: {
            id: 1,
            show: true,
            type: 'Wrapper',
            title: 'Test description',
            description: '"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"',
            imgSrc: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
          },
        },
        {
          id: 22,
          catId: 2,
          prevSrc: "https://assets.tildacdn.com/files/tplicons/tpl_106.png",
          title: "Paragraph block",
          layout: {
            id: 1,
            show: true,
            type: "Paragraph",
            title: "Test description",
            description: "\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\""
          }
        }
      ],
      blockContent: [],
    }
  },

  inject: ['closeBuilder', 'addLayout'],

  methods: {
    blockVariation(catId) {
      this.activeCategory = catId
      this.blockContent = this.allBlocks.filter( block => block.catId === this.activeCategory )
      this.showBuilderResult = true
    },
    beforeClose() {
      this.showBuilderResult = false
      setTimeout( () => {
        this.activeCategory = null
        this.blockContent = []
      }, 300 )
    }
  }
}
</script>