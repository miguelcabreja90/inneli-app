import es from 'vuetify/es5/locale/es'

export default {
  label: 'Español',
  // page login
  login: 'login',
  username: 'Usuario',
  email: 'Correo',
  password: 'Contraseña',
  // menu
  menu: {
    home: 'Inicio',
    dashboard: 'Dashboard',
    access_denied: 'Acceso denegado'
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
    required: 'Es requerido {0}'
  },
  messages: {
    refused: 'Fallido: Conexión rechazada.'
  },
  ...es
}
