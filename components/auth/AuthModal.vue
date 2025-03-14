<script setup lang="ts">
import { ref } from 'vue';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

const emit = defineEmits(['close', 'success']);
const isLogin = ref(true);
const email = ref('');
const password = ref('');
const error = ref('');

const handleSubmit = async () => {
  try {
    if (isLogin.value) {
      await signInWithEmailAndPassword(auth, email.value, password.value);
    } else {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
    }
    emit('success');
    emit('close');
  } catch (e: any) {
    error.value = e.message;
  }
};
</script>

<template>
  <div class="auth-modal">
    <div class="auth-modal__container">
      <h2 class="auth-modal__title">
        {{ isLogin ? 'Sign In' : 'Create Account' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="auth-modal__form">
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

        <div v-if="error" class="auth-modal__error">{{ error }}</div>

        <div class="auth-modal__actions">
          <button
            type="button"
            @click="isLogin = !isLogin"
            class="auth-modal__switch-btn"
          >
            {{ isLogin ? 'Need an account?' : 'Already have an account?' }}
          </button>
          
          <button
            type="submit"
            class="auth-modal__submit-btn"
          >
            {{ isLogin ? 'Sign In' : 'Create Account' }}
          </button>
        </div>
      </form>

      <button
        @click="emit('close')"
        class="auth-modal__cancel-btn"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.auth-modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  
  &__container {
    background-color: white;
    border-radius: 0.5rem;
    padding: 2rem;
    max-width: 28rem;
    width: 100%;
    margin: 0 1rem;
  }
  
  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
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
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        
        &:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
        }
      }
    }
  }
  
  &__error {
    color: #dc2626;
    font-size: 0.875rem;
  }
  
  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
  }
  
  &__switch-btn {
    font-size: 0.875rem;
    color: #2563eb;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    
    &:hover {
      color: #1d4ed8;
    }
  }
  
  &__submit-btn {
    background-color: #2563eb;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    font-weight: 500;
    
    &:hover {
      background-color: #1d4ed8;
    }
  }
  
  &__cancel-btn {
    margin-top: 1rem;
    color: #4b5563;
    background: none;
    border: none;
    cursor: pointer;
    
    &:hover {
      color: #1f2937;
    }
  }
}
</style>