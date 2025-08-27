<template>
  <div class="user-form">
    <h2 class="subtitle">{{ title }}</h2>
    
    <div class="form-group">
      <label class="form-label">姓名 (可选)</label>
      <input 
        :value="props.modelValue.name"
        @input="updateName(($event.target as HTMLInputElement).value)"
        type="text" 
        class="form-input"
        placeholder="请输入姓名"
      />
    </div>

    <div class="form-group">
      <label class="form-label">出生日期</label>
      <input 
        :value="props.modelValue.birthDate"
        @input="updateBirthDate(($event.target as HTMLInputElement).value)"
        type="date" 
        class="form-input"
        required
      />
    </div>

    <div class="form-group">
      <label class="form-label">出生时间</label>
      <input 
        :value="props.modelValue.birthTime"
        @input="updateBirthTime(($event.target as HTMLInputElement).value)"
        type="time" 
        class="form-input"
        required
      />
    </div>

    <div class="form-group">
      <label class="form-label">性别</label>
      <div class="gender-group">
        <div 
          class="gender-option"
          :class="{ active: props.modelValue.gender === '男' }"
          @click="updateGender('男')"
        >
          男
        </div>
        <div 
          class="gender-option"
          :class="{ active: props.modelValue.gender === '女' }"
          @click="updateGender('女')"
        >
          女
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { UserInfo } from '@/types'

interface Props {
  title: string
  modelValue: UserInfo
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: UserInfo]
}>()

const updateName = (value: string) => {
  emit('update:modelValue', { ...props.modelValue, name: value })
}

const updateBirthDate = (value: string) => {
  emit('update:modelValue', { ...props.modelValue, birthDate: value })
}

const updateBirthTime = (value: string) => {
  emit('update:modelValue', { ...props.modelValue, birthTime: value })
}

const updateGender = (value: '男' | '女') => {
  emit('update:modelValue', { ...props.modelValue, gender: value })
}
</script>