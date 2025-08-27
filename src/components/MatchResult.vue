<template>
  <div class="match-result">
    <div class="result-card">
      <h3 class="subtitle">🌟 星座配对分析</h3>
      
      <div class="index-display">
        <span>爱情指数</span>
        <div class="index-bar">
          <div class="index-fill" :style="{ width: `${result.zodiac.loveIndex}%` }"></div>
        </div>
        <span>{{ result.zodiac.loveIndex }}%</span>
      </div>
      
      <div class="index-display">
        <span>工作指数</span>
        <div class="index-bar">
          <div class="index-fill" :style="{ width: `${result.zodiac.workIndex}%` }"></div>
        </div>
        <span>{{ result.zodiac.workIndex }}%</span>
      </div>
      
      <p class="description">{{ result.zodiac.description }}</p>
    </div>

    <div class="result-card">
      <h3 class="subtitle">📊 八字五行分析</h3>
      
      <div class="index-display">
        <span>五行配对指数</span>
        <div class="index-bar">
          <div class="index-fill" :style="{ width: `${result.bazi.compatibility}%` }"></div>
        </div>
        <span>{{ result.bazi.compatibility }}%</span>
      </div>
      
      <p class="description">{{ result.bazi.analysis }}</p>
    </div>

    <div class="result-card">
      <h3 class="subtitle">🎯 卦象解析</h3>
      
      <div class="gua-symbol">{{ result.gua.symbol }}</div>
      <h4 style="text-align: center; margin-bottom: 16px;">{{ result.gua.name }}</h4>
      
      <div class="gua-section">
        <h5>💕 感情运势</h5>
        <p>{{ result.gua.loveAnalysis }}</p>
      </div>
      
      <div class="gua-section">
        <h5>💼 事业合作</h5>
        <p>{{ result.gua.workAnalysis }}</p>
      </div>
    </div>

    <div class="disclaimer">
      <p>* 以上分析仅供娱乐参考，传统文化体验，不构成任何建议。真正的缘分需要双方共同努力经营。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MatchResult } from '@/types'

interface Props {
  result: MatchResult
}

defineProps<Props>()
</script>

<style scoped>
.description {
  line-height: 1.6;
  color: #4a5568;
  white-space: pre-line;
}

.gua-section {
  margin-bottom: 16px;
}

.gua-section h5 {
  margin-bottom: 8px;
  color: #2d3748;
}

.disclaimer {
  margin-top: 24px;
  padding: 16px;
  background-color: #f7fafc;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.disclaimer p {
  font-size: 14px;
  color: #718096;
  line-height: 1.4;
}
</style>