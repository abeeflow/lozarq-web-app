# 🎥 Google Calendar API + Meet - Cuenta Personal

Esta guía te muestra cómo integrar Google Calendar API con tu **cuenta personal de Google** (no Workspace).

## 📋 Requisitos

- ✅ Cuenta personal de Google (Gmail)
- ✅ Proyecto de Supabase activo
- ✅ Cuenta de Google Cloud Platform (gratis)

---

## 🚀 Paso 1: Configurar Google Cloud Platform

### 1.1 Crear Proyecto

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
   - Click en el dropdown de proyectos (arriba)
   - "New Project"
   - **Name**: `lozarq-booking`
   - Click **"CREATE"**

### 1.2 Habilitar APIs

1. En el menú lateral, ve a **"APIs & Services" > "Library"**
2. Busca y habilita:
   - ✅ **Google Calendar API** (click "ENABLE")

### 1.3 Crear Service Account

1. Ve a **"IAM & Admin" > "Service Accounts"**
2. Click **"+ CREATE SERVICE ACCOUNT"**
3. Completa:
   - **Name**: `booking-service`
   - **ID**: Se genera automáticamente
   - **Description**: `Service for booking system`
4. Click **"CREATE AND CONTINUE"**
5. **Role**: Selecciona **"Editor"** (opcional pero recomendado)
6. Click **"CONTINUE"**
7. Click **"DONE"**

### 1.4 Descargar Credenciales JSON

1. En la lista de Service Accounts, click en el que acabas de crear
2. Ve a la pestaña **"KEYS"**
3. Click **"ADD KEY" > "Create new key"**
4. Selecciona **"JSON"**
5. Click **"CREATE"**
6. Se descargará un archivo (ej: `lozarq-booking-abc123.json`)

**⚠️ GUARDA ESTE ARCHIVO DE FORMA SEGURA**

El archivo contiene:
```json
{
  "type": "service_account",
  "project_id": "lozarq-booking",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "booking-service@lozarq-booking.iam.gserviceaccount.com",
  ...
}
```

---

## 📅 Paso 2: Compartir Calendar con Service Account

### 2.1 Abrir Google Calendar

1. Ve a [calendar.google.com](https://calendar.google.com/)
2. Inicia sesión con tu **cuenta personal**

### 2.2 Obtener Calendar ID

Tu Calendar ID es simplemente tu email de Gmail:
```
tu-email@gmail.com
```

### 2.3 Compartir Calendar

1. En la barra lateral izquierda, busca **"My calendars"**
2. Hover sobre tu calendar principal (tu email)
3. Click en los **3 puntos** (⋮)
4. Select **"Settings and sharing"**
5. Baja hasta **"Share with specific people or groups"**
6. Click **"+ Add people and groups"**
7. Pega el email del Service Account (del archivo JSON):
   ```
   booking-service@lozarq-booking.iam.gserviceaccount.com
   ```
8. Permisos: Selecciona **"Make changes to events"**
9. Click **"Send"**
10. **NO marques** "Notify" (no es necesario)

**✅ Listo!** El service account ahora puede crear eventos en tu calendar.

---

## 🔧 Paso 3: Crear Supabase Edge Function

### 3.1 Instalar Supabase CLI

```bash
npm install -g supabase
```

### 3.2 Inicializar (si no lo has hecho)

```bash
cd lozarq-web-app
supabase init
```

### 3.3 Crear Edge Function

```bash
supabase functions new create-booking
```

### 3.4 Código de la Edge Function

Crea: `supabase/functions/create-booking/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { nombre, email, telefono, servicio, fecha, hora } = await req.json()

    // Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Google credentials
    const calendarId = Deno.env.get('GOOGLE_CALENDAR_ID')! // Tu email personal
    const serviceAccountEmail = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_EMAIL')!
    const privateKey = Deno.env.get('GOOGLE_PRIVATE_KEY')!.replace(/\\n/g, '\n')

    // Create JWT
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

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      throw new Error('Failed to get access token: ' + JSON.stringify(tokenData))
    }

    const accessToken = tokenData.access_token

    // Calculate times
    const startDateTime = `${fecha}T${hora}:00`
    const endTime = new Date(startDateTime)
    endTime.setHours(endTime.getHours() + 1)
    const endDateTime = endTime.toISOString().slice(0, 16) + ':00'

    // Create event
    const event = {
      summary: `Reunión con ${nombre}`,
      description: `
Servicio: ${servicio || 'No especificado'}
Email: ${email}
Teléfono: ${telefono}
      `.trim(),
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
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day
          { method: 'popup', minutes: 30 },      // 30 min
        ],
      },
    }

    // Call Calendar API
    const calendarResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    )

    if (!calendarResponse.ok) {
      const error = await calendarResponse.text()
      throw new Error(`Calendar API error: ${error}`)
    }

    const calendarEvent = await calendarResponse.json()

    // Save to Supabase
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

    return new Response(
      JSON.stringify({
        success: true,
        eventId: booking.id,
        meetLink: calendarEvent.hangoutLink || calendarEvent.conferenceData?.entryPoints?.[0]?.uri,
        calendarLink: calendarEvent.htmlLink,
        message: 'Reserva creada. Revisa tu email para los detalles.',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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

// JWT Helper
async function createJWT(email: string, privateKey: string) {
  const header = { alg: 'RS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }

  const encodedHeader = btoa(JSON.stringify(header))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const encodedPayload = btoa(JSON.stringify(payload))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

  const signatureInput = `${encodedHeader}.${encodedPayload}`

  // Import key
  const pemHeader = '-----BEGIN PRIVATE KEY-----'
  const pemFooter = '-----END PRIVATE KEY-----'
  const pemContents = privateKey
    .replace(pemHeader, '')
    .replace(pemFooter, '')
    .replace(/\s/g, '')

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
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

  return `${signatureInput}.${encodedSignature}`
}
```

---

## 🔐 Paso 4: Configurar Variables en Supabase

1. Ve a [Supabase Dashboard](https://app.supabase.com/)
2. Selecciona tu proyecto
3. Ve a **Settings > Edge Functions**
4. En **"Secrets"**, agrega:

```bash
# Tu email personal de Gmail
GOOGLE_CALENDAR_ID=tu-email@gmail.com

# Email del Service Account (del archivo JSON)
GOOGLE_SERVICE_ACCOUNT_EMAIL=booking-service@lozarq-booking.iam.gserviceaccount.com

# Private Key del archivo JSON (con los \n)
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQE...\n-----END PRIVATE KEY-----\n"
```

**⚠️ IMPORTANTE**:
- El `GOOGLE_PRIVATE_KEY` debe incluir los `\n` tal como aparece en el JSON
- Usa comillas dobles alrededor del key

---

## 🚀 Paso 5: Deploy Edge Function

```bash
# Login
supabase login

# Link a tu proyecto
supabase link --project-ref TU_PROJECT_REF

# Deploy
supabase functions deploy create-booking
```

**URL final**: `https://TU_PROJECT.supabase.co/functions/v1/create-booking`

---

## 🔗 Paso 6: Configurar Frontend

En `.env`:
```env
VITE_CALENDAR_API_URL=https://TU_PROJECT.supabase.co/functions/v1
```

---

## ✅ Paso 7: Probar

1. Ve a `/contacto` en tu web
2. Completa el formulario
3. Reserva una cita

**Verificar**:
- ✅ Evento aparece en tu Google Calendar personal
- ✅ Tienes un link de Google Meet en el evento
- ✅ El usuario recibió email con:
  - Invitación al evento
  - Link de Google Meet
  - Botones para aceptar/rechazar
  - Add to Calendar

---

## 📧 Email Automático

Google Calendar envía automáticamente un email al usuario con:
- ✅ Título: "Reunión con [Nombre]"
- ✅ Fecha y hora
- ✅ Link de Google Meet
- ✅ Botones: Yes, No, Maybe
- ✅ Add to Calendar
- ✅ Recordatorios (1 día, 30 min antes)

**Sin código adicional**, Google lo hace con `sendUpdates=all`.

---

## 🐛 Troubleshooting

### Error: "Failed to get access token"
**Solución**:
- Verifica que el `GOOGLE_PRIVATE_KEY` tenga los `\n` correctos
- Copia el key completo del archivo JSON incluyendo header y footer

### Error: "Insufficient Permission"
**Solución**:
- Ve a Google Calendar
- Verifica que compartiste el calendar con el service account
- Permisos deben ser "Make changes to events"

### Error: "Calendar not found"
**Solución**:
- Usa tu email personal como `GOOGLE_CALENDAR_ID`
- Ej: `juan.perez@gmail.com`

### No llega email al usuario
**Solución**:
- Verifica que usaste `sendUpdates=all` en la petición
- Revisa el spam del usuario

### No se genera link de Meet
**Solución**:
- Verifica que usaste `conferenceDataVersion=1` en la URL
- Asegúrate de que `conferenceData` esté en el evento

---

## 🎯 Resultado Final

```
Usuario reserva → Edge Function → Google Calendar API
    ↓                               ↓
Supabase DB                    Tu Calendar Personal
    ↓                               ↓
Admin Panel                    Google Meet Link
                                    ↓
                              Email al Usuario
                              (automático)
```

---

## 💡 Ventajas de Cuenta Personal

- ✅ Gratis (no necesitas Google Workspace)
- ✅ Mismo flujo que Workspace
- ✅ Google Meet funciona igual
- ✅ Emails automáticos incluidos
- ✅ Recordatorios funcionan

---

## 📚 Recursos

- [Google Calendar API](https://developers.google.com/calendar/api/guides/overview)
- [Service Accounts](https://cloud.google.com/iam/docs/service-accounts)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)

---

¡Todo listo para usar con tu cuenta personal de Google! 🎉
