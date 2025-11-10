-- Bookings/Reservations Table for Google Calendar Integration
-- Run this SQL in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Client Information
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50) NOT NULL,
  servicio VARCHAR(255),

  -- Date and Time
  fecha DATE NOT NULL,
  hora TIME NOT NULL,

  -- Google Calendar Integration
  google_event_id VARCHAR(255),
  google_calendar_link TEXT,

  -- Status
  estado VARCHAR(50) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmada', 'cancelada', 'completada')),

  -- Notes
  notas TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_fecha ON bookings(fecha);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_estado ON bookings(estado);
CREATE INDEX IF NOT EXISTS idx_bookings_fecha_hora ON bookings(fecha, hora);

-- Prevent duplicate bookings for same date/time
CREATE UNIQUE INDEX IF NOT EXISTS idx_bookings_unique_datetime ON bookings(fecha, hora)
WHERE estado NOT IN ('cancelada');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations for authenticated users (admin)
CREATE POLICY "Allow all for authenticated users" ON bookings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Allow insert for anonymous users (public booking form)
CREATE POLICY "Allow insert for anonymous" ON bookings
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy: Allow read for anonymous (to check availability)
CREATE POLICY "Allow read for anonymous" ON bookings
FOR SELECT
TO anon
USING (true);

-- Insert sample data for testing (optional)
-- INSERT INTO bookings (nombre, email, telefono, servicio, fecha, hora, estado)
-- VALUES
--   ('Juan Pérez', 'juan@example.com', '+34 600 123 456', 'Diseño Interior', '2025-11-15', '10:00:00', 'confirmada'),
--   ('María García', 'maria@example.com', '+34 600 234 567', 'Consultoría', '2025-11-15', '14:00:00', 'pendiente');

COMMENT ON TABLE bookings IS 'Stores all booking/appointment information with Google Calendar integration';
COMMENT ON COLUMN bookings.estado IS 'Booking status: pendiente, confirmada, cancelada, completada';
COMMENT ON COLUMN bookings.google_event_id IS 'Google Calendar event ID for synchronization';
