import { UserAPI } from "@/libs/types/user-api";
import { atom } from "jotai";

export const userAtom = atom<UserAPI | undefined | null>(undefined);
export const isAuthAtom = atom<boolean>((get) => !!get(userAtom));
export const tokenAtom = atom<string>("");
