# Guía Básica de Git para el Equipo

## 🔄 Flujo de Trabajo Recomendado

1. Moverse a la rama develop y actualizar:

```git
git checkout develop
git pull origin develop
```

2. Crear una nueva rama para tu tarea:

```git
git checkout -b P2/Crear-Bocetos-FE
```

3. Realizar los cambios y subirlos:

```git
git add .
git commit -m "Descripción clara de los cambios"
git push origin P2/Crear-Bocetos-FE
```

4. Hacer un Pull Request en GitHub para fusionar tu rama con `develop`.

5. Mantén tu rama actualizada con los últimos cambios de `develop` (realiza un merge si es necesario).

## 🌳 Trabajo con Ramas

1. Crear una nueva rama:
Cuando creemos una nueva rama/tarea, la debemos de crear a partir de `develop` (que es la rama principal):

```git
git checkout develop                  # Moverse a la rama develop
git pull origin develop               # Actualizar develop con los últimos cambios
git checkout -b "nombre de la rama"   # Crear y moverse a la nueva rama
```

Ejemplo:

```git
git checkout -b P2/Crear-Bocetos-FE
```

2. Moverse entre ramas:

```git
git checkout <nombre-de-la-rama>
```

Ejemplo:

```git
git checkout develop
```

3. Subir tu rama al repositorio remoto:
Una vez hayas hecho cambios en tu rama y los quieras subir:

```git
git add .                                    # Añadir todos los cambios al área de staging
git commit -m "Descripción de los cambios"   # Crear un commit con tus cambios
git push origin "nombre de la rama"          # Subir la rama al repositorio remoto
```

Ejemplo:

```git
git push origin P2/Crear-Bocetos-FE
```

4. Actualizar tu rama con los cambios de develop:

Si hay cambios nuevos en develop, es importante actualizarlos en tu rama antes de hacer un Pull Request:

```git
git checkout develop                  # Moverse a la rama develop
git pull origin develop               # Descargar los últimos cambios
git checkout <nombre-de-la-rama>      # Volver a tu rama
git merge develop                     # Fusionar develop con tu rama
```

Si hay conflictos, Git te lo indicará. Resuélvelos manualmente y después:

```git
git add .                            # Añadir los archivos resueltos
git commit -m "Conflictos resueltos"
```

5. 🔄 Obtener los cambios de otros compañeros

Para asegurarte de tener los últimos cambios:

Ve a la rama principal develop:

```git
git checkout develop
git pull origin develop
```
