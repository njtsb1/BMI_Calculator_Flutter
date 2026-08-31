(() => {
  'use strict';

  /* ---------- Translations ---------- */
  const translations = {
    en: {
      title: 'IMC - BMI Calculator',
      formTitle: 'IMC - BMI Calculator',
      name: 'Name',
      weight: 'Weight (kg)',
      height: 'Height (m)',
      weightHelp: 'Use dot or comma for decimals',
      heightHelp: 'Use dot or comma for decimals',
      clear: 'Clear',
      calculate: 'Calculate BMI',
      resultPrefix: 'Your BMI is:',
      classification: {
        severe: 'Severe Thinness',
        moderate: 'Moderate Thinness',
        mild: 'Mild Thinness',
        normal: 'Healthy',
        overweight: 'Overweight',
        obese1: 'Obesity Class I',
        obese2: 'Obesity Class II (Severe)',
        obese3: 'Obesity Class III (Morbid)'
      },
      errorInvalid: 'Please enter valid numeric values for weight and height.',
      errorPositive: 'Weight and height must be positive numbers.',
      cleared: 'Form cleared.'
    },
    pt: {
      title: 'IMC - Calculadora de IMC',
      formTitle: 'IMC - Calculadora de IMC',
      name: 'Nome',
      weight: 'Peso (kg)',
      height: 'Altura (m)',
      weightHelp: 'Use ponto ou vírgula para decimais',
      heightHelp: 'Use ponto ou vírgula para decimais',
      clear: 'Limpar',
      calculate: 'Calcular IMC',
      resultPrefix: 'Seu IMC é:',
      classification: {
        severe: 'Magreza grave',
        moderate: 'Magreza moderada',
        mild: 'Magreza leve',
        normal: 'Saudável',
        overweight: 'Sobrepeso',
        obese1: 'Obesidade Grau I',
        obese2: 'Obesidade Grau II (severa)',
        obese3: 'Obesidade Grau III (mórbida)'
      },
      errorInvalid: 'Por favor insira valores numéricos válidos para peso e altura.',
      errorPositive: 'Peso e altura devem ser números positivos.',
      cleared: 'Formulário limpo.'
    },
    es: {
      title: 'IMC - Calculadora de IMC',
      formTitle: 'IMC - Calculadora de IMC',
      name: 'Nombre',
      weight: 'Peso (kg)',
      height: 'Altura (m)',
      weightHelp: 'Use punto o coma para decimales',
      heightHelp: 'Use punto o coma para decimales',
      clear: 'Limpiar',
      calculate: 'Calcular IMC',
      resultPrefix: 'Tu IMC es:',
      classification: {
        severe: 'Delgadez grave',
        moderate: 'Delgadez moderada',
        mild: 'Delgadez leve',
        normal: 'Saludable',
        overweight: 'Sobrepeso',
        obese1: 'Obesidad Grado I',
        obese2: 'Obesidad Grado II (Severa)',
        obese3: 'Obesidad Grado III (Mórbida)'
      },
      errorInvalid: 'Por favor ingresa valores numéricos válidos para peso y altura.',
      errorPositive: 'Peso y altura deben ser números positivos.',
      cleared: 'Formulario limpiado.'
    }
  };

  /* ---------- DOM ---------- */
  const el = {
    html: document.documentElement,
    title: document.getElementById('app-title'),
    formTitle: document.getElementById('form-title'),
    name: document.getElementById('name'),
    weight: document.getElementById('weight'),
    height: document.getElementById('height'),
    weightHelp: document.getElementById('weight-help'),
    heightHelp: document.getElementById('height-help'),
    clearBtn: document.getElementById('clear-btn'),
    calcBtn: document.getElementById('calc-btn'),
    form: document.getElementById('bmi-form'),
    result: document.getElementById('result'),
    error: document.getElementById('error'),
    lang: document.getElementById('lang'),
    themeToggle: document.getElementById('theme-toggle'),
    themeIcon: document.getElementById('theme-icon')
  };

  /* ---------- Utilities ---------- */
  const parseNumber = (value) => {
    if (typeof value !== 'string') return NaN;
    // Accept comma or dot
    const normalized = value.trim().replace(',', '.');
    return Number(normalized);
  };

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  /* ---------- BMI Logic ---------- */
  class Person {
    constructor(name = '', weight = 0, height = 0) {
      this.name = String(name || '').trim();
      this.weight = Number(weight);
      this.height = Number(height);
    }
  }

  function calculateBMI(person) {
    if (!(person instanceof Person)) throw new TypeError('Expected Person');
    if (!isFinite(person.weight) || !isFinite(person.height)) throw new TypeError('Invalid numeric values');
    if (person.weight <= 0 || person.height <= 0) throw new RangeError('Non-positive values');
    const bmi = person.weight / (person.height * person.height);
    return Number(bmi.toFixed(1));
  }

  function classifyBMI(bmi, t) {
    // t = translations for current language
    if (bmi < 16) return t.classification.severe;
    if (bmi >= 16 && bmi < 17) return t.classification.moderate;
    if (bmi >= 17 && bmi < 18.5) return t.classification.mild;
    if (bmi >= 18.5 && bmi < 25) return t.classification.normal;
    if (bmi >= 25 && bmi < 30) return t.classification.overweight;
    if (bmi >= 30 && bmi < 35) return t.classification.obese1;
    if (bmi >= 35 && bmi < 40) return t.classification.obese2;
    return t.classification.obese3;
  }

  /* ---------- Theme & Language Persistence ---------- */
  const storage = {
    get(key, fallback = null) {
      try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, String(value)); } catch {}
    }
  };

  function applyTheme(theme) {
    if (theme === 'light') {
      el.html.classList.add('light');
      el.themeToggle.setAttribute('aria-pressed', 'false');
      el.themeIcon.innerHTML = sunSVG();
    } else {
      el.html.classList.remove('light');
      el.themeToggle.setAttribute('aria-pressed', 'true');
      el.themeIcon.innerHTML = moonSVG();
    }
    storage.set('bmi_theme', theme);
  }

  function toggleTheme() {
    const isLight = el.html.classList.contains('light');
    applyTheme(isLight ? 'dark' : 'light');
  }

  function applyLanguage(lang) {
    const t = translations[lang] || translations.en;
    el.title.textContent = t.title;
    el.formTitle.textContent = t.formTitle;
    document.getElementById('label-name').textContent = t.name;
    document.getElementById('label-weight').textContent = t.weight;
    document.getElementById('label-height').textContent = t.height;
    el.weightHelp.textContent = t.weightHelp;
    el.heightHelp.textContent = t.heightHelp;
    el.clearBtn.textContent = t.clear;
    el.calcBtn.textContent = t.calculate;
    el.lang.value = lang;
    storage.set('bmi_lang', lang);
    // Clear messages to avoid mismatched language
    el.result.textContent = '';
    el.error.textContent = '';
  }

  /* ---------- SVG Icons ---------- */
  function moonSVG() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>
    </svg>`;
  }
  function sunSVG() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zM20.24 4.84l-1.79 1.79 1.8 1.79 1.79-1.79-1.8-1.79zM23 11v2h-3v-2h3zM4.22 19.78l1.79-1.79-1.8-1.79-1.79 1.79 1.8 1.79zM12 6a6 6 0 100 12 6 6 0 000-12zM19.78 19.78l-1.79-1.79-1.8 1.79 1.79 1.79 1.8-1.79z" fill="currentColor"/>
    </svg>`;
  }

  /* ---------- Event Handlers ---------- */
  function onClear() {
    el.form.reset();
    el.result.textContent = translations[el.lang.value].cleared;
    el.error.textContent = '';
    el.name.focus();
  }

  function onSubmit(e) {
    e.preventDefault();
    el.error.textContent = '';
    el.result.textContent = '';

    const lang = el.lang.value || 'en';
    const t = translations[lang];

    try {
      const name = el.name.value || '';
      const weightRaw = el.weight.value;
      const heightRaw = el.height.value;

      const weight = parseNumber(weightRaw);
      const height = parseNumber(heightRaw);

      if (!isFinite(weight) || !isFinite(height) || Number.isNaN(weight) || Number.isNaN(height)) {
        el.error.textContent = t.errorInvalid;
        return;
      }
      if (weight <= 0 || height <= 0) {
        el.error.textContent = t.errorPositive;
        return;
      }

      const person = new Person(name, weight, height);
      const bmi = calculateBMI(person);
      const classification = classifyBMI(bmi, t);

      // Friendly message
      const who = person.name ? `${person.name}, ` : '';
      el.result.innerHTML = `<strong>${t.resultPrefix}</strong> ${bmi} - <em>${classification}</em>`;
      el.error.textContent = '';

    } catch (err) {
      // Defensive: show a friendly message but keep details out of UI
      console.error(err);
      el.error.textContent = translations[el.lang.value].errorInvalid;
    }
  }

  /* ---------- Initialization ---------- */
  function init() {
    // Theme: default dark unless user prefers light
    const savedTheme = storage.get('bmi_theme', null);
    if (savedTheme) {
      applyTheme(savedTheme === 'light' ? 'light' : 'dark');
    } else {
      // dark-first as requested; but respect OS if explicitly light
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      applyTheme(prefersLight ? 'light' : 'dark');
    }

    // Language: default en
    const savedLang = storage.get('bmi_lang', 'en');
    applyLanguage(savedLang || 'en');

    // Attach events
    el.clearBtn.addEventListener('click', onClear);
    el.form.addEventListener('submit', onSubmit);
    el.lang.addEventListener('change', (ev) => applyLanguage(ev.target.value));
    el.themeToggle.addEventListener('click', toggleTheme);

    // Keyboard accessibility: Enter on theme toggles
    el.themeToggle.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        toggleTheme();
      }
    });

    // Improve numeric input UX: allow comma and dot, prevent letters
    [el.weight, el.height].forEach(input => {
      input.addEventListener('input', (ev) => {
        // keep only digits, comma, dot
        const cleaned = ev.target.value.replace(/[^\d.,-]/g, '');
        if (cleaned !== ev.target.value) ev.target.value = cleaned;
      });
    });
  }

  // Run
  document.addEventListener('DOMContentLoaded', init);
})();
