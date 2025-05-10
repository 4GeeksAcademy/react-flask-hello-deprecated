# Aplicación de Gestión Financiera Personal

## Descripción General
Esta aplicación ayuda a los usuarios a registrar sus ingresos, gastos y presupuestos, ofreciendo un análisis detallado de su situación financiera y recomendaciones personalizadas basadas en sus hábitos de consumo. Está diseñada para simplificar la gestión financiera personal con funcionalidades visuales y fáciles de usar.
En el que aparte puede crear grupos de usuarios con el que compartiran las finanzas y un chat en el que estará fromado por los integrantes del grupo para poder comunicarse entre ellos sin necesidad de una aplicación externa. 

## Funcionalidades Principales

1. Registro de Transacciones
- Permite a los usuarios registrar ingresos y gastos, categorizándolos (alimentación, transporte, entretenimiento, etc.).
- Agregar detalles como monto, fecha, método de pago y notas adicionales.

2. Gestión de Presupuestos
- Creación y seguimiento de presupuestos mensuales por categorías.
- Alertas si el usuario se acerca a superar el presupuesto.

3. Visualización de Datos
- Gráficos interactivos (barras, pastel, líneas) para mostrar la distribución de gastos e ingresos.
- Resúmenes financieros diarios, semanales y mensuales.

4. Gestión Multidivisa
- Conversión automática de monedas al registrar transacciones en divisas extranjeras, usando una API de tasas de cambio (CurrencyLayer).

5. Autenticación y Seguridad
- Registro de usuarios con correo electrónico y autenticación (por ejemplo, JWT).
- Cifrado de datos sensibles.

6. Integración con Bancos y Tarjetas (Opcional Avanzado)
- Sincronización automática de cuentas bancarias y tarjetas para importar transacciones usando una API como Plaid o FinBox.

7. Grupos de usuarios
- Grupos formados por usuarios en los que son invitados mediante un token o invitacion.
- Compartir las finanzas con el resto de usuarios del grupo.

8- Chat entre usuarios
- Compartir un chat global por cada grupo sin necesidad de usar otra aplicación externa.
- Por ejemplo un chat de telegram o appWrite

8. Otros Extras
- Recordatorios automáticos para pagos recurrentes (facturas, rentas, etc.).
- Modo oscuro y personalización de temas.

## Tecnologías Sugeridas

### Frontend
- **React**: Para construir la interfaz de usuario.
- **Librerías de diseño**: Material-UI, Chakra UI, o TailwindCSS.
- **Librería para gráficos**: Chart.js o Recharts.

### Backend
- **Python con Flask**: Para construir la API.
- **Autenticación**: JWT.
- **Base de datos**: MySQL.

### APIs Externas
- **CurrencyLayer o ExchangeRate-API**: Para conversión de divisas en tiempo real.
- **Plaid API**: Para integración bancaria y automatización de transacciones.
- **Telegram o appWrite**: Para chat global de usuarios.

## Estructura del Proyecto

### Frontend
#### Páginas principales:
- **Login**:
  - Donde el usuario podrá acceder a su apartado personal.
- **Singup**:
  - El usuario podrá crearse una cuenta para acceder
  - Opcional: cifrar contrseñas
- **Inicio**:
  - Resumen general de finanzas.
  - Gráficos de ingresos/gastos.
- **Registro de Transacciones**:
  - Formulario para agregar o editar ingresos y gastos.
- **Presupuesto**:
  - Gestión de presupuestos y seguimiento.
- **Finanzas en Grupo**:
  - Todos los usuarios comparten las mismas finanzas.
- **Chat global**:
  - Donde los usuarios tendrán un chat para comunicarse entre ellos.
- **Análisis**:
  - Panel con recomendaciones personalizadas.
- **Configuración**:
  - Gestión de cuenta, temas, exportación de datos.

### Backend
#### Endpoints principales:
- `/auth`:
  - Registro, inicio de sesión, y autenticación de usuarios.
- `/transactions`:
  - CRUD de ingresos y gastos.
- `/budget`:
  - Gestión de presupuestos.
- `/analysis`:
  - Generación de análisis y recomendaciones.
- `/currency`:
  - Conversión de divisas usando una API externa.

#### Base de datos:
- **Tablas principales**:
  - **Usuarios**: Información de usuarios.
  - **Transacciones**: Detalles de ingresos y gastos.
  - **Presupuestos**: Configuración de presupuestos por categorías.
  - **Historial de conversión**: Tasas de cambio registradas.
  - **Grupos**: Usuarios que forman parte del grupo.

## Desafíos Técnicos

### Sincronización bancaria
- Implementar APIs como Plaid puede requerir configuraciones avanzadas y manejo de datos sensibles.

### Análisis de datos
- Construir algoritmos personalizados para detectar patrones y generar recomendaciones útiles.

### Visualización de gráficos
- Asegurar que las visualizaciones sean interactivas y actualicen datos en tiempo real.

### Escalabilidad
- Manejar múltiples usuarios y grandes volúmenes de datos transaccionales de forma eficiente.

### Chat
- Lograr un chat en tiempo real de usuarios.
