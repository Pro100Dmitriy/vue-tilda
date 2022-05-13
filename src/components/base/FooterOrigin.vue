<template>
  <footer class="footer">
    <ContainerWrapper>
      <div class="footer__wrapper">
        <div class="social">
          <ul class="social__list">
            <li class="social__item">
              <router-link class="social__link" to="/">
                <svg v-sprite="{hash: 'github_icon', width: '30px', height: '30px'}"></svg>
              </router-link>
            </li>
            <li class="social__item">
              <router-link class="social__link" to="/">
                <svg v-sprite="{hash: 'telegram_icon', width: '30px', height: '30px'}"></svg>
              </router-link>
            </li>
            <li class="social__item">
              <router-link class="social__link" to="/">
                <svg v-sprite="{hash: 'vk_icon', width: '30px', height: '30px'}"></svg>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="pages">
          <ul class="pages__list">
            <li class="pages__item">
              <router-link class="pages__link" to="/">Тильда Паблишинг</router-link>
            </li>
            <li class="pages__item">
              <router-link class="pages__link" to="/">Тарифы</router-link>
            </li>
            <li class="pages__item">
              <router-link class="pages__link" to="/">Шаблоны</router-link>
            </li>
            <li class="pages__item">
              <router-link class="pages__link" to="/">#madeontilda</router-link>
            </li>
            <li class="pages__item">
              <router-link class="pages__link" to="/">Блог</router-link>
            </li>
            <li class="pages__item">
              <router-link class="pages__link" to="/">Вакансии</router-link>
            </li>
            <li class="pages__item">
              <router-link class="pages__link" to="/">Найти дизайнера</router-link>
            </li>
            <li class="pages__item">
              <router-link class="pages__link" to="/">Обучение</router-link>
            </li>
            <li class="pages__item">
              <router-link class="pages__link" to="/">Помощь</router-link>
            </li>
          </ul>
        </div>
        <div class="text">
          <p>Если у вас есть вопросы, пожалуйста, пишите: <a href="#">team@tilda.cc</a> <router-link to="/">Пользовательское соглашение</router-link></p>
        </div>
      </div>
    </ContainerWrapper>
  </footer>
</template>

<script>
export default {
  name: "FooterOrigin"
}
</script>