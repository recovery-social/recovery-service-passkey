type UserModel = {
    currentChallenge?: string;
    authenticators?: Authenticator[];

    pubKeyString?: string
    pvtKeyString?: string
};

type Authenticator = {
    credentialID: Buffer;
    credentialPublicKey: Buffer;
    counter: number;
    transports?: AuthenticatorTransport[];
};