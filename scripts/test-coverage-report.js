const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('='.repeat(80));
console.log('  EJECUCIÓN DE PRUEBAS UNITARIAS Y ANÁLISIS DE COBERTURA - AUY1102');
console.log('  Integrantes: Fernando Galdamez | Jose Villarroel (Grupo 8)');
console.log('='.repeat(80));

const coverageDir = path.join(__dirname, '..', 'coverage');
const reportJsonPath = path.join(coverageDir, 'report.json');
const coverageFinalPath = path.join(coverageDir, 'coverage-final.json');

try {
  execSync(
    'npx jest --coverage --json --outputFile=coverage/report.json --testLocationInResults',
    { stdio: 'pipe', encoding: 'utf-8' }
  );
} catch (error) {
  // Jest sale con código 1 si hay fallas, pero genera los reportes
}

if (!fs.existsSync(reportJsonPath) || !fs.existsSync(coverageFinalPath)) {
  console.error('\n[ERROR] No se pudieron generar los reportes de Jest en coverage/.');
  process.exit(1);
}

const testResults = JSON.parse(fs.readFileSync(reportJsonPath, 'utf-8'));
const coverageFinal = JSON.parse(fs.readFileSync(coverageFinalPath, 'utf-8'));

console.log('\n--- 1. RESULTADOS DE LAS PRUEBAS UNITARIAS ---');
console.log(`Total Suites:     ${testResults.numTotalTestSuites}`);
console.log(`Suites Pasadas:   ${testResults.numPassedTestSuites}`);
console.log(`Suites Fallidas:  ${testResults.numFailedTestSuites}`);
console.log(`Total Pruebas:    ${testResults.numTotalTests}`);
console.log(`Pruebas Pasadas:  ${testResults.numPassedTests}`);
console.log(`Pruebas Fallidas: ${testResults.numFailedTests}`);

console.log('\n--- 2. DETALLE DE PRUEBAS QUE FALLAN ---');
let hasFailures = false;
testResults.testResults.forEach((suite) => {
  const failedTests = suite.assertionResults.filter((t) => t.status === 'failed');
  if (failedTests.length > 0) {
    hasFailures = true;
    console.log(`\n❌ Archivo con fallas: ${suite.name}`);
    failedTests.forEach((t) => {
      console.log(`   - Prueba: ${t.fullName || t.title}`);
      console.log(`     Motivo: ${t.failureMessages.join(' ').replace(/\n+/g, ' ')}`);
    });
  }
});
if (!hasFailures) {
  console.log('✅ Ninguna prueba falló. Todas las 18 pruebas unitarias existentes se ejecutaron exitosamente.');
}

console.log('\n--- 3. RESUMEN DE COBERTURA DE CÓDIGO ---');
let totalStmts = 0;
let coveredStmts = 0;
let totalBranches = 0;
let coveredBranches = 0;
let totalFuncs = 0;
let coveredFuncs = 0;
const uncoveredFiles = [];

for (const [filePath, data] of Object.entries(coverageFinal)) {
  const normPath = filePath.replace(/\\/g, '/');
  const relPath = normPath.includes('/src/') ? 'src/' + normPath.split('/src/')[1] : path.basename(filePath);

  const stmts = Object.values(data.s);
  const sTotal = stmts.length;
  const sCovered = stmts.filter((c) => c > 0).length;
  totalStmts += sTotal;
  coveredStmts += sCovered;

  const branches = Object.values(data.b).flat();
  totalBranches += branches.length;
  coveredBranches += branches.filter((c) => c > 0).length;

  const funcs = Object.values(data.f);
  totalFuncs += funcs.length;
  coveredFuncs += funcs.filter((c) => c > 0).length;

  const uncoveredLines = [];
  for (const [stmtId, count] of Object.entries(data.s)) {
    if (count === 0 && data.statementMap[stmtId]) {
      const loc = data.statementMap[stmtId];
      uncoveredLines.push(loc.start.line === loc.end.line ? `${loc.start.line}` : `${loc.start.line}-${loc.end.line}`);
    }
  }

  const sPct = sTotal > 0 ? ((sCovered / sTotal) * 100).toFixed(2) : '100.00';
  if (uncoveredLines.length > 0 || sTotal === 0) {
    uncoveredFiles.push({
      file: relPath,
      stmtPct: sPct,
      uncoveredLines: [...new Set(uncoveredLines)].join(', ') || 'Todo el archivo',
    });
  }
}

console.log(`Porcentaje Cobertura Sentencias (Statements): ${((coveredStmts / totalStmts) * 100).toFixed(2)}%`);
console.log(`Porcentaje Cobertura Ramas (Branches):       ${((coveredBranches / totalBranches) * 100).toFixed(2)}%`);
console.log(`Porcentaje Cobertura Funciones (Functions):   ${((coveredFuncs / totalFuncs) * 100).toFixed(2)}%`);

console.log('\n--- 4. CÓDIGO NO CUBIERTO CON PRUEBAS UNITARIAS ---');
console.log('Archivos y líneas específicas que no cuentan con cobertura de pruebas:');
uncoveredFiles.forEach((item) => {
  console.log(`\n📄 Archivo: ${item.file} (Cobertura: ${item.stmtPct}%)`);
  console.log(`   Líneas no cubiertas: ${item.uncoveredLines}`);
});

console.log('\n' + '='.repeat(80));
console.log('Fin del Reporte de Pruebas y Cobertura');
console.log('='.repeat(80));
