<script setup lang="ts">
import { ref } from 'vue';
import { useWorkoutStore } from './../stores/workout';
import { useUserStore } from './../stores/user';
import type { WorkoutPreferences, NutritionPreferences } from '~/types/index';
import AuthModal from '~/components/auth/AuthModal.vue';
import { generateNutritionPlan } from './../config/openai';

const workoutStore = useWorkoutStore();
const userStore = useUserStore();
const error = ref<string | null>(null);
const showAuthModal = ref(false);
const showNutritionPlan = ref(false);
const nutritionPlan = ref<string | null>(null);
const isGeneratingNutrition = ref(false);

const preferences = ref<WorkoutPreferences>({
  duration: 30,
  difficulty: 'beginner',
  userId: '',
  workoutType: 'strength',
  equipment: [],
  goals: [],
  focusAreas: [],
  language: 'en'
});

const nutritionPreferences = ref<NutritionPreferences>({
  goal: 'maintenance',
  dietaryRestrictions: [],
  mealsPerDay: 3,
  allergies: []
});

const equipmentOptions = [
  'Dumbbells',
  'Resistance Bands',
  'Bodyweight Only',
  'Pull-up Bar',
  'Yoga Mat',
  'Kettlebell',
  'Barbell',
  'Gym Machine'
];

const goalOptions = [
  'Weight Loss',
  'Muscle Gain',
  'Endurance',
  'Flexibility',
  'Strength',
  'General Fitness'
];

const focusAreaOptions = [
  'Full Body',
  'Upper Body',
  'Lower Body',
  'Core',
  'Back',
  'Chest',
  'Arms',
  'Legs'
];

const dietaryRestrictionOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Paleo'
];

const allergyOptions = [
  'Nuts',
  'Dairy',
  'Eggs',
  'Soy',
  'Wheat',
  'Shellfish',
  'Fish'
];

const generateNewWorkout = async () => {
  error.value = null;
  try {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      error.value = 'OpenAI API key is not configured. Please check the environment configuration.';
      return;
    }
    await workoutStore.generateWorkout(preferences.value);
  } catch (e: any) {
    error.value = 'Failed to generate workout. Please check your API key configuration and try again.';
    console.error('Workout generation error:', e);
  }
};

const generateNutrition = async () => {
  error.value = null;
  isGeneratingNutrition.value = true;
  try {
    const response = await generateNutritionPlan(nutritionPreferences.value, preferences.value.language);
    nutritionPlan.value = response;
    showNutritionPlan.value = true;
  } catch (e: any) {
    error.value = 'Failed to generate nutrition plan.';
    console.error('Nutrition generation error:', e);
  } finally {
    isGeneratingNutrition.value = false;
  }
};

const handleSaveWorkout = () => {
  if (!userStore.user) {
    showAuthModal.value = true;
  } else {
    workoutStore.saveCurrentWorkout(userStore.user.uid);
  }
};
</script>

<template>
  <div class="workout-generator">
    <h2>Generate Your Workout</h2>
    
    <div class="form-container">
      <!-- Workout Type -->
      <div class="form-group">
        <label>Workout Type</label>
        <select v-model="preferences.workoutType">
          <option value="strength">Strength Training</option>
          <option value="cardio">Cardio</option>
          <option value="hiit">HIIT</option>
          <option value="flexibility">Flexibility</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      <!-- Duration -->
      <div class="form-group">
        <label>Duration (minutes)</label>
        <input
          type="number"
          v-model="preferences.duration"
          min="10"
          max="120"
          step="5"
        />
      </div>

      <!-- Difficulty -->
      <div class="form-group">
        <label>Difficulty</label>
        <select v-model="preferences.difficulty">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <!-- Equipment -->
      <div class="form-group">
        <label>Available Equipment</label>
        <div class="checkbox-grid">
          <label
            v-for="equipment in equipmentOptions"
            :key="equipment"
            class="checkbox-label"
          >
            <input
              type="checkbox"
              :value="equipment"
              v-model="preferences.equipment"
            />
            <span>{{ equipment }}</span>
          </label>
        </div>
      </div>

      <!-- Goals -->
      <div class="form-group">
        <label>Fitness Goals</label>
        <div class="checkbox-grid">
          <label
            v-for="goal in goalOptions"
            :key="goal"
            class="checkbox-label"
          >
            <input
              type="checkbox"
              :value="goal"
              v-model="preferences.goals"
            />
            <span>{{ goal }}</span>
          </label>
        </div>
      </div>

      <!-- Focus Areas -->
      <div class="form-group">
        <label>Focus Areas</label>
        <div class="checkbox-grid">
          <label
            v-for="area in focusAreaOptions"
            :key="area"
            class="checkbox-label"
          >
            <input
              type="checkbox"
              :value="area"
              v-model="preferences.focusAreas"
            />
            <span>{{ area }}</span>
          </label>
        </div>
      </div>

      <!-- Language -->
      <div class="form-group">
        <label>Language</label>
        <select v-model="preferences.language">
          <option value="en">English</option>
          <option value="uk">Ukrainian</option>
          <option value="ru">Russian</option>
        </select>
      </div>

      <!-- Nutrition Preferences -->
      <div class="nutrition-section">
        <h3>Nutrition Preferences</h3>
        
        <div class="nutrition-form">
          <div class="form-group">
            <label>Goal</label>
            <select v-model="nutritionPreferences.goal">
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div class="form-group">
            <label>Meals per Day</label>
            <input
              type="number"
              v-model="nutritionPreferences.mealsPerDay"
              min="2"
              max="6"
            />
          </div>

          <div class="form-group">
            <label>Dietary Restrictions</label>
            <div class="checkbox-grid">
              <label
                v-for="restriction in dietaryRestrictionOptions"
                :key="restriction"
                class="checkbox-label"
              >
                <input
                  type="checkbox"
                  :value="restriction"
                  v-model="nutritionPreferences.dietaryRestrictions"
                />
                <span>{{ restriction }}</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Allergies</label>
            <div class="checkbox-grid">
              <label
                v-for="allergy in allergyOptions"
                :key="allergy"
                class="checkbox-label"
              >
                <input
                  type="checkbox"
                  :value="allergy"
                  v-model="nutritionPreferences.allergies"
                />
                <span>{{ allergy }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Generate Buttons -->
      <div class="button-group">
        <button
          @click="generateNewWorkout"
          class="btn btn-primary"
          :disabled="workoutStore.loading"
        >
          {{ workoutStore.loading ? 'Generating Workout...' : 'Generate Workout' }}
        </button>
        
        <button
          @click="generateNutrition"
          class="btn btn-secondary"
          :disabled="isGeneratingNutrition"
        >
          {{ isGeneratingNutrition ? 'Generating Plan...' : 'Generate Nutrition Plan' }}
        </button>
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>

      <!-- Workout Plan Result -->
      <div v-if="workoutStore.currentWorkoutPlan" class="result-section">
        <h3>Your Generated Workout Plan</h3>
        <div class="result-content">
          {{ workoutStore.currentWorkoutPlan }}
        </div>
        
        <div class="save-button-container">
          <button
            @click="handleSaveWorkout"
            class="btn btn-save"
          >
            Save Workout
          </button>
        </div>
      </div>

      <!-- Nutrition Plan Result -->
      <div v-if="nutritionPlan" class="result-section">
        <h3>Your Nutrition Plan</h3>
        <div class="result-content">
          {{ nutritionPlan }}
        </div>
      </div>    
      
    </div>

    <AuthModal
      v-if="showAuthModal"
      @close="showAuthModal = false"
      @success="handleSaveWorkout"
    />
  </div>
</template>

<style lang="scss">
.workout-generator {
  max-width: 42rem;
  margin: 0 auto;
  padding: 1.5rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    input, select {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
    }

    .checkbox-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;

      .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        input[type="checkbox"] {
          width: auto;
          border-radius: 0.25rem;
          border-color: #d1d5db;
        }
      }
    }
  }

  .nutrition-section {
    border-top: 1px solid #e2e8f0;
    padding-top: 1.5rem;

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .nutrition-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  .button-group {
    display: flex;
    gap: 1rem;

    .btn {
      flex: 1;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: background-color 0.2s;

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      &-primary {
        background-color: #2563eb;
        color: white;

        &:hover:not(:disabled) {
          background-color: #1d4ed8;
        }
      }

      &-secondary {
        background-color: #16a34a;
        color: white;

        &:hover:not(:disabled) {
          background-color: #15803d;
        }
      }
    }
  }

  .error-message {
    padding: 0.75rem;
    border-radius: 0.5rem;
    background-color: #fef2f2;
    color: #dc2626;
    font-size: 0.875rem;
  }

  .result-section {
    margin-top: 2rem;

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .result-content {
      background-color: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      white-space: pre-wrap;
    }

    .save-button-container {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;

      .btn-save {
        background-color: #16a34a;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;

        &:hover {
          background-color: #15803d;
        }
      }
    }
  }

  .login-prompt {
    margin-top: 1rem;
    font-size: 0.875rem;
    color: #4b5563;
    text-align: center;
  }
}
</style>