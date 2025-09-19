Coloca aquí tu google-services.json

Instrucciones para configurar Firebase en Android

1) Descargar el archivo
 - Ve a la consola de Firebase (https://console.firebase.google.com)
 - Selecciona tu proyecto
 - Añade o selecciona la app Android con el applicationId: com.vocesdeesperanza.app
 - Descarga el archivo `google-services.json`

2) Colocar el archivo
 - Copia `google-services.json` en la carpeta: android/app/
 - La ruta final debe ser: android/app/google-services.json

3) Aplicar plugin (opcional)
 - Tu `android/app/build.gradle` tiene lógica que aplica el plugin `com.google.gms.google-services` si el archivo existe.
 - Si prefieres, puedes descomentar o añadir al final del archivo:
   apply plugin: 'com.google.gms.google-services'

4) Añadir dependencias (opcional, recomendado para FCM)
 - En `android/app/build.gradle` añade la dependencia de Firebase Messaging:
   implementation 'com.google.firebase:firebase-messaging:23.3.0'
 - Ajusta la versión según la documentación oficial.

5) Probar
 - Ejecuta desde la raíz del proyecto:
   npx cap copy android
   cd android
   .\gradlew assembleDebug
 - Revisa `adb logcat` cuando ejecutes la app para confirmar que FirebaseApp se inicializa correctamente.

Notas:
 - No compartas `google-services.json` públicamente si contiene credenciales sensibles.
 - Si la app sigue fallando, revisa que el applicationId en Firebase coincida exactamente con el package name `com.vocesdeesperanza.app`.
