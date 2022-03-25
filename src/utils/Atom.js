import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
    key: 'storedatas', // this key is using to store data in local storage
    storage: sessionStorage, // configurate which stroage will be used to store the data
  })

export const reviewdataAtom = atom({
    key: 'reviewdata',
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const bookdataAtom = atom({
    key: 'bookdata',
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const writedataAtom = atom({
    key: 'writedata',
    default: [],
    effects_UNSTABLE: [persistAtom],
}) 