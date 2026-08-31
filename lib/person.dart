class Person {
  final String name;
  final double weightKg;
  final double heightM;

  Person({
    required this.name,
    required this.weightKg,
    required this.heightM,
  }) {
    if (weightKg <= 0) {
      throw ArgumentError.value(weightKg, 'weightKg', 'Weight must be > 0');
    }
    if (heightM <= 0) {
      throw ArgumentError.value(heightM, 'heightM', 'Height must be > 0');
    }
  }

  @override
  String toString() => 'Person(name: $name, weightKg: $weightKg, heightM: $heightM)';
}
