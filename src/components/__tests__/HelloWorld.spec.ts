import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import quiltDesignForm from '../QuiltDesignForm.vue'

describe('Quilt design form', () => {
  it('renders properly', () => {
    const wrapper = mount(quiltDesignForm)
    expect(wrapper.text()).toContain('Blocks')
  })
})
