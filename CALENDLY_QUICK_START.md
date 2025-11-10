# 🚀 Quick Start - Calendly

## Configuración Rápida (5 minutos)

### 1️⃣ Crear cuenta en Calendly (gratis)
```
https://calendly.com/signup
```

### 2️⃣ Crear tu primer evento
1. Dashboard → "Event Types" → "+ New Event Type"
2. Selecciona "One-on-One"
3. Configura:
   - Nombre: "Reunión de 30 minutos"
   - Duración: 30 minutos
   - Ubicación: Google Meet
4. Save & Close
5. **Copia el link** (ej: `https://calendly.com/tu-usuario/30min`)

### 3️⃣ Configurar en tu app
1. Crea archivo `.env` (si no existe):
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` y agrega tu URL:
   ```env
   VITE_CALENDLY_URL=https://calendly.com/TU-USUARIO/30min
   ```

3. Reinicia el servidor:
   ```bash
   npm run dev
   ```

### 4️⃣ ¡Listo! 🎉
Abre: `http://localhost:5173/contacto`

---

## 📖 Documentación Completa
Ver `CALENDLY_SETUP.md` para más detalles.

---

## ⚡ Lo Que Obtienes (TODO GRATIS)

- ✅ Calendario embebido profesional
- ✅ Bookings ilimitados
- ✅ Emails de confirmación automáticos
- ✅ Google Meet links automáticos
- ✅ Recordatorios automáticos
- ✅ Sincronización con tu Google Calendar
- ✅ Manejo de zonas horarias
- ✅ Responsive (móvil + desktop)

**Sin código, sin bases de datos, sin APIs complejas.**
