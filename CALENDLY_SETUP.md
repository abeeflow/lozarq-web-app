# 📅 Configuración de Calendly

Esta guía te muestra cómo configurar Calendly en tu aplicación web para permitir que los visitantes agenden reuniones contigo.

## ✅ Ventajas de Usar Calendly

- ✅ **Gratis para uso básico** (1 evento activo, bookings ilimitados)
- ✅ **Sin código complejo** - Solo embed
- ✅ **Todo automático**: Emails, recordatorios, Google Meet, sincronización con tu calendario
- ✅ **Muy confiable** - Usado por millones
- ✅ **UI profesional y responsive**

---

## 📝 Paso 1: Crear Cuenta en Calendly

1. Ve a **https://calendly.com/signup**
2. Regístrate con tu email o Google
3. Conecta tu calendario (Google Calendar, Outlook, etc.)
4. El plan **FREE** es suficiente para empezar

---

## 🎯 Paso 2: Crear tu Evento (Event Type)

1. En el dashboard de Calendly, ve a **"Event Types"**
2. Haz clic en **"+ New Event Type"**
3. Elige **"One-on-One"** (reunión 1 a 1)

### Configuración del Evento:

**Información básica:**
- **Event Name**: "Reunión de 30 minutos" (o el nombre que prefieras)
- **Duration**: 30 minutos (o lo que necesites)
- **Location**: Google Meet (o Zoom, Teams, etc.)

**Disponibilidad:**
- Define tus **horarios disponibles** (ej: Lunes-Viernes 9am-6pm)
- Configura **buffer time** si quieres espacio entre reuniones
- Define **minimum scheduling notice** (ej: 24 horas)

**Preguntas personalizadas** (opcional):
- Email (incluido por defecto)
- Teléfono
- ¿Para qué servicio necesitas la reunión?
- Cualquier otra pregunta

4. Haz clic en **"Save & Close"**

---

## 🔗 Paso 3: Obtener tu URL de Calendly

1. En tu evento creado, haz clic en **"Copy Link"**
2. La URL será algo como:
   ```
   https://calendly.com/tu-usuario/30min
   ```
3. **Copia esta URL completa** ✂️

---

## ⚙️ Paso 4: Configurar en tu Aplicación

### 4.1 Crear archivo `.env`

Si no existe, crea un archivo `.env` en la raíz de tu proyecto:

```bash
cp .env.example .env
```

### 4.2 Agregar tu URL de Calendly

Abre el archivo `.env` y reemplaza la URL con la tuya:

```env
# Calendly Configuration
VITE_CALENDLY_URL=https://calendly.com/TU-USUARIO/30min
```

**Reemplaza `TU-USUARIO` y `30min` con tus valores reales.**

Ejemplo:
```env
VITE_CALENDLY_URL=https://calendly.com/juan-perez/reunion
```

### 4.3 Guardar y reiniciar

1. Guarda el archivo `.env`
2. **Reinicia tu servidor de desarrollo:**

```bash
# Detén el servidor (Ctrl+C)
# Inicia de nuevo:
npm run dev
```

---

## 🎨 Paso 5: Personalización (Opcional)

### En Calendly:

Ve a **Settings > Branding** para personalizar:
- **Colores** (requiere plan pagado)
- **Logo** (requiere plan pagado)
- **Preguntas personalizadas** (gratis)
- **Notificaciones por email** (gratis)

### En tu código:

Puedes personalizar el componente en `src/components/CalendlyEmbed.tsx`:

```tsx
<CalendlyEmbed
  styles={{
    minHeight: '750px',  // Ajusta la altura
  }}
  prefill={{
    name: 'Juan Pérez',        // Pre-rellenar nombre (opcional)
    email: 'juan@ejemplo.com', // Pre-rellenar email (opcional)
  }}
/>
```

---

## 🔧 Configuración Avanzada

### Pre-rellenar información del usuario:

Si tienes datos del usuario (ej: después de login), puedes pre-rellenarlos:

```tsx
<CalendlyEmbed
  prefill={{
    name: usuario.nombre,
    email: usuario.email,
  }}
/>
```

### Parámetros UTM (para analytics):

```tsx
<CalendlyEmbed
  utm={{
    source: 'website',
    medium: 'booking',
    campaign: 'contact-page',
  }}
/>
```

### Cambiar altura del widget:

```tsx
<CalendlyEmbed
  styles={{
    minHeight: '900px', // Más alto
  }}
/>
```

---

## 🧪 Paso 6: Probar

1. Abre tu aplicación: `http://localhost:5173/contacto`
2. Deberías ver el calendario de Calendly embebido
3. Intenta hacer una reserva de prueba
4. Verifica que recibes el email de confirmación

---

## 🚀 Despliegue a Producción

### Vercel / Netlify:

1. Agrega la variable de entorno en tu plataforma:
   - **Variable**: `VITE_CALENDLY_URL`
   - **Value**: `https://calendly.com/tu-usuario/30min`

2. Redeploy tu aplicación

### Variables de entorno en Vercel:

```bash
vercel env add VITE_CALENDLY_URL
# Pega tu URL cuando te lo pida
```

---

## 📋 Planes de Calendly

### Plan FREE (Gratis):
- ✅ 1 evento activo
- ✅ Bookings ilimitados
- ✅ Google Meet, Zoom integrations
- ✅ Email notifications
- ❌ "Powered by Calendly" branding
- ❌ Múltiples eventos activos

### Plan Standard ($10/mes):
- ✅ 4 eventos activos
- ✅ Sin branding de Calendly
- ✅ Personalización de colores
- ✅ Recordatorios automáticos

### Plan Teams ($16/mes por usuario):
- ✅ Todo de Standard
- ✅ Eventos de equipo (Round Robin)
- ✅ Workflows automáticos
- ✅ Reportes avanzados

---

## ❓ Troubleshooting

### El widget no aparece:

1. Verifica que la variable `VITE_CALENDLY_URL` esté en `.env`
2. Reinicia el servidor (`npm run dev`)
3. Verifica la consola del navegador para errores
4. Asegúrate de que la URL de Calendly sea correcta

### El widget aparece pero no se puede reservar:

1. Verifica que el evento esté **activo** en Calendly
2. Confirma que tienes **disponibilidad configurada**
3. Asegúrate de que tu calendario esté **conectado**

### "This event type is not available":

- El evento fue eliminado o desactivado en Calendly
- Verifica en Calendly dashboard > Event Types

---

## 📚 Recursos

- **Calendly Docs**: https://help.calendly.com/
- **Calendly Embed Docs**: https://help.calendly.com/hc/en-us/articles/223147027
- **API Docs** (plan pagado): https://developer.calendly.com/

---

## 🎉 ¡Listo!

Tu sistema de reservas con Calendly está configurado. Los visitantes ahora pueden:

1. ✅ Ver tu disponibilidad en tiempo real
2. ✅ Reservar reuniones contigo
3. ✅ Recibir emails de confirmación automáticos
4. ✅ Obtener link de Google Meet automáticamente
5. ✅ Recibir recordatorios antes de la reunión

**Todo sin código adicional, sin bases de datos, sin APIs complejas.** 🚀
