import { ref } from 'vue'
import { supabase } from '../lib/supabase.js'

export function useImageUpload() {
  const uploading = ref(false)
  const uploadError = ref('')

  const uploadImage = async (file, folder = 'sites') => {
    uploadError.value = ''
    if (!supabase) {
      uploadError.value = 'Supabase non configure'
      return null
    }

    uploading.value = true
    try {
      const ext = file.name.split('.').pop() || 'jpg'
      const path = `${folder}/${crypto.randomUUID()}.${ext}`
      const { error } = await supabase.storage
        .from('site-images')
        .upload(path, file, { cacheControl: '3600', upsert: false })

      if (error) {
        uploadError.value = error.message
        return null
      }

      const { data } = supabase.storage.from('site-images').getPublicUrl(path)
      return data.publicUrl
    } finally {
      uploading.value = false
    }
  }

  return { uploading, uploadError, uploadImage }
}
