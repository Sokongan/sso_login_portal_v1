
export const config = {
    apiBaseUrl: import.meta.env.VITE_API_URL || '',
    publicURL: import.meta.env.PUBLIC_URL,
    identity: {
        public_url: import.meta.env.VITE_KRATOS_PUBLIC_URL
    }
};