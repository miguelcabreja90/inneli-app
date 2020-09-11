import es from 'vuetify/es5/locale/es'

export default {
  label: 'Español',
  // page login
  login: 'login',
  username: 'Usuario',
  name: 'Nombre',
  email: 'Correo',
  password: 'Contraseña',
  confirm: 'Confirmación',
  register: 'Registrar',
  confirm_password: 'Confirmar Contraseña',
  // menu
  menu: {
    home: 'Inicio',
    dashboard: 'Dashboard',
    access_denied: 'Acceso denegado',
    verify: 'Verificar Correo',
    welcome: 'Bienvenido'
  },
  //settings
  settings: {
    title: 'Ajuste de Tema',
    color: 'Opciones de color',
    lang: 'Idioma',
    sidebar: 'Opción de barra lateral'
  },
  // rules
  rule: {
    required: '{0} es requerido',
    min: 'La cantidad mínima es de {0} caracteres',
    max: 'La cantidad máxima es de {0} caracteres',
    match: 'Los parámetros {0} y la {1} no son iguales',
    bad_email: '{0} debe ser válido'
  },
  messages: {
    refused: 'Fallido: Conexión rechazada.'
  },
  ...es
}
