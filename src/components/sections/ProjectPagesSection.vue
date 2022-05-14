<template>
  <section class="project-pages">
    <div class="container">
      <div class="project-pages__wrapper">
        <div class="project-pages__small">
          <p>Pages:</p>
        </div>
        <div class="project-pages__pages">
          <PageList/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PageList from "@/components/PageList/PageList"

export default {
  name: "ProjectPagesSection",

  components: {
    PageList
  },
}
</script>