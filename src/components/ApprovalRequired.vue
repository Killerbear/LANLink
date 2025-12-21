<template>
  <div class="card" style="max-width:400px;margin:2em auto;text-align:center;">
    <h2>Approval Required</h2>
    <p>Your account is not yet approved by an admin.</p>
    <p>Please wait until an admin approves your registration.</p>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';
const { logout } = useAuth();
const router = useRouter();

async function handleLogout() {
  await logout();
  window.location.href = '/';
}
</script>

<style scoped>
.card {
  background: #232b3b;
  color: #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 2px 12px #0002;
  padding: 2em 2em 1.5em 2em;
}
button {
  margin-top: 2em;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #1e40af;
}
</style>
