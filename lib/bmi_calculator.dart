import 'person.dart';

class BmiResult {
  final double bmi;
  final String classification;

  BmiResult(this.bmi, this.classification);

  @override
  String toString() => 'BMI: ${bmi.toStringAsFixed(2)} - $classification';
}

class BmiCalculator {
  static double calculateBmi(double weightKg, double heightM) {
    if (heightM <= 0) {
      throw ArgumentError.value(heightM, 'heightM', 'Height must be > 0');
    }
    return weightKg / (heightM * heightM);
  }

  static String classify(double bmi) {
    if (bmi < 16) return 'Severe thinness';
    if (bmi >= 16 && bmi < 17) return 'Moderate thinness';
    if (bmi >= 17 && bmi < 18.5) return 'Mild thinness';
    if (bmi >= 18.5 && bmi < 25) return 'Healthy';
    if (bmi >= 25 && bmi < 30) return 'Overweight';
    if (bmi >= 30 && bmi < 35) return 'Obesity class I';
    if (bmi >= 35 && bmi < 40) return 'Obesity class II (severe)';
    return 'Obesity class III (morbid)';
  }

  static BmiResult computeForPerson(Person p) {
    final bmi = calculateBmi(p.weightKg, p.heightM);
    final classification = classify(bmi);
    return BmiResult(bmi, classification);
  }
}
