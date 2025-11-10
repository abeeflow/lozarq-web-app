# 📅 Setup de Sistema de Reservas - Instrucciones

## ⚠️ IMPORTANTE - EJECUTAR ANTES DE USAR

Para que el sistema de reservas funcione correctamente, **DEBES** ejecutar el SQL en Supabase.

## 🗄️ Paso 1: Crear Tabla en Supabase

1. Ve a tu proyecto en [Supabase](https://supabase.com/dashboard)
2. En el menú lateral, haz clic en **"SQL Editor"**
3. Haz clic en **"+ New Query"**
4. Copia y pega todo el contenido del archivo: **`supabase_bookings_table.sql`**
5. Haz clic en **"Run"** (o presiona `Ctrl + Enter`)

**Resultado esperado:**
```
✅ Success. No rows returned.
```

## 📊 Verificar que la Tabla se Creó

1. En el menú lateral de Supabase, ve a **"Table Editor"**
2. Deberías ver una tabla llamada **`bookings`** con estas columnas:
   - id (uuid)
   - nombre (varchar)
   - email (varchar)
   - telefono (varchar)
   - servicio (varchar)
   - fecha (date)
   - hora (time)
   - google_event_id (varchar)
   - google_calendar_link (text)
   - estado (varchar)
   - notas (text)
   - created_at (timestamptz)
   - updated_at (timestamptz)

## 🔒 Row Level Security (RLS)

El SQL automáticamente configuró políticas de seguridad:

- **Usuarios anónimos** (visitantes de tu web):
  - ✅ Pueden **insertar** nuevas reservas
  - ✅ Pueden **leer** reservas (para verificar disponibilidad)
  - ❌ NO pueden editar o eliminar

- **Usuarios autenticados** (admin):
  - ✅ Pueden hacer TODO (crear, leer, editar, eliminar)

## 🚀 ¿Listo para Probar?

Después de ejecutar el SQL:

```bash
npm run dev
```

Luego ve a:
- **Frontend**: http://localhost:5173/contacto (para hacer una reserva)
- **Admin Panel**: http://localhost:5173/admin/bookings (para ver todas las reservas)

## 📝 Funcionalidades Implementadas

### Frontend (/contacto)
- ✅ Formulario de 3 pasos (datos → fecha → hora)
- ✅ Solo muestra horas disponibles (consulta Supabase en tiempo real)
- ✅ Previene doble reserva del mismo horario
- ✅ Confirmación visual después de reservar

### Admin Panel (/admin/bookings)
- ✅ Ver todas las reservas en una tabla
- ✅ Filtrar por estado (pendiente, confirmada, cancelada, completada)
- ✅ Estadísticas (count por estado)
- ✅ Cambiar estado de una reserva
- ✅ Eliminar reservas
- ✅ Ver enlace a Google Calendar (cuando se integre)

## 🔄 Flujo del Sistema

```
Usuario hace reserva
    ↓
1. Supabase verifica disponibilidad
    ↓
2. Si está disponible, guarda en BD
    ↓
3. Mock API simula creación en Google Calendar
    ↓
4. Usuario ve confirmación
    ↓
5. Admin puede ver la reserva en /admin/bookings
```

## 🌐 Configuración de Variables de Entorno

Ya tienes configurado en tu `.env`:
```env
VITE_SUPABASE_URL=tu-url-de-supabase
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

**No necesitas variables adicionales para el modo desarrollo.**

Para integrar Google Calendar real más adelante, consulta: `CALENDAR_SETUP.md`

## ❓ Troubleshooting

### Error: "relation 'bookings' does not exist"
**Solución**: No ejecutaste el SQL. Ve al Paso 1.

### Error: "new row violates row-level security policy"
**Solución**: Las políticas RLS no se crearon. Re-ejecuta el SQL completo.

### Error: "duplicate key value violates unique constraint"
**Solución**: Ya existe una reserva para esa fecha/hora. El sistema está funcionando correctamente.

### Las horas reservadas aún aparecen disponibles
**Solución**: Refresca la página. El sistema consulta disponibilidad en tiempo real.

## 📚 Archivos Relacionados

- `supabase_bookings_table.sql` - SQL para crear la tabla
- `src/services/supabaseBookingService.ts` - Servicio para interactuar con Supabase
- `src/services/mockCalendarAPI.ts` - Mock API que usa Supabase
- `src/pages/admin/bookings/index.tsx` - Panel admin de reservas
- `src/pages/ContactoPage.tsx` - Formulario público de reservas

---

**¿Todo listo?** 🎉 Una vez ejecutado el SQL, el sistema de reservas estará completamente funcional.
