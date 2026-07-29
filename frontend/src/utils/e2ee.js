/**
 * E2EE helper using the native Web Crypto API
 */

// Helper to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
  const binary = String.fromCharCode(...new Uint8Array(buffer));
  return window.btoa(binary);
}

// Helper to convert Base64 to ArrayBuffer
function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// Generate ECDH Keypair
export async function generateKeyPair() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256"
    },
    true,
    ["deriveKey", "deriveBits"]
  );
  
  // Export public key in SPKI format
  const exportedPublic = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
  const base64PublicKey = arrayBufferToBase64(exportedPublic);

  return {
    publicKey: keyPair.publicKey,
    privateKey: keyPair.privateKey,
    publicKeyBase64: base64PublicKey
  };
}

// Import peer public key from base64
export async function importPublicKey(base64Key) {
  const arrayBuffer = base64ToArrayBuffer(base64Key);
  return await window.crypto.subtle.importKey(
    "spki",
    arrayBuffer,
    {
      name: "ECDH",
      namedCurve: "P-256"
    },
    true,
    []
  );
}

// Derive Shared AES-GCM-256 Key
export async function deriveSharedKey(localPrivateKey, peerPublicKey) {
  return await window.crypto.subtle.deriveKey(
    {
      name: "ECDH",
      public: peerPublicKey
    },
    localPrivateKey,
    {
      name: "AES-GCM",
      length: 256
    },
    true,
    ["encrypt", "decrypt"]
  );
}

// Encrypt Message String
export async function encryptMessage(text, sharedKey) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(text);
  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV is standard for GCM

  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    sharedKey,
    encodedData
  );

  return {
    iv: arrayBufferToBase64(iv),
    ciphertext: arrayBufferToBase64(ciphertext)
  };
}

// Decrypt Message String
export async function decryptMessage(encryptedData, sharedKey) {
  const ivArray = new Uint8Array(base64ToArrayBuffer(encryptedData.iv));
  const ciphertextArray = base64ToArrayBuffer(encryptedData.ciphertext);

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: ivArray
    },
    sharedKey,
    ciphertextArray
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

// Encrypt File Blob
export async function encryptFile(fileBlob, sharedKey) {
  const arrayBuffer = await fileBlob.arrayBuffer();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    sharedKey,
    arrayBuffer
  );

  return {
    iv: arrayBufferToBase64(iv),
    ciphertext: arrayBufferToBase64(ciphertext),
    name: fileBlob.name,
    type: fileBlob.type
  };
}

// Decrypt File to Blob
export async function decryptFile(encryptedData, sharedKey) {
  const ivArray = new Uint8Array(base64ToArrayBuffer(encryptedData.iv));
  const ciphertextArray = base64ToArrayBuffer(encryptedData.ciphertext);

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: ivArray
    },
    sharedKey,
    ciphertextArray
  );

  return new Blob([decrypted], { type: encryptedData.type });
}
