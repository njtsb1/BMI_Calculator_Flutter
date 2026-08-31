import 'dart:io';
import 'package:bmi_calculator/person.dart';
import 'package:bmi_calculator/bmi_calculator.dart';

void main() {
  stdout.writeln('=== BMI Calculator ===');

  try {
    stdout.write('Enter name: ');
    final name = stdin.readLineSync();
    if (name == null || name.trim().isEmpty) {
      throw FormatException('Name cannot be empty.');
    }

    stdout.write('Enter weight in kilograms (e.g., 70.5): ');
    final weightInput = stdin.readLineSync();
    if (weightInput == null) throw FormatException('No weight provided.');
    final weight = double.parse(weightInput.replaceAll(',', '.'));

    stdout.write('Enter height in meters (e.g., 1.75): ');
    final heightInput = stdin.readLineSync();
    if (heightInput == null) throw FormatException('No height provided.');
    final height = double.parse(heightInput.replaceAll(',', '.'));

    final person = Person(name: name.trim(), weightKg: weight, heightM: height);
    final result = BmiCalculator.computeForPerson(person);

    stdout.writeln('\nResult for ${person.name}:');
    stdout.writeln('Weight: ${person.weightKg} kg');
    stdout.writeln('Height: ${person.heightM} m');
    stdout.writeln(result.toString());
  } on FormatException catch (e) {
    stderr.writeln('Input error: ${e.message}');
    exitCode = 2;
  } on ArgumentError catch (e) {
    stderr.writeln('Invalid value: ${e.message}');
    exitCode = 3;
  } catch (e) {
    stderr.writeln('Unexpected error: $e');
    exitCode = 1;
  }
}
