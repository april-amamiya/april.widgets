import type { roles } from './roles'
import { tv } from 'tailwind-variants'

export const styles = tv({
  base: 'px-1 text-neutral-950',
  variants: {
    role: {
      art: 'bg-cyan-300',
      bro: 'bg-red-300',
      mod: 'bg-lime-300',
      vip: 'bg-rose-300',
      v: 'bg-slate-300',
    } as Record<ReturnType<typeof roles>[number], string>,
  },
})
