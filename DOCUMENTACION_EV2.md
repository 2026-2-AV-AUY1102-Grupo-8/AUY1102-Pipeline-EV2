# Evaluación Parcial N° 2: Desarrollo de Pruebas Unitarias y Análisis de Seguridad II
**Asignatura:** Ciclo de vida del Software I (AUY1102)  
**Institución:** Instituto Profesional Duoc UC  
**Grupo:** N° 8  
**Integrantes:**
- Fernando Galdamez (GitHub: [@fergaldamez-commits](https://github.com/fergaldamez-commits) | Correo: `fer.galdamez@duocuc.cl`)
- Jose Villarroel (GitHub: [@Joseantonio777](https://github.com/Joseantonio777) | Correo: `jose.villarroelc@gmail.com`)

**Enlaces de Entrega:**
- **Repositorio de Código Fuente:** [https://github.com/2026-2-AV-AUY1102-Grupo-8/AUY1102-Pipeline-EV2](https://github.com/2026-2-AV-AUY1102-Grupo-8/AUY1102-Pipeline-EV2)
- **Documento Markdown (.md):** [https://github.com/2026-2-AV-AUY1102-Grupo-8/AUY1102-Pipeline-EV2/blob/master/DOCUMENTACION_EV2.md](https://github.com/2026-2-AV-AUY1102-Grupo-8/AUY1102-Pipeline-EV2/blob/master/DOCUMENTACION_EV2.md)

---

## 1. Introducción y Contexto del Caso

La empresa **Integration Solutions** se encuentra atravesando un periodo de transformación digital para mejorar su capacidad de desarrollo de software y la entrega continua de aplicaciones (CI/CD). Históricamente, sus procesos de despliegue y validación se ejecutaban de forma manual, lo que generaba cuellos de botella operativos, retrasos en la entrega de valor al cliente y una acumulación sustancial de deuda técnica.

Para dar respuesta a estas problemáticas, el equipo de Integration Solutions ha migrado hacia el ecosistema **GitHub**, adoptando una estrategia **DevSecOps** y **Shift-Left**. El presente informe documenta las actividades de aseguramiento de calidad, ejecución de pruebas unitarias, análisis de cobertura, escaneo estático de seguridad (SAST), análisis de dependencias (SCA), remediación de vulnerabilidades y gobierno colaborativo en Git entre dos desarrolladores (Fernando Galdamez y Jose Villarroel).

---

## 2. Marco Conceptual de Aseguramiento de Calidad (Indicador IE3.1.1 - 50% de la Evaluación)

A continuación se analizan los conceptos clave relacionados con la calidad del software y su contribución a la excelencia técnica del producto final:

### 2.1 Pruebas Unitarias (Unit Testing)
- **Concepto:** Verificación granular e independiente del comportamiento de las unidades mínimas de código (funciones, métodos o Value Objects), aislando dependencias externas mediante mocks o dobles de prueba.
- **Contribución al Producto Final:** Aseguran que la lógica central y las invariantes de dominio funcionen de forma determinista y libre de defectos. Reducen drásticamente el costo de refactorización y sirven como especificación viva de la arquitectura.

### 2.2 Calidad del Código Estático vs. Calidad del Código Dinámico
- **Código Estático (SAST - Static Application Security Testing / Linting):** Inspección del código fuente y archivos de configuración sin ejecutar el programa. Detecta tempranamente violaciones de estándares (ESLint), complejidad ciclomática, antipatrones, credenciales quemadas y vulnerabilidades como inyecciones SQL o XSS.
- **Código Dinámico (DAST - Dynamic Application Security Testing):** Evaluación del comportamiento del software en tiempo de ejecución. Permite identificar problemas de rendimiento en vivo, fugas de memoria, defectos en el manejo de sesiones HTTP y vulnerabilidades de configuración del servidor.
- **Contribución al Producto Final:** El análisis estático previene que defectos estructurales ingresen a la base de código antes del commit, mientras que el análisis dinámico valida que el comportamiento integrado en el entorno de ejecución cumpla con los requisitos operativos y de seguridad.

### 2.3 Análisis de Seguridad y Vulnerabilidades del Código (SAST, SCA y Secret Scanning)
- **Concepto:** Técnicas automatizadas para descubrir debilidades antes de que alcancen producción. Comprende el análisis de vulnerabilidades en el código propio (SAST), en las librerías de terceros utilizadas (SCA - Software Composition Analysis) y la búsqueda de credenciales expuestas en el historial de Git (Secret Scanning).
- **Contribución al Producto Final:** Previene ataques catastróficos (inyecciones SQL, ejecución remota de código, robo de sesiones), resguarda la confidencialidad de los datos y asegura el cumplimiento de normativas de la industria (OWASP Top 10, CWE, ISO 27001).

### 2.4 Pruebas Integradas (Integration Testing)
- **Concepto:** Validación de los puntos de contacto e interfaces entre múltiples módulos, componentes o subsistemas interconectados (ej. persistencia contra base de datos, llamadas a microservicios o consumo de APIs externas).
- **Contribución al Producto Final:** Evita que piezas individuales que funcionan aisladamente fallen al momento de interactuar, previniendo fallos en los flujos punta a punta (end-to-end).

### 2.5 Pruebas de Estrés y Rendimiento (Stress & Performance Testing)
- **Concepto:** Sometimiento de la aplicación a cargas de trabajo extremas, evaluando tiempos de respuesta, tasa de transferencia y estabilidad bajo situaciones de saturación o falla de recursos.
- **Contribución al Producto Final:** Identifica los límites operativos de la infraestructura, descubre cuellos de botella de concurrencia y previene caídas inesperadas del servicio durante picos de demanda.

### 2.6 Pruebas de Regresión (Regression Testing)
- **Concepto:** Reejecución sistemática de las suites de prueba existentes tras la introducción de cambios, parches o nuevas funcionalidades.
- **Contribución al Producto Final:** Garantiza que la incorporación de nuevas características no rompa funcionalidades previas ni reintroduzca errores históricos, blindando la estabilidad de cada release.

---

## 3. Evaluación de Métodos y Herramientas en el SDLC (Indicador IE3.2.1 - 50% de la Evaluación)

La aplicación de herramientas en las primeras fases del ciclo de vida del software (**Shift-Left**) es el pilar central de DevSecOps. Detectar y remediar un defecto en etapa de codificación cuesta hasta un 90% menos que subsanarlo en entornos productivos.

| Herramienta | Tipo de Análisis | Etapa del Ciclo de Vida | Impacto en la Detección Temprana y Mejora Continua |
|---|---|---|---|
| **Jest / SWC** | Pruebas Unitarias y Cobertura (Coverage) | Codificación / Pre-commit | Ejecuta pruebas a alta velocidad mediante compilación SWC y genera reportes de cobertura de código (Statements, Branches, Functions, Lines), alertando inmediatamente sobre código no testeado. |
| **SonarCloud** | Análisis Estático de Calidad y Seguridad (SAST) | Pull Request / Integración Continua | Aplica Quality Gates basados en estándares internacionales (Clean Code, OWASP, CWE), monitoreando Deuda Técnica, Code Smells y Security Hotspots. |
| **Snyk** | Análisis de Dependencias (SCA) y Código (SAST) | Monitoreo Continuo / CI | Escanea el árbol de dependencias (`package-lock.json`) en busca de vulnerabilidades conocidas y propone parches directos compatibles. |
| **GitHub Advanced Security (GHAS)** | Secret Scanning, Push Protection, Dependabot, CodeQL | Repositorio / Pull Requests | Bloquea commits con secretos antes de que entren a GitHub (Push Protection) y genera Pull Requests automáticos con actualizaciones de seguridad (Dependabot). |
| **npm audit** | Análisis de Vulnerabilidades en Dependencias (SCA) | Local / Línea de Comandos | Permite al desarrollador auditar y remediar vulnerabilidades en dependencias directamente en su terminal antes de realizar un push. |

---

## 4. Desarrollo Práctico - Parte 1: Análisis mediante Pruebas Unitarias

### 4.1 Script Automatizado de Ejecución y Reporte de Cobertura
Se diseñó e implementó el script `scripts/test-coverage-report.js` y se configuró en `package.json` el comando `"test:report"`.

Este script:
1. Ejecuta la suite de pruebas unitarias mediante Jest exportando los resultados en formato JSON y los mapeos de cobertura Istanbul.
2. Imprime el resumen de suites ejecutadas, suites pasadas y suites fallidas.
3. Evalúa e identifica explícitamente **cuáles pruebas fallan** o confirma que el 100% pasó.
4. Calcula los porcentajes globales de cobertura: **Sentencias (Statements)**, **Ramas (Branches)** y **Funciones (Functions)**.
5. Lista de forma discriminada por archivo **qué parte exacta del código no ha sido cubierta con pruebas**, indicando los números de línea correspondientes.

### 4.2 Evidencia Real de Ejecución en PowerShell
Al ejecutar en la terminal el comando:
```powershell
npm run test:report
```

Se obtiene la siguiente salida real capturada:

![Pantallazo 1: Ejecución del Script de Pruebas Unitarias y Cobertura en PowerShell](./img/01_pruebas_unitarias.png)

#### Desglose de Resultados Obtenidos:
- **Suites Ejecutadas:** 10 suites (10 pasadas, 0 fallidas).
- **Pruebas Ejecutadas:** 18 pruebas unitarias (18 pasadas, 0 fallidas).
- **Porcentajes de Cobertura Global:**
  - Cobertura de Sentencias (Statements): **43.28%**
  - Cobertura de Ramas (Branches): **60.00%**
  - Cobertura de Funciones (Functions): **56.67%**
- **Componentes y Líneas No Cubiertas con Pruebas:**
  - `src/index.ts` (Cobertura 62.50%) $\rightarrow$ Líneas no cubiertas: `8, 9, 10`
  - `src/quality/errores-object.ts` (Cobertura 0.00%) $\rightarrow$ Líneas no cubiertas: `2, 3, 6`
  - `src/quality/insecure-1-object.ts` (Cobertura 0.00%) $\rightarrow$ Líneas no cubiertas: `1, 2, 3, 5, 7, 10`
  - `src/quality/insecure-2-object.ts` (Cobertura 0.00%) $\rightarrow$ Líneas no cubiertas: `1, 2, 6, 7, 11-14, 12, 18, 22, 24-28, 30, 32`
  - `src/value-object/primitives/date-value-object.ts` (Cobertura 6.67%) $\rightarrow$ Líneas no cubiertas: `3, 13-15, 14, 19, 23, 24, 25, 29, 30, 34, 35, 7, 8, 9`
  - `src/value-object/primitives/enum-value-object.ts` (Cobertura 83.33%) $\rightarrow$ Línea no cubierta: `11`

---

## 5. Desarrollo Práctico - Parte 2: Análisis de Seguridad de Código Estático

### 5.1 Configuración de SonarCloud
Se configuró la integración con SonarCloud mediante la creación del archivo descriptor `sonar-project.properties`:
```properties
sonar.projectKey=2026-2-AV-AUY1102-Grupo-8_AUY1102-Pipeline-EV2
sonar.organization=2026-2-av-auy1102-grupo-8
sonar.sources=src
sonar.tests=test
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.coverage.exclusions=test/**,node_modules/**,dist/**
sonar.sourceEncoding=UTF-8
```

Evidencia real del análisis en la consola de SonarQube Cloud:
![Pantallazo 3: Dashboard de SonarQube Cloud](./img/03_sonarcloud.png)

- **Métricas:** Security Rating E con 15 Open issues detectados en `src/quality/` (reglas S2077 por construcción dinámica de SQL y S2068 por credenciales hardcodeadas), Reliability A, Maintainability A y 122 Dependency risks.

### 5.2 Configuración y Escaneo con Snyk
Se integró el repositorio con la consola de Snyk ([https://app.snyk.io](https://app.snyk.io)):
- **Snyk Open Source (SCA):** Escaneo de librerías en `package.json` detectando vulnerabilidades conocidas.
- **Snyk Code (SAST):** Escaneo estático del código fuente TypeScript.

Evidencia real capturada desde la consola de Snyk:
![Pantallazo 4: Reporte de Escaneo de Seguridad con Snyk](./img/04_snyk.png)

- **Resultados de Snyk:** 1 Critical, 17 High, 20 Medium, 5 Low en los proyectos `Dockerfile` y `package.json`.

### 5.3 Análisis de Vulnerabilidades con `npm audit`
Se ejecutó el comando de auditoría local de dependencias:
```powershell
npm audit
```

Evidencia real capturada en la terminal PowerShell:
![Pantallazo 2: Escaneo de Vulnerabilidades con npm audit](./img/02_npm_audit.png)

- **Total:** **77 vulnerabilidades** (5 low, 22 moderate, 48 high, 2 critical) en dependencias transitivas como `@babel/core`, `tar`, `picomatch`, `@faker-js/faker` y `tmp`.

### 5.4 Activación de GitHub Advanced Security (GHAS)
Se activaron las herramientas nativas de seguridad en GitHub (`Settings` > `Code security and analysis`):
- **Secret Scanning y Push Protection:** Habilitados para detectar y bloquear proactivamente la subida de tokens y credenciales.
- **Dependabot Alerts y Security Updates:** Habilitados con monitoreo activo de 64 alertas y generación de Pull Requests automáticos de parches.
- **Security Advisories:** Habilitados.

Evidencia real capturada desde la pestaña Security del repositorio:
![Pantallazo 5: Panel de Seguridad en GitHub](./img/05_github_security.png)

### 5.5 Remediación de Vulnerabilidades Detectadas
En cumplimiento con el requerimiento de la evaluación (*"Realice una remediación detectada por SonarCloud y/o Snyk"*), se remediaron las vulnerabilidades críticas en `src/quality/insecure-2-object.ts` y la fuga de secretos en `credentials.yml`:

| Vulnerabilidad | Código Vulnerable (Antes) | Código Remediado (Después) | Fundamento Técnico |
|---|---|---|---|
| **SQL Injection (CWE-89)** | `const username = "admin'; DROP TABLE Users; --";`<br>`const queryString = 'SELECT * FROM Users WHERE username=\'' + username + '\'';` | `const username = "admin'; DROP TABLE Users; --";`<br>`const queryString = 'SELECT * FROM Users WHERE username = $1';`<br>`const queryParameters = [username];` | **Consultas Parametrizadas:** El motor de base de datos separa la estructura SQL de los datos de entrada, impidiendo la inyección arbitraria de sentencias. |
| **Credenciales Hardcodeadas (CWE-798)** | `const dbPassword = 'password123';`<br>`const config = { dbPassword: 'password123' };` | `const dbPassword = process.env.DB_PASSWORD || '';`<br>`const config = { dbPassword: process.env.DB_PASSWORD || '' };` | **Variables de Entorno (12-Factor App):** Los secretos no deben versionarse en el código fuente. |
| **Fuga en Logs (CWE-532)** | `console.log('Error: La contraseña ' + dbPassword + ' no es válida');` | `console.log('Error de autenticación: Las credenciales no son válidas.');` | **Sanitización de Salidas:** Se eliminan datos confidenciales de las trazas de log. |
| **Fuga de Secretos (Secret Scanning)** | Archivo `credentials.yml` con token de GitHub en texto plano. | Archivo eliminado del repositorio con `git rm credentials.yml` y protegido en `.gitignore`. | **Push Protection y Secret Remediation:** Eliminación física de la credencial y exclusión en Git. |

---

## 6. Gestión del Trabajo Colaborativo en Git

Para asegurar la trazabilidad del trabajo en pareja de **Fernando Galdamez** y **Jose Villarroel**, se aplicó el flujo de trabajo **Feature Branch Workflow** con revisiones cruzadas de código (**Pull Requests**):

1. **Rama de Pruebas Unitarias y SonarCloud:**
   - Rama: `feature/unit-tests-report` $\rightarrow$ `master`
   - Responsable: Jose Villarroel ([@Joseantonio777](https://github.com/Joseantonio777))
   - Aportes: Implementación del script de pruebas `test-coverage-report.js`, configuración de `package.json` y `sonar-project.properties`.
2. **Rama de Remediación de Seguridad:**
   - Rama: `fix/security-remediations` $\rightarrow$ `master`
   - Responsable: Fernando Galdamez ([@fergaldamez-commits](https://github.com/fergaldamez-commits))
   - Aportes: Remediación de SQL Injection y variables de entorno en `insecure-2-object.ts`, eliminación segura de `credentials.yml` y actualización de `.gitignore`.

*(Espacio reservado para el Pantallazo 6: Listado de Pull Requests en GitHub evidenciando la integración colaborativa de ambos compañeros).*

---

## 7. Conclusiones y Cumplimiento de la Rúbrica de Evaluación

1. **Aseguramiento de Calidad Integral (RA3):** Se cumplieron todas las exigencias de la evaluación mediante la implementación de pruebas unitarias automatizadas, medición cuantitativa de cobertura, análisis estático y remediación práctica de vulnerabilidades.
2. **Shift-Left y DevSecOps:** La migración a GitHub y la activación de herramientas automatizadas (Jest, SonarCloud, Snyk, GHAS) moderniza los procesos de la empresa "Integration Solutions", reduciendo los tiempos de ciclo y garantizando entregas continuas seguras.
3. **Trabajo Colaborativo Demostrado:** La participación activa y equitativa de **Fernando Galdamez** y **Jose Villarroel** queda formalmente evidenciada en el repositorio a través de ramas dedicadas, commits firmados y revisiones cruzadas de Pull Requests.
