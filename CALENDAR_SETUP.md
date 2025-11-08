# 📅 Google Calendar Booking System - Setup Guide

Este documento explica cómo configurar el sistema de reservas con Google Calendar API.

## 🎯 Estado Actual

Actualmente, el sistema está funcionando en **modo de desarrollo** con una API simulada (mock). Esto permite probar la funcionalidad sin necesidad de configurar Google Calendar API inmediatamente.

## 🚀 Quick Start (Desarrollo)

El sistema funciona automáticamente en modo desarrollo sin configuración adicional:

```bash
npm run dev
```

Visita: `http://localhost:5173/reservas`

### Datos de Prueba

En modo desarrollo, ya hay algunas citas pre-configuradas:
- **Hoy**: 09:00, 14:00, 16:00 (ocupados)
- **Mañana**: 10:00, 11:00 (ocupados)

## 🔧 Configuración para Producción

Para conectar con Google Calendar API real, sigue estos pasos:

### 1. Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google Calendar API**:
   - Ve a "APIs & Services" > "Library"
   - Busca "Google Calendar API"
   - Haz clic en "Enable"

### 2. Configurar OAuth 2.0

1. Ve a "APIs & Services" > "Credentials"
2. Crea credenciales de tipo "OAuth 2.0 Client ID"
3. Configura la pantalla de consentimiento:
   - User Type: External
   - Añade scopes: `https://www.googleapis.com/auth/calendar`
4. Descarga las credenciales JSON

### 3. Configurar Service Account (Recomendado para Backend)

Para automatizar sin intervención del usuario:

1. Ve a "APIs & Services" > "Credentials"
2. Crea una "Service Account"
3. Descarga el archivo JSON de la service account
4. Comparte tu Google Calendar con el email de la service account
   - Permisos: "Make changes to events"

### 4. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Google Calendar API Configuration
VITE_CALENDAR_API_URL=https://your-api-endpoint.com/api/calendar

# Backend/Supabase Edge Function
GOOGLE_CALENDAR_ID=your-calendar-id@gmail.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 5. Implementar Backend (Opción A: Supabase Edge Functions)

Crea edge functions en Supabase:

```bash
# Instalar Supabase CLI
npm install -g supabase

# Inicializar
supabase init

# Crear edge function
supabase functions new calendar-availability
supabase functions new calendar-book
```

**Estructura recomendada:**

```
supabase/
└── functions/
    ├── calendar-availability/
    │   └── index.ts  # GET /calendar/availability?date=YYYY-MM-DD
    ├── calendar-book/
    │   └── index.ts  # POST /calendar/book
    └── calendar-business-hours/
        └── index.ts  # GET/PUT /calendar/business-hours
```

#### Ejemplo de Edge Function (`calendar-book/index.ts`):

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { google } from 'https://esm.sh/googleapis@118.0.0'

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const { nombre, email, telefono, fecha, hora } = await req.json()

  // Initialize Google Calendar API
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: Deno.env.get('GOOGLE_SERVICE_ACCOUNT_EMAIL'),
      private_key: Deno.env.get('GOOGLE_PRIVATE_KEY'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })

  const calendar = google.calendar({ version: 'v3', auth })

  // Create event
  const event = {
    summary: `Cita con ${nombre}`,
    description: `Email: ${email}\nTeléfono: ${telefono}`,
    start: {
      dateTime: `${fecha}T${hora}:00`,
      timeZone: 'America/New_York', // Ajusta según tu zona horaria
    },
    end: {
      dateTime: `${fecha}T${hora}:00`, // + duración
      timeZone: 'America/New_York',
    },
    attendees: [{ email }],
  }

  try {
    const response = await calendar.events.insert({
      calendarId: Deno.env.get('GOOGLE_CALENDAR_ID'),
      requestBody: event,
      sendUpdates: 'all', // Send email notifications
    })

    return new Response(
      JSON.stringify({
        success: true,
        eventId: response.data.id,
        message: 'Reserva creada exitosamente',
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error al crear la reserva',
        error: error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

### 6. Implementar Backend (Opción B: Node.js/Express)

Si prefieres un servidor Node.js tradicional:

```bash
npm install googleapis express cors dotenv
```

Ejemplo de servidor en `server/index.js`:

```javascript
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });

app.post('/api/calendar/book', async (req, res) => {
  // ... implementación similar a edge function
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## 📊 Tabla de Configuración en Supabase (Opcional)

Para permitir configurar horarios desde el panel admin:

```sql
CREATE TABLE business_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dias_laborables INTEGER[] NOT NULL DEFAULT '{1,2,3,4,5}',
  hora_inicio TIME NOT NULL DEFAULT '09:00',
  hora_fin TIME NOT NULL DEFAULT '18:00',
  duracion_cita INTEGER NOT NULL DEFAULT 60,
  buffer_time INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default configuration
INSERT INTO business_hours (dias_laborables, hora_inicio, hora_fin, duracion_cita)
VALUES ('{1,2,3,4,5}', '09:00', '18:00', 60);
```

## 🔄 Migración de Mock a Producción

1. Configura las variables de entorno (paso 4)
2. Implementa el backend (paso 5 ó 6)
3. Deploy del backend
4. Actualiza `VITE_CALENDAR_API_URL` con la URL real
5. Rebuild y deploy del frontend

El sistema detectará automáticamente la variable de entorno y dejará de usar el mock.

## 🧪 Testing

Para probar la integración:

```bash
# Modo desarrollo (mock)
npm run dev

# Modo producción (API real)
VITE_CALENDAR_API_URL=https://your-api.com npm run build
npm run preview
```

## 📝 Checklist de Implementación

- [x] Frontend con formulario multi-step
- [x] Mock API para desarrollo
- [x] Tipos TypeScript
- [ ] Backend API (Supabase Edge Functions o Node.js)
- [ ] Google Calendar API configurada
- [ ] Variables de entorno configuradas
- [ ] Tabla de configuración en Supabase
- [ ] Panel admin para configurar horarios
- [ ] Envío de emails de confirmación
- [ ] Testing en producción

## 🆘 Troubleshooting

### Error: "No se pudieron cargar los horarios disponibles"
- Verifica que el backend esté corriendo
- Verifica las variables de entorno
- Revisa los logs del backend/edge function

### Error: "Invalid credentials"
- Verifica que las credenciales de Google estén correctas
- Asegúrate de que el service account tenga acceso al calendar
- Verifica que los scopes sean correctos

### Las citas no aparecen en Google Calendar
- Verifica el `GOOGLE_CALENDAR_ID`
- Asegúrate de compartir el calendar con el service account
- Revisa los permisos del service account

## 📚 Recursos

- [Google Calendar API Documentation](https://developers.google.com/calendar/api/guides/overview)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Google Service Account Authentication](https://cloud.google.com/iam/docs/service-accounts)

---

**Nota**: El sistema actual funciona perfectamente en modo desarrollo. La configuración de producción es opcional y puede implementarse cuando estés listo para conectar con Google Calendar real.
