<template>
  <div class="card auth-card">
    <h2 class="auth-title">{{ mode==='login' ? 'Login' : 'Register' }}</h2>
    <form class="auth-form" @submit.prevent="onSubmit">
      <input v-model="email" type="email" placeholder="Email" required class="auth-input" />
      <input v-model="password" type="password" placeholder="Password" required class="auth-input" />
      <input
        v-if="mode==='register'"
        v-model="displayName"
        type="text"
        placeholder="Display Name"
        required
        pattern="[A-Za-z0-9]+"
        title="Display Name must contain only letters and numbers."
        maxlength="10"
        class="auth-input"
      />
      <div class="auth-actions">
        <button type="submit" class="auth-btn main">{{ mode==='login' ? 'Login' : 'Register' }}</button>
        <button type="button" class="auth-btn switch" @click="toggleMode">
          {{ mode==='login' ? 'Need an account?' : 'Already have an account?' }}
        </button>
      </div>
    </form>
    <p v-if="error" class="auth-error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';

const { login, register } = useAuth();
const email = ref('');
const password = ref('');
const displayName = ref('');
const error = ref('');
const mode = ref('login');

function toggleMode() {
  mode.value = mode.value === 'login' ? 'register' : 'login';
  error.value = '';
  displayName.value = '';
}

async function onSubmit() {
  error.value = '';
  try {
    if (mode.value === 'login') {
      await login(email.value, password.value);
    } else {
      const trimmed = displayName.value.trim();
      if (!trimmed) {
        error.value = 'Display Name is required.';
        return;
      }
      if (!/^[A-Za-z0-9]+$/.test(trimmed)) {
        error.value = 'Display Name must contain only letters and numbers.';
        return;
      }
      if (trimmed.length > 10) {
        error.value = 'Display Name must be at most 10 characters.';
        return;
      }
      await register(email.value, password.value, trimmed);
    }
  } catch (e) {
    error.value = e.message || 'Authentication failed.';
  }
}
</script>

<style scoped>
.card.auth-card {
  background: #232b3b;
  color: #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 2px 12px #0002;
  padding: 2.5em 2em 2em 2em;
  max-width: 400px;
  margin: 2em auto;
  text-align: center;
}
.auth-title {
  margin-bottom: 1.5em;
  font-size: 1.6em;
  font-weight: 700;
  color: #a5b4fc;
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.1em;
}
.auth-input {
  background: #20283a;
  color: #e5e7eb;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 0.85em 1em;
  font-size: 1.08em;
  outline: none;
  transition: border 0.2s;
}
.auth-input:focus {
  border: 1.5px solid #a5b4fc;
}
.auth-actions {
  display: flex;
  flex-direction: column;
  gap: 0.7em;
  margin-top: 0.5em;
}
.auth-btn {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.8em 0;
  font-size: 1.08em;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.auth-btn.main {
  background: #2563eb;
}
.auth-btn.main:hover {
  background: #1e40af;
}
.auth-btn.switch {
  background: #374151;
  color: #a5b4fc;
}
.auth-btn.switch:hover {
  background: #232b3b;
  color: #fff;
}
.auth-error {
  color: #ef4444;
  margin-top: 1.2em;
  font-size: 1.05em;
}
</style>
