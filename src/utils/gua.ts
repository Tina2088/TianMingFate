import type { GuaResult, BaziInfo } from '@/types'

const trigrams: Record<string, string> = {
  '111': '☰', // 乾
  '011': '☱', // 兑  
  '101': '☲', // 离
  '001': '☳', // 震
  '110': '☴', // 巽
  '010': '☵', // 坎
  '100': '☶', // 艮
  '000': '☷'  // 坤
}

const guaNames: Record<string, { name: string; meaning: string; loveAdvice: string; workAdvice: string }> = {
  '☰☰': {
    name: '乾为天',
    meaning: '刚健中正，自强不息。双方皆具领导才能，志向远大。',
    loveAdvice: '两人都很强势，需要学会互相尊重，避免争夺主导权。建议多沟通，在重要决策上达成共识。',
    workAdvice: '都是领导型人才，合作时要明确分工，发挥各自优势，避免权力冲突，共创辉煌事业。'
  },
  '☷☷': {
    name: '坤为地',
    meaning: '厚德载物，包容万象。双方性格温和，善于配合。',
    loveAdvice: '关系和谐稳定，彼此包容理解。但要避免过于被动，偶尔需要主动表达情感。',
    workAdvice: '团队合作默契，但需要有人承担更多责任。建议培养决断力，提升执行效率。'
  },
  '☰☷': {
    name: '地天泰',
    meaning: '天地交泰，阴阳和合。上下和谐，万事亨通。',
    loveAdvice: '天作之合，阴阳调和。你们的关系将非常和谐美满，彼此互补，感情深厚持久。',
    workAdvice: '完美的工作搭档，一个善于规划，一个善于执行，合作必定成功。'
  },
  '☷☰': {
    name: '天地否',
    meaning: '天地不交，阴阳失调。暂时的困顿，需要耐心等待。',
    loveAdvice: '目前可能存在沟通障碍，建议多一些耐心和理解，困难终将过去。',
    workAdvice: '合作中可能遇到挫折，需要重新审视合作模式，调整策略。'
  },
  '☲☵': {
    name: '火水未济',
    meaning: '水火不容，事未成功。需要调和阴阳，寻求平衡。',
    loveAdvice: '性格差异较大，容易产生矛盾。建议多关注对方需求，学会换位思考。',
    workAdvice: '工作理念不同，需要寻找共同目标，建立有效的沟通机制。'
  },
  '☵☲': {
    name: '水火既济',
    meaning: '水火相济，阴阳调和。事业有成，功德圆满。',
    loveAdvice: '虽然性格不同，但能够互相平衡，是很好的互补关系。',
    workAdvice: '优势互补，一个理性一个感性，能够在工作中取得很好的平衡。'
  }
}

export function generateGua(bazi1: BaziInfo, bazi2: BaziInfo): GuaResult {
  const wuxing1 = bazi1.wuxing
  const wuxing2 = bazi2.wuxing
  
  const getMainElement = (wuxing: typeof wuxing1): string => {
    const max = Math.max(...Object.values(wuxing))
    const elements = Object.entries(wuxing).filter(([_, count]) => count === max)
    return elements[0]?.[0] || 'tu'
  }
  
  const element1 = getMainElement(wuxing1)
  const element2 = getMainElement(wuxing2)
  
  const elementToBinary: Record<string, string> = {
    'jin': '111', 'mu': '011', 'shui': '101', 'huo': '001', 'tu': '000'
  }
  
  let upperTrigram = elementToBinary[element1] || '111'
  let lowerTrigram = elementToBinary[element2] || '000'
  
  if (Math.random() > 0.5) {
    [upperTrigram, lowerTrigram] = [lowerTrigram, upperTrigram]
  }
  
  const upperSymbol = trigrams[upperTrigram] || '☰'
  const lowerSymbol = trigrams[lowerTrigram] || '☷'
  const guaSymbol = upperSymbol + lowerSymbol
  
  const guaInfo = guaNames[guaSymbol] || {
    name: '综合卦象',
    meaning: '阴阳调和，事在人为。',
    loveAdvice: '你们的关系需要用心经营，真诚相待必有所获。',
    workAdvice: '合作中要发挥各自优势，互相支持，共同进步。'
  }
  
  return {
    name: guaInfo.name,
    symbol: guaSymbol,
    description: guaInfo.meaning,
    loveAnalysis: guaInfo.loveAdvice,
    workAnalysis: guaInfo.workAdvice
  }
}