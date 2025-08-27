<template>
  <div class="container">
    <h1 class="title">天命缘分</h1>
    <p style="text-align: center; color: #a0aec0; font-size: 14px; margin-bottom: 8px;">
      @TinaAI
    </p>
    <p style="text-align: center; color: #718096; margin-bottom: 32px;">
      传统命理与星座配对 · 探索你们的缘分奥秘
    </p>
    
    <div v-if="!showResult">
      <UserForm 
        :modelValue="user1"
        @update:modelValue="user1 = $event" 
        title="👤 你的信息"
      />
      
      <UserForm 
        :modelValue="user2"
        @update:modelValue="user2 = $event"
        title="💑 TA的信息"
      />
      
      <button 
        class="btn"
        :disabled="!isFormValid"
        @click="analyzeMatch"
      >
        {{ isAnalyzing ? '分析中...' : '开始缘分分析' }}
      </button>
    </div>
    
    <div v-else>
      <MatchResult :result="matchResult!" />
      
      <button 
        class="btn" 
        style="margin-top: 24px;"
        @click="resetForm"
      >
        重新分析
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import UserForm from './components/UserForm.vue'
import MatchResult from './components/MatchResult.vue'
import type { UserInfo, MatchResult as MatchResultType } from './types'
import { getZodiacSign, calculateZodiacMatch } from './utils/zodiac'
import { calculateBazi, calculateBaziCompatibility } from './utils/bazi'
import { generateGua } from './utils/gua'

const user1 = ref<UserInfo>({
  name: '',
  birthDate: '',
  birthTime: '',
  gender: '男'
})

const user2 = ref<UserInfo>({
  name: '',
  birthDate: '',
  birthTime: '',
  gender: '女'
})

const showResult = ref(false)
const isAnalyzing = ref(false)
const matchResult = ref<MatchResultType | null>(null)

const isFormValid = computed(() => {
  return user1.value.birthDate.length > 0 && user1.value.birthTime.length > 0 && 
         user2.value.birthDate.length > 0 && user2.value.birthTime.length > 0
})

async function analyzeMatch() {
  if (!isFormValid.value) return
  
  isAnalyzing.value = true
  
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const zodiac1 = getZodiacSign(user1.value.birthDate)
  const zodiac2 = getZodiacSign(user2.value.birthDate)
  const zodiacMatch = calculateZodiacMatch(zodiac1, zodiac2)
  
  const bazi1 = calculateBazi(user1.value.birthDate, user1.value.birthTime)
  const bazi2 = calculateBazi(user2.value.birthDate, user2.value.birthTime)
  const baziMatch = calculateBaziCompatibility(bazi1, bazi2)
  
  const gua = generateGua(bazi1, bazi2)
  
  matchResult.value = {
    zodiac: zodiacMatch,
    bazi: baziMatch,
    gua: gua
  }
  
  isAnalyzing.value = false
  showResult.value = true
}

function resetForm() {
  showResult.value = false
  matchResult.value = null
  user1.value = {
    name: '',
    birthDate: '',
    birthTime: '',
    gender: '男'
  }
  user2.value = {
    name: '',
    birthDate: '',
    birthTime: '',
    gender: '女'
  }
}
</script>