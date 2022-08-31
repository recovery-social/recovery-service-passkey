# Passkey / Webauthn Recovery Service Sample

<img src="https://recovery.social/assets/img/logo_text.svg" alt="logo" width="100"/>

## https://passkey.recovery.social

## Contract Docs

[https://docs.recovery.social/docs/standards/lsp11recoveryservice](https://docs.recovery.social/docs/standards/lsp11recoveryservice)

## Run the Program

The Program is deployed at https://passkey.recovery.social.

# Development

## Prerequisites

Download or clone the project. Open the project folder in your Terminal.
Run `npm i ` to install dependencies.

To use the Application you also need the LUKSO UP Browser Extension, which can be downloaded [here](https://docs.lukso.tech/guides/browser-extension/install-browser-extension/)

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist` directory.

## Social Recovery

With the LSP11 - Social Recovery Contract a user is able to regain access after losing access to his/her UP.

To do that the user can add different guardians who vote for a his new address to regain access.

A user is able to add Guardians like family members or friends.
But a user don’t just wants to have friends and family members as guardians.
Users should be able to authenticate themselves with 2FA, Social Logins or even Biometric Authenfication.

For this we created the LSP11 - Recovery Service Contract, which allows external operators to act as Guardians for the LSP 11 - Social Recovery in a standardized way.

With recovery.social, we offer a UI, which helps the user setup everything and interact with Recovery Services.

We also provide sample projects and docs on how to become a Recovery Service and how to communicate with the LSP11 - Recovery Service and recovery.social.

Our vision is to build an open ecosystem where anyone can build a Recovery Service. The user decides, which services he trusts to help recover his profile.
Because the number of guards (threshold), which are needed to recover, can be set individually a user don't has to trust one service alone. This makes the system very flexible and trustworthy.
