# 👻🏗 Ghost Scaffold-ETH (WIP)

> My personal starterkit for quick scaffold-eth Buidls

![Ghost Scaffold-ETH](https://user-images.githubusercontent.com/14002941/160478916-77d99c6c-ce21-4781-a7ca-2327476a6f1f.png)


# 🏄‍♂️ Quick Start

Prerequisites: [Node (v16 LTS)](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone/fork:

```bash
git clone https://github.com/ghostffcode/ghost-scaffold-eth.git
```

> install and start your 👷‍ Hardhat chain:

```bash
cd ghost-scaffold-eth
yarn install
yarn chain
```

> in a second terminal window, start your 📱 frontend:

```bash
cd ghost-scaffold-eth
yarn start
```

> in a third terminal window, 🛰 deploy your contract:

```bash
cd ghost-scaffold-eth
yarn deploy
```

🔏 Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`

📝 Edit your frontend `App.jsx` in `packages/react-app/src`

💼 Edit your deployment scripts in `packages/hardhat/deploy`

📱 Open http://localhost:3000 to see the app
