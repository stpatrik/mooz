<template>
  <div class="user">
          <img class="user-icon" src="@/assets/logo/user.svg" alt="" />
          <span>Your Name</span>
        </div>
</template>

<script setup>
</script>

<style scoped>
.user {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.user-icon {
  width: 25px;
  height: 25px;
}
</style>
