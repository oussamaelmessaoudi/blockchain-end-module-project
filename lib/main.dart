import 'package:flutter/material.dart';
import 'package:hello_world_dapp/contract_linking.dart';
import 'package:hello_world_dapp/helloUI.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Inserting Provider as a parent of HelloUI()
    return ChangeNotifierProvider<ContractLinking>(
      create: (_) => ContractLinking(),
      child: MaterialApp(
        title: "Hello World",
        theme: ThemeData(
            brightness: Brightness.dark,
            primaryColor: Colors.cyan[400],
            colorScheme: ColorScheme.dark(
              secondary: Colors.deepOrange[200]!,
            )),
        home: const HelloUI(),
      ),
    );
  }
}
