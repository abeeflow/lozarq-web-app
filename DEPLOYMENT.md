# Guía de Deployment en Vercel

## Checklist Pre-Deployment

- [x] Build de producción funciona correctamente (`npm run build`)
- [x] Variables de entorno documentadas en `.env.example`
- [x] Archivos sensibles en `.gitignore`
- [x] Configuración `vercel.json` para SPA routing
- [x] README actualizado

## Pasos para Deployar

### 1. Preparar Repositorio Git

```bash
# Si aún no has inicializado git
git init
git add .
git commit -m "Initial commit - ready for deployment"

# Crear repositorio en GitHub y conectarlo
git remote add origin <tu-repo-url>
git branch -M main
git push -u origin main
```

### 2. Deploy en Vercel

#### Opción A: Desde la Web de Vercel

1. Ir a [vercel.com](https://vercel.com)
2. Click en "Add New Project"
3. Importar tu repositorio de GitHub
4. Configurar el proyecto:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (detectado automáticamente)
   - **Output Directory**: `dist` (detectado automáticamente)
   - **Install Command**: `npm install` (detectado automáticamente)

5. Añadir Environment Variables:
   ```
   VITE_SUPABASE_URL=https://zvimuzlfdpiuiuyqmkhu.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_clave_anon_aquí
   VITE_CALENDLY_URL=https://calendar.app.google/21RBPrPcN4D63N9f9
   ```

6. Click en "Deploy"

#### Opción B: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### 3. Configurar Dominio Personalizado (Opcional)

1. En tu proyecto de Vercel, ir a "Settings" > "Domains"
2. Añadir tu dominio personalizado
3. Configurar los registros DNS según las instrucciones de Vercel

### 4. Variables de Entorno

**IMPORTANTE**: En Vercel, configura estas variables:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://zvimuzlfdpiuiuyqmkhu.supabase.co` | URL de tu proyecto Supabase |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJ...` | Clave anónima de Supabase |
| `VITE_CALENDLY_URL` | `https://calendar.app.google/...` | URL del calendario de Google |

### 5. Configuración de Supabase

Asegúrate de añadir la URL de tu deployment de Vercel a las "Authorized URLs" en Supabase:

1. Ve a tu dashboard de Supabase
2. Settings > API > Site URL
3. Añade: `https://tu-proyecto.vercel.app`

### 6. Verificación Post-Deployment

Después del deployment, verifica:

- ✅ La página principal carga correctamente
- ✅ La navegación funciona (prueba diferentes rutas)
- ✅ Las imágenes y assets se cargan
- ✅ El sistema de proyectos funciona
- ✅ El calendario de Google se muestra
- ✅ El panel de admin es accesible

## Deploy Automático

Una vez configurado, Vercel:
- ✨ Desplegará automáticamente cada push a la rama `main`
- 🔍 Creará preview deployments para PRs
- 📊 Proveerá analytics y logs

## Troubleshooting

### Error: "404 on route refresh"
- Verificar que `vercel.json` existe con la configuración de rewrites
- El archivo ya está incluido en el proyecto

### Error: "Environment variables undefined"
- Verificar que las variables empiezan con `VITE_`
- Configurarlas en Vercel Dashboard > Settings > Environment Variables
- Redesplegar el proyecto

### Error: "Supabase connection failed"
- Verificar que las credenciales de Supabase son correctas
- Verificar que la URL de Vercel está en las Authorized URLs de Supabase

### Build fails
```bash
# Limpiar y reconstruir
rm -rf node_modules dist
npm install
npm run build
```

## Comandos Útiles

```bash
# Ver el estado del deployment
vercel ls

# Ver logs
vercel logs

# Cancelar un deployment
vercel rm <deployment-url>

# Abrir el proyecto en el navegador
vercel open
```

## Soporte

Para más información:
- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Vite](https://vitejs.dev/guide/)
- [Documentación de Supabase](https://supabase.com/docs)
