<script setup>
import logoIcon from '@/assets/logo/logo.svg'
import logoText from '@/assets/logo/mooz-word.svg'
import userIcon from '@/assets/logo/user.svg'
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-row">
        <div class="brand">
          <img :src="logoIcon" alt="MOOZ logo" class="brand-logo" />
          <img :src="logoText" alt="MOOZ text" class="brand-text" />
        </div>

        <div class="user">
          <img :src="userIcon" alt="" class="user-icon" />
          <span>Your Name</span>
        </div>
      </div>
    </div>
  </header>
</template>
