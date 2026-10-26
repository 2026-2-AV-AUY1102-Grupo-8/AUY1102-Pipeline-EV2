// ============================================================================
// REMEDIACIÓN DE VULNERABILIDADES - EVALUACIÓN PARCIAL N° 2 (AUY1102)
// Autor de la remediación: Fernando Galdamez (fergaldamez-commits)
// Revisor: Jose Villarroel (Joseantonio777)
// ============================================================================

// 1. Remediación SQL Injection (SonarCloud S2077 / Snyk Code)
// Se reemplaza la concatenación directa de cadenas por consultas preparadas/parametrizadas
const username = "admin'; DROP TABLE Users; --";
const queryString = 'SELECT * FROM Users WHERE username = $1';
const queryParameters = [username];

// 2. Remediación XSS (Cross-Site Scripting)
// Se sanitiza o codifica la entrada del usuario antes de incrustarla en el DOM/HTML
const userInput = '<script>alert("XSS");</script>';
const escapeHtml = (str: string) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const html = `<div>${escapeHtml(userInput)}</div>`;

// 3. Remediación CSRF (Cross-Site Request Forgery)
// Se valida la existencia y consistencia del token de seguridad antes de procesar el cambio
app.post('/change-password', (req: any, res: any) => {
  const csrfToken = req.headers['x-csrf-token'];
  if (!csrfToken || csrfToken !== req.session?.csrfToken) {
    return res.status(403).send('Error 403: Forbidden - Token CSRF no válido.');
  }
  const newPassword = req.body.newPassword;
  // Procesamiento seguro con token CSRF validado
});

// 4. Remediación Deserialización Insegura
// Validación previa de tipos y formato JSON seguro
let data = null;
try {
  if (typeof req.body === 'string') {
    data = JSON.parse(req.body);
  } else {
    data = req.body;
  }
} catch (err) {
  data = {};
}

// 5. Remediación Hardcoded Credentials & Cleartext Logging (SonarCloud S2068 / Snyk)
// Las credenciales sensibles deben cargarse mediante variables de entorno y nunca registrarse en logs
const dbPassword = process.env.DB_PASSWORD || '';
const config = {
  dbUsername: process.env.DB_USERNAME || 'admin',
  dbPassword: process.env.DB_PASSWORD || '',
  apiKey: process.env.API_KEY || '',
};

const hashedPassword = hash(process.env.DB_PASSWORD || 'default_salt');

// Remediación: Mensaje genérico de error sin exponer contraseñas en consola
console.log('Error de autenticación: Las credenciales proporcionadas no son válidas.');
