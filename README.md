# TD-ERC721-UX

clone from https://github.com/AymericNoel/erc721-ux

--- 

# erc721-ux

## Intro

Your job is to build a simple UX to visualize and manipulate ERC721 Tokens.

This repo contains the references (code + ABI) for two ERC721 tokens deployed on the Sepolia testnet, which you'll need to use.

- [Fake BAYC](contracts/FakeBAYC.sol) ( 0x1dA89342716B14602664626CD3482b47D5C2005E on Sepolia ) (get the [ABI](build/contracts/FakeBAYC.json))
- [Fake Nefturians](contracts/FakeNefturians.sol) (0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED on Sepolia ) (get the [ABI](build/contracts/FakeNefturians.json))
- [Fake Meebits](contracts/FakeMeebits.sol) (0xD1d148Be044AEB4948B48A03BeA2874871a26003 on Sepolia ) (get the [ABI](build/contracts/FakeMeebits.json))
- [Fake Meebits Claimer](contracts/FakeMeebitsClaimer.sol) (0x5341e225Ab4D29B838a813E380c28b0eFD6FBa55 on Sepolia ) (get the [ABI](build/contracts/FakeMeebitsClaimer.json))

To get started using these tokens, I suggest you use the truffle generated ABI and MyCrypto or to visit Etherscan in order to claim/buy a token for each.

## Tasks list

### Creating a js app and connecting to Ethereum

- Create a repo to host your work
- Create a React / Vue JS app and create a page /chain-info(2 pts)
- Connect your app to the Sepolia network through Metamask and display the ChainId, the last block number, and user address on /chain-info (2 pts)
- Show an error page and redirect user to it if the chain is not Sepolia (1 pt)

### Calling read and write functions

- Create a page /fakeBayc
- Display the name and the total token number (2 pts)
- Create a button to claim a new token for the current user(2 pts)
- Create a page /fakeBayc/{tokenId}
- Display the informations (image and all the attributes) referenced in the Metadata URI for token {tokenId} (2 pts)
- Show a clean error message on /fakeBayc/{tokenId} if the token does not exist (1pt)

### Paying through functions

- Create a page /fakeNefturians
- Display the minimum token price, and create a button to buy a token (this one needs to be paid for) (2 pts)
- Create a page /fakeNefturians/{userAddress}
- Display all the tokens {userAddress} id's has with nft name and description from metadata and token

### Calling a minter with a signature

- Create a page /fakeMeebits
- Create a button to mint a token.
- Read the contract
- Let the user pick a token number that wasn't minted yet
- use [signature data](claimerV1-tools) to call function `claimAToken()` on [fake meebits claimer](contracts/FakeMeebits.sol) correctly (4 pts)

### Bonus

- Deploy your static web site (2 pts)


---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
