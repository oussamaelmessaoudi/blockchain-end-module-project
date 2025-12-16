# 🔗 HelloWorld Blockchain DApp

<div align="center">

![Blockchain](https://img.shields.io/badge/Blockchain-Ethereum-blue?style=for-the-badge&logo=ethereum)
![Flutter](https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)
![Truffle](https://img.shields.io/badge/Truffle-5E464D?style=for-the-badge&logo=truffle&logoColor=white)

**A decentralized application (DApp) built with Flutter and Ethereum smart contracts**

*Academic Project | Faculté des sciences d'Agadir | A.U. 2025/2026*

[Features](#-features) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Usage](#-usage) • [Testing](#-testing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Smart Contract](#-smart-contract)
- [Usage](#-usage)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

This project demonstrates the integration of blockchain technology with mobile application development. Built as part of the IT Excellence Center curriculum, it showcases a complete DApp that allows users to interact with Ethereum smart contracts through an intuitive Flutter interface.

The application implements a simple "Hello World" smart contract where users can store and retrieve their name on the Ethereum blockchain, demonstrating fundamental concepts of decentralized application development.

**Supervised by:** Pr. EL BAZZI Mohamed Salim

---

## ✨ Features

- 🔐 **Decentralized Storage**: Store data directly on the Ethereum blockchain
- 📱 **Cross-Platform UI**: Beautiful Flutter interface for Android/iOS
- 🔄 **Real-time Updates**: Live synchronization with blockchain state
- 🧪 **Comprehensive Testing**: Automated smart contract testing with Mocha/Chai
- 🎨 **Modern Design**: Material Design UI with dark theme support
- ⚡ **Local Development**: Ganache integration for rapid development
- 🔗 **Web3 Integration**: Seamless blockchain interaction via web3dart

---

## 🏗 Architecture

```
┌─────────────────────────────────────────┐
│         Flutter Application             │
│  ┌───────────────────────────────────┐  │
│  │      UI Layer (helloUI.dart)      │  │
│  └───────────────┬───────────────────┘  │
│                  │                       │
│  ┌───────────────▼───────────────────┐  │
│  │  State Management (Provider)      │  │
│  │  contract_linking.dart            │  │
│  └───────────────┬───────────────────┘  │
│                  │                       │
│  ┌───────────────▼───────────────────┐  │
│  │     web3dart Library              │  │
│  └───────────────┬───────────────────┘  │
└──────────────────┼─────────────────────┘
                   │ RPC/WebSocket
┌──────────────────▼─────────────────────┐
│      Ganache (Local Blockchain)        │
│  ┌───────────────────────────────────┐ │
│  │   HelloWorld Smart Contract       │ │
│  │   (Solidity ^0.5.9)               │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

### Frontend
- **Flutter** - Cross-platform mobile framework
- **Dart** - Programming language
- **Provider** - State management solution
- **Material Design** - UI/UX design system

### Blockchain
- **Solidity** - Smart contract programming language
- **Truffle Suite** - Development framework
- **Ganache** - Personal blockchain for testing
- **Web3dart** - Ethereum library for Dart

### Testing
- **Mocha** - JavaScript test framework
- **Chai** - Assertion library
- **Truffle Test** - Smart contract testing

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn**
- **Flutter SDK** (v3.0.0 or higher)
- **Truffle** (`npm install -g truffle`)
- **Ganache** ([Download here](https://archive.trufflesuite.com/ganache/))
- **Git**

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/oussamaelmessaoudi/blockchain-end-module-project
cd blockchain-dapp
```

### 2. Install Node Dependencies

```bash
npm install
```

### 3. Install Flutter Dependencies

```bash
flutter pub get
```

### 4. Launch Ganache

- Open Ganache application
- Create a new workspace or use Quickstart
- Ensure it's running on `http://127.0.0.1:7545`

### 5. Compile Smart Contracts

```bash
truffle compile
```

### 6. Deploy Smart Contracts

```bash
truffle migrate
```

### 7. Configure Private Key

1. Open Ganache and click the **key icon** on any account
2. Copy the private key
3. Update `lib/contract_linking.dart`:

```dart
final String _privateKey = "YOUR_PRIVATE_KEY_HERE";
```

### 8. Run the Application

```bash
flutter run
```

---

## 📁 Project Structure

```
blockchain-dapp/
├── app/                          # Application entry point
├── components/                   # Reusable UI components
├── contracts/                    # Solidity smart contracts
│   ├── HelloWorld.sol           # Main DApp contract
│   └── Migrations.sol           # Truffle migrations contract
├── lib/                         # Flutter/Dart source code
│   ├── contract_linking.dart    # Blockchain interaction logic
│   ├── helloUI.dart            # User interface
│   └── main.dart               # App entry point
├── migrations/                  # Contract deployment scripts
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js
├── test/                        # Test files
│   └── helloWorld.js           # Smart contract tests
├── src/
│   └── artifacts/              # Compiled contract ABIs
├── .gitignore
├── package.json                # Node.js dependencies
├── pubspec.yaml               # Flutter dependencies
├── truffle-config.js          # Truffle configuration
└── README.md
```

---

## 📜 Smart Contract

### HelloWorld.sol

```solidity
pragma solidity ^0.5.9;

contract HelloWorld {
    string public yourName;
    
    constructor() public {
        yourName = "Unknown";
    }
    
    function setName(string memory nm) public {
        yourName = nm;
    }
}
```

### Key Features:
- **State Variable**: `yourName` - Stores the user's name on-chain
- **Constructor**: Initializes the contract with "Unknown"
- **setName Function**: Updates the stored name (requires gas)

---

## 💻 Usage

### 1. Launch the Application

Ensure Ganache is running and contracts are deployed, then start the Flutter app:

```bash
flutter run
```

### 2. Interact with the DApp

1. **View Current Name**: The app displays the current name stored in the smart contract
2. **Set New Name**: 
   - Enter your name in the text field
   - Press the "Set Name" button
   - Wait for the transaction to be mined
   - The UI will update with your new name

### 3. Monitor Transactions

Open Ganache to observe:
- Transaction history
- Gas costs
- Block information
- Account balances

---

## 🧪 Testing

### Run Smart Contract Tests

```bash
truffle test
```

### Expected Output

```
Contract: HelloWorld
  ✓ Hello World Testing (XXXms)

1 passing (Xs)
```

### Test Coverage

The test suite verifies:
- Contract deployment
- Initial state (name = "Unknown")
- Name setting functionality
- State persistence

### Writing Additional Tests

Add new test files to the `test/` directory:

```javascript
const HelloWorld = artifacts.require("HelloWorld");

contract("HelloWorld", () => {
  it("should initialize with Unknown", async () => {
    const instance = await HelloWorld.deployed();
    const name = await instance.yourName();
    assert.equal(name, "Unknown");
  });
});
```

---

## 🔧 Configuration

### Network Configuration

Edit `truffle-config.js` to configure networks:

```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
  },
  // ... other configurations
};
```

### Flutter Configuration

Edit `pubspec.yaml` for dependencies:

```yaml
dependencies:
  flutter:
    sdk: flutter
  provider: ^4.3.3
  web3dart: ^1.2.3
  http: ^0.12.2
  web_socket_channel: ^1.2.0
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention

Follow conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `test:` - Test additions/changes
- `chore:` - Maintenance tasks

---

## 📚 Learning Resources

- [Solidity Documentation](https://docs.soliditylang.org/)
- [Truffle Suite Documentation](https://trufflesuite.com/docs/)
- [Web3dart Package](https://pub.dev/packages/web3dart)
- [Flutter Documentation](https://flutter.dev/docs)
- [Ethereum Development](https://ethereum.org/developers)

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Ganache connection failed
```
Solution: Verify Ganache is running on port 7545
Check RPC URL in contract_linking.dart matches Ganache settings
```

**Issue**: Contract deployment fails
```
Solution: Reset Ganache workspace
Run: truffle migrate --reset
```

**Issue**: Transaction reverted
```
Solution: Check account has sufficient ETH balance
Verify contract address is correct
```

---

## 📄 License

This project is part of an academic curriculum at Faculté des sciences d'Agadir.

---

## 👨‍🏫 Acknowledgments

- **Pr. EL BAZZI Mohamed Salim** - Course Supervisor
- **Centre d'Excellence IT** - Faculté des sciences d'Agadir
- **Truffle Suite** - Development framework
- **Ethereum Foundation** - Blockchain technology

---

<div align="center">

**Built with ❤️ for learning blockchain development**

*If you found this project helpful, please consider giving it a ⭐*

</div>
