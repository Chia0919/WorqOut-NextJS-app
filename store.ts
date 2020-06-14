import { useMemo } from 'react'
import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree'

let store: IStore | undefined

const Store = types
  .model({
    userName: types.string,
    email: types.string,
    lastUpdated: types.Date,
  })
  .actions(self => {
    const login = (v: string) => {
      self.userName = v
    }

    return { login }
  })

export type IStore = Instance<typeof Store>
export type IStoreSnapshotIn = SnapshotIn<typeof Store>
export type IStoreSnapshotOut = SnapshotOut<typeof Store>

export function GlobalStore(snapshot = null) {
  const _store =
    store ??
    Store.create({
      userName: 'chia0919',
      email: 'chiapakun0919@gmail.com',
      lastUpdated: Date.now(),
    })

  if (snapshot) {
    applySnapshot(_store, snapshot)
  }
  if (typeof window === 'undefined') return _store
  if (!store) store = _store
  return store
}

export function useStore(initialState: any) {
  const store = useMemo(() => GlobalStore(initialState), [initialState])
  return store
}
