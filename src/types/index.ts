export interface UserInfo {
  name?: string
  birthDate: string
  birthTime: string
  gender: '男' | '女'
}

export interface PartnerInfo {
  name?: string
  birthDate: string
  birthTime: string
  gender: '男' | '女'
}

export interface ZodiacMatch {
  loveIndex: number
  workIndex: number
  description: string
}

export interface BaziInfo {
  year: string
  month: string
  day: string
  hour: string
  wuxing: {
    jin: number
    mu: number
    shui: number
    huo: number
    tu: number
  }
}

export interface GuaResult {
  name: string
  symbol: string
  description: string
  loveAnalysis: string
  workAnalysis: string
}

export interface MatchResult {
  zodiac: ZodiacMatch
  bazi: {
    compatibility: number
    analysis: string
  }
  gua: GuaResult
}