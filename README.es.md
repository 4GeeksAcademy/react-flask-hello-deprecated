# Plantilla de WebApp con React JS y Flask API

Construye aplicaciones web usando React.js para el front end y python/flask para tu API backend.

- La documentación se puede encontrar aquí: https://4geeks.com/docs/start/react-flask-template
- Aquí hay un video sobre [cómo usar esta plantilla](https://www.youtube.com/watch?v=qBz6Ddd2m38)
- Integrado con Pipenv para la gestión de paquetes.
- Despliegue rápido a Render [en solo unos pocos pasos aquí](https://4geeks.com/es/docs/start/despliega-con-render-com).
- Uso del archivo .env.
- Integración de SQLAlchemy para la abstracción de bases de datos.

### 1) Instalación:

> Si usas Github Codespaces (recomendado) o Gitpod, esta plantilla ya vendrá con Python, Node y la base de datos Posgres instalados. Si estás trabajando localmente, asegúrate de instalar Python 3.10, Node.

Se recomienda instalar el backend primero, asegúrate de tener Python 3.10, Pipenv y un motor de base de datos (se recomienda Posgres).

1. Instala los paquetes de python: `$ pipenv install`
2. Crea un archivo .env basado en el .env.example: `$ cp .env.example .env`
3. Instala tu motor de base de datos y crea tu base de datos, dependiendo de tu base de datos, debes crear una variable DATABASE_URL con uno de los valores posibles, asegúrate de reemplazar los valores con la información de tu base de datos:

| Motor     | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgres  | postgres://username:password@localhost:5432/example |

4. Migra las migraciones: `$ pipenv run migrate` (omite si no has hecho cambios en los modelos en `./src/api/models.py`)
5. Ejecuta las migraciones: `$ pipenv run upgrade`
6. Ejecuta la aplicación: `$ pipenv run start`

> Nota: Los usuarios de Codespaces pueden conectarse a psql escribiendo: `psql -h localhost -U gitpod example`

### Deshacer una migración

También puedes deshacer una migración ejecutando

```sh
$ pipenv run downgrade
```

### Población de la tabla de usuarios en el backend

Para insertar usuarios de prueba en la base de datos, ejecuta el siguiente comando:

```sh
$ flask insert-test-users 5
```

Y verás el siguiente mensaje:

```
    Creating test users
    test_user1@test.com created.
    test_user2@test.com created.
    test_user3@test.com created.
    test_user4@test.com created.
    test_user5@test.com created.
    Users created successfully!
```

### **Nota importante para la base de datos y los datos dentro de ella**

Cada entorno de Github Codespace tendrá **su propia base de datos**, por lo que si estás trabajando con más personas, cada uno tendrá una base de datos diferente y diferentes registros dentro de ella. Estos datos **se perderán**, así que no pases demasiado tiempo creando registros manualmente para pruebas, en su lugar, puedes automatizar la adición de registros a tu base de datos editando el archivo ```commands.py``` dentro de la carpeta ```/src/api```. Edita la línea 32 de la función ```insert_test_data``` para insertar los datos según tu modelo (usa la función ```insert_test_users``` anterior como ejemplo). Luego, todo lo que necesitas hacer es ejecutar ```pipenv run insert-test-data```.

### Instalación manual del Front-End:

-   Asegúrate de estar usando la versión 20 de node y de que ya hayas instalado y ejecutado correctamente el backend.

1. Instala los paquetes: `$ npm install`
2. ¡Empieza a codificar! inicia el servidor de desarrollo de webpack `$ npm run start`

## ¡Publica tu sitio web!

Esta plantilla está 100% lista para desplegarse con Render.com y Heroku en cuestión de minutos. Por favor, lee la [documentación oficial al respecto](https://4geeks.com/docs/start/deploy-to-render-com).

### Contribuyentes

Esta plantilla fue construida como parte del [Coding Bootcamp](https://4geeksacademy.com/us/coding-bootcamp) de 4Geeks Academy por [Alejandro Sanchez](https://twitter.com/alesanchezr) y muchos otros contribuyentes. Descubre más sobre nuestro [Curso de Desarrollador Full Stack](https://4geeksacademy.com/us/coding-bootcamps/part-time-full-stack-developer) y [Bootcamp de Ciencia de Datos](https://4geeksacademy.com/us/coding-bootcamps/datascience-machine-learning).

Puedes encontrar otras plantillas y recursos como este en la [página de github de la escuela](https://github.com/4geeksacademy/).
