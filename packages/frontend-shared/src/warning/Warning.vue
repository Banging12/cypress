<template>
  <Alert
    v-model="show"
    :dismissible="dismissible"
    status="warning"
    data-cy="warning-alert"
    icon-classes="icon-dark-orange-400 h-16px w-16px"
    :title="title"
    :icon="ErrorOutlineIcon"
  >
    <div
      ref="markdownTarget"
      v-html="markdown"
    />
    <Button
      v-if="retryable"
      class="bg-indigo-500 text-white"
      size="md"
      variant="outline"
      :prefix-icon="RefreshIcon"
      prefix-icon-class="icon-dark-white"
      @click="emits('retry')"
    >
      Retry
    </Button>
  </Alert>
</template>

<script lang="ts" setup>
import ErrorOutlineIcon from '~icons/cy/status-errored-outline_x16.svg'
import { useMarkdown } from '@packages/frontend-shared/src/composables/useMarkdown'
import Alert from '@cy/components/Alert.vue'
import Button from '@cy/components/Button.vue'
import RefreshIcon from '~icons/cy/refresh_x16'
import { computed, ref } from 'vue'
import { useVModels } from '@vueuse/core'

const emits = defineEmits<{
  (eventName: 'update:modelValue', value: boolean): void
  (eventName: 'retry'): void
}>()

const props = withDefaults(defineProps<{
  title: string
  message: string
  details?: string | null
  modelValue?: boolean
  dismissible?: boolean
  retryable?: boolean
}>(), {
  modelValue: true,
  details: undefined,
  dismissible: true,
  retryable: false,
})

const { modelValue: show } = useVModels(props, emits)
const markdownTarget = ref()

let message = computed(() => {
  if (props.details) {
    return [props.message, `        ${ props.details }`].join('\n\n')
  }

  return props.message
})

const { markdown } = useMarkdown(markdownTarget, message.value, { classes: { code: ['bg-warning-200'] } })
</script>
