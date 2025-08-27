import type { BaziInfo } from '@/types'

const tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

const tianganWuxing: Record<string, string> = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土', 
  '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
}

const dizhiWuxing: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火',
  '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水'
}

const shichenMap: Record<string, number> = {
  '23': 0, '0': 0, '1': 1, '2': 1, '3': 2, '4': 2, '5': 3, '6': 3,
  '7': 4, '8': 4, '9': 5, '10': 5, '11': 6, '12': 6, '13': 7, '14': 7,
  '15': 8, '16': 8, '17': 9, '18': 9, '19': 10, '20': 10, '21': 11, '22': 11
}

export function calculateBazi(birthDate: string, birthTime: string): BaziInfo {
  const date = new Date(birthDate + 'T' + birthTime)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  
  const yearTiangan = tiangan[(year - 4) % 10]
  const yearDizhi = dizhi[(year - 4) % 12]
  
  const monthIndex = (month + 10) % 12
  const monthTiangan = tiangan[((year - 4) * 12 + month - 1) % 10]
  const monthDizhi = dizhi[monthIndex]
  
  const dayOffset = Math.floor((date.getTime() - new Date('1900-01-01').getTime()) / (24 * 60 * 60 * 1000))
  const dayTiangan = tiangan[(dayOffset + 9) % 10]
  const dayDizhi = dizhi[(dayOffset + 1) % 12]
  
  const shichenIndex = shichenMap[hour.toString()] ?? 0
  const hourTiangan = tiangan[(dayOffset * 12 + shichenIndex) % 10]
  const hourDizhi = dizhi[shichenIndex]
  
  const wuxingCount = { jin: 0, mu: 0, shui: 0, huo: 0, tu: 0 }
  
  ;[yearTiangan, monthTiangan, dayTiangan, hourTiangan].forEach(tg => {
    const element = tianganWuxing[tg!]
    if (element === '金') wuxingCount.jin++
    else if (element === '木') wuxingCount.mu++
    else if (element === '水') wuxingCount.shui++
    else if (element === '火') wuxingCount.huo++
    else if (element === '土') wuxingCount.tu++
  })
  
  ;[yearDizhi, monthDizhi, dayDizhi, hourDizhi].forEach(dz => {
    const element = dizhiWuxing[dz!]
    if (element === '金') wuxingCount.jin++
    else if (element === '木') wuxingCount.mu++
    else if (element === '水') wuxingCount.shui++
    else if (element === '火') wuxingCount.huo++
    else if (element === '土') wuxingCount.tu++
  })
  
  return {
    year: (yearTiangan || '甲') + (yearDizhi || '子'),
    month: (monthTiangan || '甲') + (monthDizhi || '子'),
    day: (dayTiangan || '甲') + (dayDizhi || '子'),
    hour: (hourTiangan || '甲') + (hourDizhi || '子'),
    wuxing: wuxingCount
  }
}

export function calculateBaziCompatibility(bazi1: BaziInfo, bazi2: BaziInfo): { compatibility: number; analysis: string } {
  const wuxing1 = bazi1.wuxing
  const wuxing2 = bazi2.wuxing
  
  let compatibility = 50
  let analysis = '五行配对分析：\n\n'
  
  const elementAnalysis = []
  
  if (wuxing1.jin > 0 && wuxing2.shui > 0) {
    compatibility += 10
    elementAnalysis.push('金生水：你们的关系如金生水般自然流畅')
  }
  if (wuxing1.shui > 0 && wuxing2.mu > 0) {
    compatibility += 10  
    elementAnalysis.push('水生木：彼此滋养，共同成长')
  }
  if (wuxing1.mu > 0 && wuxing2.huo > 0) {
    compatibility += 10
    elementAnalysis.push('木生火：激情四射，相互激励')
  }
  if (wuxing1.huo > 0 && wuxing2.tu > 0) {
    compatibility += 10
    elementAnalysis.push('火生土：稳定踏实的关系基础')
  }
  if (wuxing1.tu > 0 && wuxing2.jin > 0) {
    compatibility += 10
    elementAnalysis.push('土生金：务实理性，相辅相成')
  }
  
  if (wuxing1.jin > 0 && wuxing2.mu > 0) {
    compatibility -= 5
    elementAnalysis.push('金克木：可能存在观念冲突，需要包容')
  }
  if (wuxing1.mu > 0 && wuxing2.tu > 0) {
    compatibility -= 5
    elementAnalysis.push('木克土：行事风格不同，需要磨合')
  }
  
  const totalElements1 = Object.values(wuxing1).reduce((a, b) => a + b, 0)
  const totalElements2 = Object.values(wuxing2).reduce((a, b) => a + b, 0)
  
  if (totalElements1 === totalElements2) {
    compatibility += 5
    elementAnalysis.push('五行均衡度相近，容易产生共鸣')
  }
  
  compatibility = Math.min(compatibility, 100)
  compatibility = Math.max(compatibility, 0)
  
  analysis += elementAnalysis.join('\n') || '你们的五行搭配较为平衡，关系发展需要时间磨合。'
  
  return { compatibility, analysis }
}