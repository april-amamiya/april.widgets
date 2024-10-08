<script setup lang="ts">
import type { roles } from '../window/chat/roles'

import { fakerRU as faker } from '@faker-js/faker'

function users() {
  function user(role: ReturnType<typeof roles>[number]) {
    return {
      role,
      name: faker.internet.userName(),
      color: faker.internet.color(),
    }
  }

  return [
    user('bro'),
    ...Array.from({ length: faker.number.int({ min: 1, max: 10 }) }).map(() => user('vip')),
    ...Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => user('art')),
    ...Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => user('mod')),
    ...Array.from({ length: faker.number.int({ min: 1, max: 15 }) }).map(() => user('view')),
  ]
}

function messages() {
  const list = users()

  return Array.from({ length: 0 }, () => ({
    uuid: faker.string.uuid(),
    ...faker.helpers.arrayElement(list),
    text: faker.hacker.phrase(),
  }))
}

const list = reactive(messages())

function create() {
  const u = users()

  list.push({
    uuid: faker.string.uuid(),
    ...faker.helpers.arrayElement(u),
    text: faker.hacker.phrase(),
  })

  if (list.length > 50) {
    list.shift()
  }

  message()
}

function message() {
  setTimeout(create, faker.number.int({ min: 100, max: 700 }))
}

create()
</script>

<template>
  <slot :messages="list" />
</template>
