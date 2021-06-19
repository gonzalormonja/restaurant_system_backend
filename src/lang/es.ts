import { defineMessage } from 'react-intl';

export default {
  INCORRECT_USERNAME_OR_PASSWORD: 'Usuario o contraseña incorrecto',
  TOKEN_EXPIRED_ERROR: 'Token expirado',
  TOKEN_NOT_FOUND: 'Token no encontrado',
  PERMISSION_DENIED: 'Permisos insuficientes',
  VALIDATION_ERROR_REQUIRED: '{field} es requerido',
  VALIDATION_ERROR_TYPE: '{field} debe ser de tipo {type}',
  VALIDATION_ERROR_MAX: '{field} debe tener como maximo {max} caracteres',
  VALIDATION_ERROR_MAX1: '{field} debe tener como maximo {max} caracter',
  VALIDATION_ERROR_MAX_NUMBER: '{field} debe ser menor o igual a {max}',
  VALIDATION_ERROR_MIN_NUMBER: '{field} debe ser mayor o igual a {min}',
  VALIDATION_ERROR_FORMAT: 'Formato incorrecto para el campo {field}. Formato requerido {format}',
  VALIDATION_ERROR_FORMAT_FIRST_LETTER:
    'Formato incorrecto para el campo {field}. Ingrese un solo caracter alfabetico',
  VALIDATION_ERROR_UNIQUE: 'Ya existe un registro con el valor {value} para el campo {field}',
  VALIDATION_ERROR_EMPTY: 'El campo {field} no puede ser vacio, valores posibles: null|undefined| string valido',
  PATIENT_NOT_FOUND: 'Paciente no encontrado',
  USER_NOT_FOUND: 'Usuario no encontrado',
  PROFESSIONAL_NOT_FOUND: 'Profesional no encontrado',
  PROFESSION_NOT_FOUND: 'Profesión no encontrado',
  SPECIALTY_NOT_FOUND: 'Especialidad no encontrada',
  TREATMENT_PLAN_TEMPLATE_NOT_FOUND: 'Plan de tratamiento no encontrado',
  TREATMENT_PLAN_NOT_FOUND: 'Plan de tratamiento no encontrado',
  ALREADY_HAVE_A_TREATMENT_PLAN: 'El paciente ya tiene un plan de tratamiento en el periodo ingresado.',
  VISIT_NOT_FOUND: 'Visita no encontrada',
  FINANCER_NOT_FOUND: 'Financiador no encontrado',
  INVALID_ID: 'El {field} ingresado es invalido',
  VALIDATION_ERROR_VALUE: 'El valor ingresado en {field} no es valido. Valores permitidos {values}',
  DATE_NOT_EXIST: 'La fecha ingresada en {field} no existe.',
  PROFESSIONAL_NOT_SPECIALTY: 'El profesional {professional} no tiene la especialidad {specialty}.',
  PROFESSION_REGISTRATION_NOT_FOUND: 'La profesión seleccionada require una matricula.',
  TREATMENT_PLAN_EXPIRED: 'Plan de tratamiento expirado.',
  SPECIALTY_REPEATED_TREATMENT_PLAN:
    'Un plan de tratamiento no puede tener especialidades y modalidades repetidas.',
  MODALITY_ERROR: "La modalidad ingresada es incorrecta. Las modalidades permitidas son 'presence' o 'virtual'. ",
  TYPE_PRACTICE_ERROR:
    "El tipo de practica ingresada es incorrecta. Los tipos permitidos son 'image', 'laboratory' or 'others'. ",
  TYPE_FIELD_ERROR:
    "El tipo de campo ingresado es incorrecto. Los tipos permitidos son 'label','group','input','checkbox','radio','select','select_multiple','datetime','date','time','chips' o 'chips_multiple'",
  ACTUAL_DAY_HIGHER_DAY_START: 'El campo day_start no puede ser mayor a la fecha actual.',
  DAY_END_HIGHER_DAY_START: ' EL campo day_end no puede ser mayor al campo day_start.',
  APPOINTMENT_NOT_AVAILABLE: 'EL turno no esta disponible.',
  APPOINTMENT_NOT_FOUND: 'No se encontro el turno.',
  DIAGNOSTIC_NOT_FOUND: 'No se encontro el diagnostico.',
  ADMINISTRATOR_NOT_FOUND: 'Administrador no encontrado.',
  VISIT_COMPLETED: 'La visita ya se encuentra terminada.',
  ORDER_DATE_IS_GREATER_THAN_LIMIT_DATE: 'La fecha limite no puede ser inferior a la fecha actual.',
  INPUT_PROFESSIONAL_AND_ADMINISTRATOR: 'Solo puede ingresar un professional o un administrador.',
  NOT_INPUT_PROFESSIONAL_AND_ADMINISTRATOR: 'Ingrese un profesional o administrador.',
  CLIENT_NOT_FOUND: 'No se encontro el cliente ingresado.',
  VISIT_ALREADY_EXISTS: 'La visita ya se encuentra registrada',
  CURRENT_DATE_HIGHER_THAN_START_DATE:
    'La toma de medicamentos ya comenzo y no es posible editar la fecha de inicio.',
  SESSION_ERROR_QUANTITY:
    'La sesión del plan de tratamiento tiene {appointments} registrados. La cantidad no puede ser menor a {appointments}.',
  SESSION_ERROR_QUANTITY_DELETE: 'La sesión que intenta eliminar tiene turnos asociados.',
  ALREAD_HAS_A_REPROGRAMMING_REQUEST: 'El turno ya tiene una reprogramación pendiente.',
  PROFESSIONAL_DONT_HAVE_AVAILABILITY:
    'El professional no tiene diponibilidad horaria en el o en alguno de los periodos indicados',
  PROFESSIONAL_IS_RESERVED: 'El professional se encuentra reservado en el o en alguno de los periodos indicados',
  PROFESSIONAL_HAS_AN_APPOINTMENT: 'El professional tiene una cita en el o en alguno de los periodos indicados',
  SPECIALTY_AVAILABILITY_NOT_FOUND_IN_PROFESSIONS:
    'La especialidad {name} ingresada en disponibilidad no existe en las profesiones del profesional',
  DATE_FROM_IS_GRATER_THAN_DATE_TO: 'La fecha hasta no puede ser inferior a la fecha desde.',
  DATE_FROM_IS_LOWER_THAN_TODAY: 'La fecha desde no puede ser inferior a la fecha actual',
  REPROGRAMMING_SAME_DATE_AND_TIME:
    'No se puede reprogramar un turno para la misma fecha y hora en la que estaba programado.',
  NAME_TEMPLATE_ALREADY_EXIST:
    'El nombre ingresado para la plantilla ya existe. Cambie el nombre o elimine la plantilla anterior.',

  //report appointment
  appointment_report__id: 'ID',
  appointment_report_date: 'Fecha',
  appointment_report_state: 'Estado',
  appointment_report_patient: 'Paciente',
  appointment_report_professional: 'Profesional',
  appointment_report_profession: 'Profesion',
  appointment_report_profession_registration: 'Matricula',
  appointment_report_specialty: 'Especialidad',
  appointment_report_specialty_registration: 'Reg. Especialidad',
  appointment_report_financer: 'Financiador',
  appointment_report_attatchments: 'Adjuntos',
  appointment_report_idCard: 'DNI',
  appointment_report_plan: 'Plan',
  appointment_report_credential: 'Credencial',
  appointment_report_from: 'Desde',
  appointment_report_to: 'Hasta',
  appointment_report_visit_start: 'Inicio visita',
  appointment_report_visit_end: 'Fin visita',
  appointment_report_important: 'Importante',
  appointment_report_files: 'Archivos',
  appointment_report_recipes: 'Recetas',
  appointment_report_logistics: 'Pedidos de logistica',
  appointment_report_dynamic_reports: 'Reportes dinamicos',
  appointment_report_completed: 'FINALIZADA',
  appointment_report_pending: 'PENDIENTE',
  appointment_report_incompleted: 'NO REALIZADA',
  appointment_report_canceled: 'CANCELADA',
  appointment_report_yes: 'SI',
  appointment_report_not: 'NO',
  appointment_report_is_reprogramming: 'Reprogramación',

  logistic_report_id: 'ID',
  logistic_report_date: 'Fecha',
  logistic_report_state: 'Estado',
  logistic_report_visit: 'Visita',
  logistic_report_patient: 'Paciente',
  logistic_report_patient_idCard: 'DNI',
  logistic_report_obs: 'OBS',
  logistic_report_limit_date: 'Fecha limite',
  logistic_report_priority: 'Prioridad',
  logistic_report_supplies: 'Insumos',
  logistic_report_professional: 'Profesional',
  logistic_report_last_editor: 'Ultimo editor',
  logistic_report_yes: 'SI',
  logistic_report_no: 'NO',
  logistic_report_incompleted: 'NO ENTREGADO',
  logistic_report_delivered: 'ENTREGADO',
  logistic_report_requested: 'PENDIENTE DE APROBACION',
  logistic_report_pending: 'PENDIENTE',
  logistic_report_canceled: 'CANCELADO'
};