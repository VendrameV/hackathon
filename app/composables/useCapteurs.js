
import { reactive } from 'vue'

const capteurs = reactive({})

export function useCapteurs() {
  return { capteurs }
}
