# Hello World DApp - Blockchain Application

This is a complete decentralized application (DApp) built with Truffle, Solidity, and Flutter that demonstrates blockchain interaction.

## Prerequisites

- Node.js (v14 or higher)
- Flutter SDK (v3.0 or higher)
- Truffle: `npm install -g truffle`
- Ganache: Download from https://archive.trufflesuite.com/ganache/

## Setup Instructions

### 1. Install Truffle
```bash
npm install -g truffle
```

### 2. Start Ganache
- Launch Ganache application
- It will create a local blockchain on port 7545
- Note down one of the private keys from the accounts

### 3. Configure the Project
- Open `lib/contract_linking.dart`
- Replace `YOUR_PRIVATE_KEY_HERE` with a private key from Ganache

### 4. Compile Smart Contracts
```bash
truffle compile
```

### 5. Migrate Contracts to Blockchain
```bash
truffle migrate
```

### 6. Run Tests (Optional)
```bash
truffle test
```

### 7. Install Flutter Dependencies
```bash
flutter pub get
```

### 8. Run the Flutter App
```bash
flutter run
```

## Project Structure

```
├── contracts/              # Solidity smart contracts
│   ├── HelloWorld.sol     # Main contract
│   └── Migrations.sol     # Migration contract
├── migrations/            # Deployment scripts
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js
├── test/                  # Contract tests
│   └── helloWorld.js
├── lib/                   # Flutter application
│   ├── main.dart          # App entry point
│   ├── helloUI.dart       # User interface
│   └── contract_linking.dart  # Web3 integration
├── truffle-config.js      # Truffle configuration
└── pubspec.yaml          # Flutter dependencies
```

## How It Works

1. **Smart Contract**: The `HelloWorld.sol` contract stores a name and provides a function to update it
2. **Flutter App**: Connects to the blockchain via web3dart and displays/updates the name
3. **Ganache**: Provides a local Ethereum blockchain for development and testing

## Network Configuration

- **RPC URL**: http://10.0.2.2:7545 (Android emulator)
- **WebSocket**: ws://10.0.2.2:7545/
- **Network ID**: 5777 (Ganache default)

**Note**: If running on iOS simulator or physical device, change the URLs to:
- RPC: http://127.0.0.1:7545
- WebSocket: ws://127.0.0.1:7545/

## Testing the DApp

1. Launch Ganache
2. Deploy contracts with `truffle migrate`
3. Run the Flutter app
4. You should see "Hello Unknown" initially
5. Enter your name and click "Set Name"
6. The blockchain transaction will update the name
7. Watch the transaction in Ganache

## Troubleshooting

- **Connection Error**: Make sure Ganache is running on port 7545
- **Transaction Failed**: Verify the private key is correct
- **Contract Not Found**: Run `
