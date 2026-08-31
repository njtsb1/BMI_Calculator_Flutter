# Uploading Your Flutter Project to GitHub

Project developed at Santander Bootcamp 2023 - Mobile with Flutter, under the guidance of specialist [Danilo Perez](https://github.com/perez-danilo "Danilo Perez").

A simple BMI (Body Mass Index) calculator written in Dart with a minimal project layout.  
Includes a `Person` model, BMI calculation and classification logic, console entrypoint, and unit tests.

## Features

- **Person** class with **name**, **weightKg**, **heightM** and input validation.
- BMI calculation and classification according to standard ranges.
- Console app that reads input from terminal and prints results.
- Exception handling for invalid or malformed input.
- Unit tests using the `test` package.

## Requirements

- Dart SDK 2.18 or newer.

## Setup

1. Get dependencies  

   ```bash
   dart pub get
   ```

2. Run the console app

    ```bash
    dart run bin/main.dart
    ```

3. Run tests

    ```bash
    dart test
    ```

## Example

### Input

```bash
Name: Alice
Weight (kg): 68.5
Height (m): 1.70
```

### Output

```bash
Result for Alice:
Weight: 68.5 kg
Height: 1.7 m
BMI: 23.71 - Healthy
```

## Usage Notes

The console app accepts decimal input with either ``.`` or ``,`` as the decimal separator.
Validation prevents zero or negative values for weight and height.
Classification labels are in English; adjust text if you need localized labels.

## Converting to Flutter

To adapt this project into a Flutter app:
Keep ``lib/person.dart`` and ``lib/bmi_calculator.dart`` as the domain layer.
Create UI widgets under ``lib/ui/`` that use ``TextField`` for input and display results in widgets.
Use ``Provider``, ``Riverpod``, or simple ``setState`` to manage state and trigger calculations.

## CI Example

Add ``.github/workflows/dart.yml`` to run tests on push and pull requests:

```bash
name: Dart CI

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Dart
        uses: dart-lang/setup-dart@v1
        with:
          sdk: 'stable'
      - name: Get dependencies
        run: dart pub get
      - name: Run tests
        run: dart test --reporter expanded

```

[LICENSE](/LICENSE)
