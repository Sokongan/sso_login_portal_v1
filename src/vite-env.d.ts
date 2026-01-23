/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_KRATOS_PUBLIC_URL: string
  readonly PUBLIC_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}