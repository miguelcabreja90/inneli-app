import es from 'vuetify/es5/locale/es'

export default {
  label: 'Español',
  // page login
  login: 'login',
  reset_password: 'Cambiar contraseña',
  forgot: 'Olvidó su contraseña?',
  forgot_btn: 'Enviar link de cambio',
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
  company: 'Compañía',
  first_name: 'Nombre(s)',
  last_name: 'Apellidos',
  address: 'Dirección',
  city: 'Ciudad',
  country: 'País',
  postal_code: 'Código Postal',
  about_me: 'Acerca de mi',
  phone: 'Teléfono',
  wait: 'Espere por favor...',
  // menu
  menu: {
    home: 'Inicio',
    dashboard: 'Dashboard',
    access_denied: 'Acceso denegado',
    verify: 'Verificar Correo',
    welcome: 'Bienvenido',
    user_profile: 'Perfil de Usuario',
    profile: 'Perfil',
    settings: 'Ajustes',
    logout: 'Salir'
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
    length: 'Este campo necesita {0} caracteres',
    match: 'Los parámetros {0} y la {1} no son iguales',
    bad_email: '{0} debe ser válido',
    required_element: 'Este campo es requerido'
  },
  //user
  user: {
    edit_profile: 'Editar Perfil',
    sub_profile: 'Complete su perfil',
    btn_edit: 'Actualizar'
  },
  messages: {
    refused: 'Fallido: Conexión rechazada.',
    success_avatar: 'La imagen se salvado satisfactoriamente.',
    success_profile: 'Los datos han sido actualizados.',
    check_mail:
      'Se ha enviado un correo electrónico con los detalles para cambiar contraseña.',
    password_success: 'La contraseña se actualizo correctamente.'
  },
  ...es
}
