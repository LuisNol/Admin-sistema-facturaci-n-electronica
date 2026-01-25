/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_DEV_CYCLE_SDK_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
