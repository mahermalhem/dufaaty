import { initializeSslPinning } from "react-native-ssl-public-key-pinning";

const pins = [
  {domain: "clients3.google.com", hash: "rtvWuuvL9f4vFQoXW0pZNtWwJRgYjcpWB9KgLUu+49k="},
  {domain: "www.apple.com", hash: "TrpuTtDUl5M1asrsiiwjezwA3Hpigi6bJrckIJ434ck="},
  {domain: "codepush.appcenter.ms", hash: "gUK5+9yFhXetl0R0rienTHbE4JCMJNKFkORn0jMNXEA="},
];

const pinsObject = {};

pins.forEach((pin) => {
  pinsObject[pin.domain] = {
    includeSubdomains: true,
    publicKeyHashes: [
      pin.hash,
      "N8B1Md2rahBfLo99DFMqhqsUMDDEllZ4LSGvBFVSUqs=",
      "B17DOG2jOSkRP2cnlAE4BP1YDIe++B1xqvvkyvMs2t4=",
    ],
  };
});

export const pinning = async () => {
  try {
    await initializeSslPinning(pinsObject);
    console.log("pinning done");
  } catch (error) {
    console.log("pinning erroorr",error);
  }
};