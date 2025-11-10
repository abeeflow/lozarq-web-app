# 🎥 Google Calendar API + Google Meet - Configuración Completa

Esta guía te muestra cómo integrar Google Calendar API para crear citas reales con Google Meet y envío automático de emails.

## 📋 Requisitos

- ✅ Cuenta de Google Cloud Platform
- ✅ Proyecto de Supabase activo
- ✅ Dominio o cuenta de correo configurada

---

## 🚀 Paso 1: Configurar Google Cloud Platform

### 1.1 Crear Proyecto

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Nombre sugerido: `lozarq-calendar-booking`

### 1.2 Habilitar APIs

En el menú lateral, ve a **"APIs & Services" > "Library"** y habilita:

- ✅ **Google Calendar API**
- ✅ **Gmail API** (para enviar emails)

### 1.3 Crear Service Account

1. Ve a **"IAM & Admin" > "Service Accounts"**
2. Haz clic en **"+ CREATE SERVICE ACCOUNT"**
3. Completa:
   - **Name**: `booking-service`
   - **Description**: `Service account for booking system`
4. Haz clic en **"CREATE AND CONTINUE"**
5. **Skip roles** (no necesario para este caso)
6. Haz clic en **"DONE"**

### 1.4 Crear y Descargar Credenciales

1. Haz clic en la service account recién creada
2. Ve a la pestaña **"KEYS"**
3. Haz clic en **"ADD KEY" > "Create new key"**
4. Selecciona **JSON**
5. Descarga el archivo (se verá como `proyecto-123abc-1234567890.json`)

**⚠️ IMPORTANTE**: Guarda este archivo de forma segura, contiene credenciales privadas.

---

## 📅 Paso 2: Configurar Google Calendar

### 2.1 Compartir Calendar con Service Account

1. Abre [Google Calendar](https://calendar.google.com/)
2. En la barra lateral izquierda, encuentra tu calendario
3. Haz clic en los **3 puntos** al lado del calendario
4. Selecciona **"Settings and sharing"**
5. Baja hasta **"Share with specific people"**
6. Haz clic en **"+ Add people"**
7. Pega el email de tu service account:
   ```
   booking-service@tu-proyecto.iam.gserviceaccount.com
   ```
   (Lo encuentras en el archivo JSON descargado)
8. Permisos: **"Make changes to events"**
9. **Send** (no marcar "notify")

### 2.2 Obtener Calendar ID

1. En la misma pantalla de Settings
2. Baja hasta **"Integrate calendar"**
3. Copia el **Calendar ID** (parece un email):
   ```
   tu-email@gmail.com
   ```
   O puede ser algo como:
   ```
   abc123xyz@group.calendar.google.com
   ```

---

## 🔧 Paso 3: Configurar Supabase Edge Function

### 3.1 Instalar Supabase CLI

```bash
npm install -g supabase
```

### 3.2 Inicializar Supabase (si no lo has hecho)

```bash
supabase init
```

### 3.3 Crear Edge Function

```bash
supabase functions new create-booking
```

Esto crea: `supabase/functions/create-booking/index.ts`

### 3.4 Código de la Edge Function

Crea el archivo: `supabase/functions/create-booking/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { nombre, email, telefono, servicio, fecha, hora } = await req.json()

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Google Calendar configuration
    const calendarId = Deno.env.get('GOOGLE_CALENDAR_ID')!
    const serviceAccountEmail = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_EMAIL')!
    const privateKey = Deno.env.get('GOOGLE_PRIVATE_KEY')!.replace(/\\n/g, '\n')

    // Create JWT for Google API authentication
    const jwt = await createJWT(serviceAccountEmail, privateKey)

    // Get access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    })

    const { access_token } = await tokenResponse.json()

    // Calculate end time (1 hour later)
    const startDateTime = `${fecha}T${hora}:00`
    const endTime = new Date(startDateTime)
    endTime.setHours(endTime.getHours() + 1)
    const endDateTime = endTime.toISOString().slice(0, 16) + ':00'

    // Create event with Google Meet
    const event = {
      summary: `Reunión con ${nombre}`,
      description: `
        Servicio: ${servicio || 'No especificado'}
        Email: ${email}
        Teléfono: ${telefono}
      `,
      start: {
        dateTime: startDateTime,
        timeZone: 'America/Mexico_City', // Ajusta tu zona horaria
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'America/Mexico_City',
      },
      attendees: [
        { email: email, displayName: nombre },
      ],
      conferenceData: {
        createRequest: {
          requestId: `booking-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 30 },
        ],
      },
    }

    // Create event in Google Calendar
    const calendarResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?conferenceDataVersion=1&sendUpdates=all`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    )

    if (!calendarResponse.ok) {
      const error = await calendarResponse.json()
      throw new Error(`Calendar API error: ${JSON.stringify(error)}`)
    }

    const calendarEvent = await calendarResponse.json()

    // Save booking in Supabase
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .insert({
        nombre,
        email,
        telefono,
        servicio,
        fecha,
        hora: hora + ':00',
        google_event_id: calendarEvent.id,
        google_calendar_link: calendarEvent.htmlLink,
        estado: 'confirmada',
      })
      .select()
      .single()

    if (dbError) throw dbError

    // Google automatically sends email to attendees when sendUpdates=all

    return new Response(
      JSON.stringify({
        success: true,
        eventId: booking.id,
        meetLink: calendarEvent.hangoutLink,
        calendarLink: calendarEvent.htmlLink,
        message: 'Reserva creada exitosamente. Revisa tu email para los detalles.',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})

// JWT creation for Google API
async function createJWT(email: string, privateKey: string) {
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  }

  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }

  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

  const signatureInput = `${encodedHeader}.${encodedPayload}`

  // Import private key
  const pemHeader = '-----BEGIN PRIVATE KEY-----'
  const pemFooter = '-----END PRIVATE KEY-----'
  const pemContents = privateKey.replace(pemHeader, '').replace(pemFooter, '').replace(/\s/g, '')

  const binaryKey = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0))

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(signatureInput)
  )

  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  return `${signatureInput}.${encodedSignature}`
}
```

---

## 🔐 Paso 4: Configurar Variables de Entorno en Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com/)
2. Ve a **Settings > Edge Functions**
3. Agrega las siguientes **secrets**:

```bash
GOOGLE_CALENDAR_ID=tu-email@gmail.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=booking-service@tu-proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_PRIVATE_KEY_AQUI\n-----END PRIVATE KEY-----\n"
```

**Cómo obtener el PRIVATE_KEY:**
Del archivo JSON descargado, copia el valor de `"private_key"` (incluye los `\n`)

---

## 🚀 Paso 5: Deploy de Edge Function

```bash
# Login a Supabase
supabase login

# Link a tu proyecto
supabase link --project-ref tu-project-ref

# Deploy
supabase functions deploy create-booking
```

---

## 🔗 Paso 6: Actualizar Frontend

En `.env`:
```env
VITE_CALENDAR_API_URL=https://tu-proyecto.supabase.co/functions/v1
```

El frontend ya está configurado para usar este endpoint.

---

## ✅ Paso 7: Probar

1. Ve a `/contacto` en tu web
2. Completa el formulario
3. Reserva una cita
4. Verifica:
   - ✅ Evento creado en Google Calendar
   - ✅ Google Meet link generado
   - ✅ Email enviado automáticamente al usuario con:
     - Fecha y hora
     - Link de Google Meet
     - Link al evento en Calendar
     - Botones para aceptar/rechazar

---

## 📧 Email Automático

Google Calendar envía automáticamente un email al usuario con:
- ✅ Título: "Reunión con [Nombre]"
- ✅ Fecha y hora
- ✅ Link de Google Meet (Join with Google Meet)
- ✅ Botones: "Yes", "No", "Maybe"
- ✅ Add to Calendar button

**No necesitas código adicional para emails**, Google lo hace automáticamente cuando usas `sendUpdates=all`.

---

## 🎯 Resultado Final

```
Usuario reserva
    ↓
Edge Function (Supabase)
    ↓
Google Calendar API
    ├─> Crea evento ✅
    ├─> Genera link de Meet 🎥
    ├─> Envía email automático 📧
    └─> Guarda en Supabase
    ↓
Usuario recibe email con:
    - Confirmación
    - Link de Meet
    - Link a Calendar
    - Recordatorios (1 día antes, 30 min antes)
```

---

## 🐛 Troubleshooting

### Error: "Service account does not have access to calendar"
**Solución**: Verifica que compartiste el calendar con el email de la service account.

### Error: "Invalid grant"
**Solución**: Verifica que el PRIVATE_KEY esté correctamente copiado con los `\n`.

### No llega email
**Solución**: Verifica que usaste `sendUpdates=all` en la petición al Calendar API.

### Error: "Calendar ID not found"
**Solución**: Copia el Calendar ID correcto desde la configuración del calendar.

---

## 📚 Recursos

- [Google Calendar API Docs](https://developers.google.com/calendar/api/guides/overview)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Google Meet Conference Data](https://developers.google.com/calendar/api/guides/create-events#conferencing)

---

## 🎉 ¡Listo!

Ahora tu sistema:
- ✅ Crea citas reales en Google Calendar
- ✅ Genera enlaces de Google Meet automáticamente
- ✅ Envía emails de confirmación
- ✅ Sincroniza con Supabase
- ✅ Permite gestión desde panel admin
