# Invitación de cumpleaños

Landing responsive creada con React, Vite y TypeScript. Las confirmaciones se envían a una Web App de Google Apps Script, que las guarda en una Google Sheet. No necesita backend, base de datos ni credenciales en el frontend.

## Ejecutar localmente

1. Instalá Node.js 20 o superior.
2. En la carpeta del proyecto ejecutá `npm install`.
3. Copiá `.env.example` como `.env.local`.
4. Más adelante pegá en `VITE_RSVP_ENDPOINT` la URL de tu Web App de Apps Script.
5. Ejecutá `npm run dev` y abrí la URL indicada por Vite.

La invitación se configura en [src/config/event.ts](src/config/event.ts): nombre, fecha/hora, lugar, dirección y URL de Google Maps. La fecha `date` usa formato ISO y alimenta también la cuenta regresiva.

## Conectar Google Sheets y Apps Script

1. Creá una nueva Google Sheet, por ejemplo **RSVP cumpleaños**.
2. Dentro de esa Sheet abrí **Extensiones → Apps Script**. Es importante hacerlo desde la Sheet para que el script quede vinculado a ella.
3. Borrá el contenido inicial de `Code.gs`.
4. Abrí [docs/google-apps-script.js](docs/google-apps-script.js), copiá todo su contenido y pegalo en `Code.gs`.
5. Guardá el proyecto. La primera respuesta creará una pestaña llamada `RSVP` con estas columnas: `Timestamp`, `Nombre`, `De parte de quién viene`, `Asiste`.
6. Hacé clic en **Implementar → Nueva implementación**.
7. En el selector elegí **Aplicación web**. Configurá **Ejecutar como: Yo** y **Quién tiene acceso: Cualquiera**. Esto permite que una persona invitada confirme sin iniciar sesión.
8. Hacé clic en **Implementar**, autorizá el proyecto de Google si te lo solicita y copiá la URL que termina en `/exec`. No uses la URL `/dev`.
9. En el proyecto creá `.env.local` con:

```env
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/TU_ID_DE_DESPLIEGUE/exec
```

10. Reiniciá `npm run dev`, completá un RSVP de prueba y verificá que aparezca una fila en la pestaña `RSVP` de la Sheet.

Si editás Apps Script después de desplegar, creá una nueva versión/implementación para que los cambios se apliquen. Si cambiás la URL de despliegue, actualizá también la variable de entorno.

## Desplegar en Vercel

1. Subí este proyecto a un repositorio Git.
2. En Vercel elegí **Add New → Project** e importá el repositorio.
3. Vercel detectará Vite automáticamente. Los comandos son `npm run build` y la carpeta de salida es `dist`.
4. En **Settings → Environment Variables** agregá `VITE_RSVP_ENDPOINT` con la URL `/exec` de Apps Script. Agregala al entorno Production (y Preview si querés probarlo allí).
5. Desplegá. Cada vez que se actualice esa variable, hacé un nuevo deployment.

Para Netlify, el flujo es equivalente: build command `npm run build`, publish directory `dist` y la misma variable de entorno.

## Verificaciones

```bash
npm run lint
npm run build
```

`VITE_RSVP_ENDPOINT` se inyecta durante el build y no contiene ninguna credencial. Nunca agregues secretos de Google al frontend.
