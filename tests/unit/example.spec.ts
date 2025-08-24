import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import HomePage from '@/views/HomePage.vue'
import { describe, expect, test, beforeEach } from 'vitest'

describe('HomePage.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('renders home vue', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.text()).toMatch('Wordle')
  })
})
