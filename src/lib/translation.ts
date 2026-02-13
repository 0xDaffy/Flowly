interface TranslateOptions {
  text: string
  targetLang: string
  sourceLang?: string
}

interface TranslateResponse {
  translatedText: string
  detectedSourceLang?: string
}

export class TranslationService {
  private apiKey: string
  private baseUrl = 'https://api-free.deepl.com/v2'

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_DEEPL_API_KEY || ''
  }

  async translate({
    text,
    targetLang,
    sourceLang = 'auto',
  }: TranslateOptions): Promise<TranslateResponse> {
    if (!this.apiKey) {
      throw new Error('DeepL API key is not configured')
    }

    try {
      const params = new URLSearchParams({
        text,
        target_lang: targetLang.toUpperCase(),
        ...(sourceLang !== 'auto' && { source_lang: sourceLang.toUpperCase() }),
      })

      const response = await fetch(`${this.baseUrl}/translate`, {
        method: 'POST',
        headers: {
          'Authorization': `DeepL-Auth-Key ${this.apiKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      })

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`)
      }

      const data = await response.json()
      
      return {
        translatedText: data.translations[0].text,
        detectedSourceLang: data.translations[0].detected_source_language,
      }
    } catch (error) {
      console.error('Translation error:', error)
      throw error
    }
  }

  async translateBatch(
    texts: string[],
    targetLang: string,
    sourceLang: string = 'auto'
  ): Promise<string[]> {
    const translations = await Promise.all(
      texts.map((text) =>
        this.translate({ text, targetLang, sourceLang })
      )
    )
    return translations.map((t) => t.translatedText)
  }

  getSupportedLanguages(): string[] {
    return [
      'EN', 'DE', 'FR', 'ES', 'IT', 'NL', 'PL', 'PT', 'RU',
      'JA', 'ZH', 'KO', 'AR', 'TR', 'HI', 'SV', 'DA', 'FI',
      'NO', 'CS', 'EL', 'HU', 'RO', 'SK', 'BG', 'UK', 'ID'
    ]
  }
}

export const translationService = new TranslationService()
