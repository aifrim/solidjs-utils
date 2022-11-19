import { createEffect, createSignal } from 'solid-js'

type Optional<T> = {
  [k in keyof T]: T[k] extends Partial<T[k]> ? undefined : T[k]
}

export default function createObject<TObj>(source: () => TObj) {
  const [value, set] = createSignal(source())

  createEffect(() => {
    const obj = source()

    set(() => obj)
  })

  const update = (partial: Partial<TObj>) => {
    set((prev) => ({ ...prev, ...partial }))
  }

  const remove = <TKey extends keyof Optional<TObj>>(keys: TKey | TKey[]) => {
    const obj = { ...value() }

    if (keys instanceof Array) {
      keys.forEach((key) => {
        delete obj[key]
      })
    } else {
      delete obj[keys]
    }

    set(() => obj)
  }

  return { value, set, remove, update }
}
