// A helper library for WebAuthn operations.
// In a real application, the server would generate challenges and verify responses.
// Here, we simulate this process on the client side for demonstration purposes.

// Helper function to convert buffer to base64 url-safe string
const bufferToBase64URLString = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    const str = String.fromCharCode(...bytes);
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

// Helper function to convert base64 url-safe string to buffer
const base64URLStringToBuffer = (base64URLString: string): ArrayBuffer => {
    const base64 = base64URLString.replace(/-/g, '+').replace(/_/g, '/');
    const padLength = (4 - (base64.length % 4)) % 4;
    const padded = base64.padEnd(base64.length + padLength, '=');
    const binary = atob(padded);
    const buffer = new ArrayBuffer(binary.length);
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return buffer;
};

const MOCK_USER_ID = "mock-user-id-12345";
const CREDENTIAL_STORAGE_KEY = "qcbe-webauthn-credential-id";

const isWebAuthnSupported = (): boolean => {
    return window.PublicKeyCredential !== undefined && typeof window.PublicKeyCredential === 'function';
};

// --- REGISTRATION ---
const register = async (): Promise<boolean> => {
    if (!isWebAuthnSupported()) {
        throw new Error("WebAuthn is not supported by this browser.");
    }
    try {
        // In a real app, challenge should come from the server
        const challenge = new Uint8Array(32);
        crypto.getRandomValues(challenge);

        const credential = await navigator.credentials.create({
            publicKey: {
                challenge,
                rp: {
                    name: "Quantum Cube Business Engine",
                    id: window.location.hostname,
                },
                user: {
                    id: base64URLStringToBuffer(MOCK_USER_ID),
                    name: "admin@qcbe.com",
                    displayName: "M. Maynul Hasan",
                },
                pubKeyCredParams: [{ type: "public-key", alg: -7 }], // ES256
                authenticatorSelection: {
                    authenticatorAttachment: "platform", // use built-in authenticator (fingerprint, face)
                    userVerification: "required",
                    requireResidentKey: true, // Important for platform authenticators
                },
                timeout: 60000,
                attestation: "none",
            },
        });
        
        if (!credential) return false;

        // In a real app, send `credential` to the server to store the public key.
        // For this demo, we store the credential ID in localStorage to simulate registration.
        localStorage.setItem(CREDENTIAL_STORAGE_KEY, bufferToBase64URLString((credential as any).rawId));
        return true;

    } catch (error) {
        console.error("WebAuthn Registration Error:", error);
        throw error;
    }
};

// --- LOGIN ---
const login = async (): Promise<boolean> => {
    if (!isWebAuthnSupported()) {
        throw new Error("WebAuthn is not supported by this browser.");
    }
    try {
        const credentialId = localStorage.getItem(CREDENTIAL_STORAGE_KEY);
        if (!credentialId) {
            throw new Error("No biometric credential found for this user.");
        }
        
        // In a real app, challenge should come from the server
        const challenge = new Uint8Array(32);
        crypto.getRandomValues(challenge);

        const credential = await navigator.credentials.get({
            publicKey: {
                challenge,
                allowCredentials: [{
                    type: "public-key",
                    id: base64URLStringToBuffer(credentialId),
                    transports: ['internal'],
                }],
                userVerification: "required",
            },
        });

        if (!credential) return false;

        // In a real app, send the `credential` response to the server for verification.
        // The server would use the stored public key to verify the signature.
        // For this demo, a successful response from the API is considered a successful login.
        return true;
        
    } catch (error) {
        console.error("WebAuthn Login Error:", error);
        throw error;
    }
};

const isBiometricRegistered = (): boolean => {
    return localStorage.getItem(CREDENTIAL_STORAGE_KEY) !== null;
};

export const webAuthnHelpers = {
    isWebAuthnSupported,
    register,
    login,
    isBiometricRegistered
};