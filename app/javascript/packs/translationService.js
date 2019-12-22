import hanzi from "hanzi"

export default class Translator {
  constructor() {
    this.dictionary = null
  }

  loadDictionary() {
    try {
      hanzi.start()
      this.dictionary = hanzi
    } catch (error) {
      throw new Error("Failed to load the dictionary: ", error)
    }
  }

  lookUpWord(word) {
    const results = this.dictionary.definitionLookup(word, 's')
    if (results) return results[0]
    else return null
  }

  segmentSubtitle(sentence) {
    let segmented = []
    if (sentence) {
      segmented = this.dictionary.segment(sentence)
    }
    return segmented
  }
}
