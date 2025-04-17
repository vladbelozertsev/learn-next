import { UserAPI } from "@/libs/types/user-api";
import { atom } from "jotai";

export const userAtom = atom<UserAPI | undefined | null>(undefined);
export const isAuthAtom = atom<boolean>((get) => !!get(userAtom));
export const isUserLoadingAtom = atom<boolean>((get) => get(userAtom) === undefined);
export const tokenAtom = atom<{ jwt: string; exp: number } | undefined | null>(undefined);
