<script setup>
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()
</script>

<template>
  <footer class="bg-ink py-8 text-sm text-stone-300">
    <div class="section-shell flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <p>© 2026 {{ t('footer.rights') }}</p>
      <p>
        {{ t('footer.sources') }}
        <a class="underline hover:text-white" href="https://madagascar-tourisme.com/" target="_blank" rel="noreferrer">
          Madagascar Tourisme
        </a>
        ·
        <a class="underline hover:text-white" href="https://parcs-madagascar.com/" target="_blank" rel="noreferrer">
          Madagascar National Parks
        </a>
        ·
        <a class="underline hover:text-white" href="https://commons.wikimedia.org/" target="_blank" rel="noreferrer">
          Wikimedia Commons
        </a>
        .
      </p>
    </div>
    <div class="section-shell mt-4">
      <a href="/admin.html" class="text-xs text-stone-500 underline hover:text-stone-300">Back-office</a>
    </div>
  </footer>
</template>
