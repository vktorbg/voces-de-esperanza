# Backup de configuración flatDir - Voces de Esperanza
## Fecha: 2025-09-18
## Archivo: android/app/build.gradle

### Configuración original (líneas 41-45):
```groovy
repositories {
    flatDir{
        dirs '../capacitor-cordova-android-plugins/src/main/libs', 'libs'
    }
}
```

### Problema identificado:
- Los directorios referenciados NO EXISTEN en el proyecto
- Esta configuración está causando problemas en la resolución de dependencias
- Posible causa del crash de la aplicación

### Solución propuesta:
- Eliminar completamente el bloque `repositories { flatDir{...} }`
- No se requiere reemplazo porque no hay dependencias locales
- Los repositorios google() y mavenCentral() en build.gradle raíz son suficientes

### Para revertir (si fuera necesario):
Restaurar las líneas 41-45 en android/app/build.gradle con el contenido mostrado arriba.