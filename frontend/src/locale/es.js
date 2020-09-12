import es from 'vuetify/es5/locale/es'

export default {
  label: 'Español',
  // page login
  login: 'login',
  username: 'Usuario',
  name: 'Nombre',
  email: 'Correo',
  firstName: 'Nombre',
  lastName: 'Apellidos',
  password: 'Contraseña',
  confirm: 'Confirmación',
  register: 'Registrar',
  noDefined: 'No definido',
  aboutMe: 'Acerca de mi',
  activeAccount:
    'Hola, su cuenta se ha creada, pero aún no ha sido activada. Por favor, acceda al correo registrado, se le ha enviado un mensaje para la activación.',
  confirm_password: 'Confirmar Contraseña',
  company: 'Compañia',
  first_name: 'Nombre(s)',
  last_name: 'Apellidos',
  address: 'Dirección',
  city: 'Ciudad',
  country: 'Pais',
  postal_code: 'Código Postal',
  about_me: 'Acerca de Mi',
  wait: 'Espere por favor...',
  // menu
  menu: {
    home: 'Inicio',
    dashboard: 'Dashboard',
    access_denied: 'Acceso denegado',
    verify: 'Verificar Correo',
    welcome: 'Bienvenido',
    user_profile: 'Perfil de Usuario'
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
  //user
  user: {
    edit_profile: 'Editar Perfil',
    sub_profile: 'Complete su perfil',
    btn_edit: 'Actualizar'
  },
  messages: {
    refused: 'Fallido: Conexión rechazada.'
  },
  ...es
}
