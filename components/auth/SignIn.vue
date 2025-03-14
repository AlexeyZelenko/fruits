<script setup lang="ts">
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleSignIn = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/workout');
  } catch (e: any) {
    error.value = e.message;
  }
};
</script>

<template>
  <div class="sign-in-form">
    <form @submit.prevent="handleSignIn">
      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          v-model="email"
          required
        />
      </div>
      
      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          v-model="password"
          required
        />
      </div>

      <div v-if="error" class="form-error">{{ error }}</div>

      <button type="submit" class="submit-button">
        Sign In
      </button>
    </form>
  </div>
</template>

<style lang="scss">
.sign-in-form {
  max-width: 28rem;
  margin: 0 auto;
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-group {
    label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.25rem;
    }
    
    input {
      display: block;
      width: 100%;
      margin-top: 0.25rem;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      
      &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
      }
    }
  }
  
  .form-error {
    color: #dc2626;
    font-size: 0.875rem;
  }
  
  .submit-button {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    font-size: 0.875rem;
    font-weight: 500;
    color: white;
    background-color: #2563eb;
    
    &:hover {
      background-color: #1d4ed8;
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3b82f6;
    }
  }
}
</style>