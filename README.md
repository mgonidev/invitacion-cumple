# Invitación de cumpleaños

Landing responsive creada con React, Vite y TypeScript.

## Ejecutar localmente

1. Instalá Node.js 20 o superior.
2. En la carpeta del proyecto ejecutá `npm install`.
3. Ejecutá `npm run dev` y abrí la URL indicada por Vite.

La invitación se configura en [src/config/event.ts](src/config/event.ts): nombre, fecha/hora, lugar, dirección y URL de Google Maps. La fecha `date` usa formato ISO y alimenta también la cuenta regresiva.

## Desplegar en Vercel

1. Subí este proyecto a un repositorio Git.
2. En Vercel elegí **Add New → Project** e importá el repositorio.
3. Vercel detectará Vite automáticamente. Los comandos son `npm run build` y la carpeta de salida es `dist`.
4. Desplegá. Cada `git push` a la rama conectada genera una actualización automáticamente.

Para Netlify, el flujo es equivalente: build command `npm run build` y publish directory `dist`.

## Verificaciones

```bash
npm run lint
npm run build
```
