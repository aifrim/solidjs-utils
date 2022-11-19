import { createSignal, Accessor, createEffect, JSX } from 'solid-js'

export default function createStyles<T extends JSX.CSSProperties>(
  obj: () => T
): Accessor<T> {
  const [signal, setSignal] = createSignal(obj())

  createEffect(() => {
    const ret = obj()

    setSignal(() => ret)
  })

  return signal
}
