import Translator from "../translationService";

export default function () {
  return {
    home: {
      loading: true,
      translator: new Translator()
    },
    video: {
      currentSubtitles: ""
    }
  }
}