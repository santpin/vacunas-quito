import React, { useState, useMemo } from 'react';
import { Search, MapPin, Clock, Calendar, Shield, Building2, Filter, ChevronRight, Info, X, ExternalLink, Navigation2, CheckCircle2 } from 'lucide-react';

const rawData = [
  // DISTRITO 17D03
  { code: "001729", name: "Gualea", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Gualea", schedule: "8:00 - 14:00", day: "Lunes" },
  { code: "001730", name: "Nanegal", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Nanegal", schedule: "8:00 - 14:00", day: "3er Martes De Cada Mes" },
  { code: "001731", name: "Pacto", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Pacto", schedule: "8:00 - 14:00", day: "Miercoles" },
  { code: "001732", name: "Sahuangal", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Pacto", schedule: "8:00 - 14:00", day: "Viernes" },
  { code: "001734", name: "Bellavista", type: "PUESTO DE SALUD", district: "17D03", parish: "Gualea", schedule: "8:00 - 14:00", day: "Viernes" },
  { code: "002844", name: "Nanegalito", type: "CENTRO DE SALUD TIPO B", district: "17D03", parish: "Nanegalito", schedule: "8:00 - 14:00", day: "Jueves" },
  { code: "1756", name: "Calderón", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Calderon (Carapungo)", schedule: "7:30 - 14:00", day: "Lunes A Viernes" },
  { code: "1765", name: "Carapungo 1", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Calderon (Carapungo)", schedule: "8:00 - 14:00", day: "Jueves" },
  { code: "1766", name: "Carapungo 2", type: "CENTRO DE SALUD TIPO B", district: "17D03", parish: "Calderon (Carapungo)", schedule: "8:00 - 14:00", day: "Martes Y Jueves" },
  { code: "1763", name: "Moran", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Calderon (Carapungo)", schedule: "8:00 - 14:00", day: "Lunes" },
  { code: "1764", name: "San Juan De Calderon", type: "CENTRO DE SALUD TIPO B", district: "17D03", parish: "Calderon (Carapungo)", schedule: "8:00 - 14:00", day: "Jueves" },
  { code: "1767", name: "Marianitas", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Calderon (Carapungo)", schedule: "8:00 - 14:00", day: "Miercoles" },
  { code: "1759", name: "Guayllabamba", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Guayllabamba", schedule: "8:00 - 14:00", day: "Martes" },
  { code: "1675", name: "Llano Chico", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Llano Chico", schedule: "8:00 - 14:00", day: "Martes" },
  { code: "001658", name: "Cotocollao", type: "CENTRO DE SALUD TIPO B", district: "17D03", parish: "Ponceano", schedule: "8:00 - 14:00", day: "Lunes A Viernes" },
  { code: "001659", name: "Jaime Roldos Aguilera", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "El Condado", schedule: "8:00 - 14:00", day: "Miercoles" },
  { code: "001661", name: "Carcelen Bajo", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Carcelen", schedule: "8:00 - 14:00", day: "Lunes" },
  { code: "001662", name: "Colinas Del Norte", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "El Condado", schedule: "8:00 - 14:00", day: "Miercoles" },
  { code: "001663", name: "Corazon De Jesus", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Carcelen", schedule: "8:00 - 14:00", day: "Martes" },
  { code: "001664", name: "Calacali", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Calacali", schedule: "8:00 - 14:00", day: "Martes" },
  { code: "001665", name: "El Condado", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Ponceano", schedule: "8:00 - 14:00", day: "Lunes" },
  { code: "001667", name: "Pisuli", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "El Condado", schedule: "8:00 - 14:00", day: "Martes" },
  { code: "001668", name: "Pomasqui", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Pomasqui", schedule: "8:00 - 14:00", day: "Martes Y Viernes" },
  { code: "001669", name: "San Antonio De Pichincha", type: "CENTRO DE SALUD TIPO C", district: "17D03", parish: "San Antonio", schedule: "8:00 - 14:00", day: "Lunes A Viernes" },
  { code: "001670", name: "Comite Del Pueblo", type: "CENTRO DE SALUD TIPO C", district: "17D03", parish: "Comite Del Pueblo", schedule: "8:00 - 14:00", day: "Lunes A Viernes" },
  { code: "001671", name: "Centro De Salud 1-E", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Comite Del Pueblo", schedule: "8:00 - 14:00", day: "Viernes Cada 15 Dias" },
  { code: "001674", name: "La Bota", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Comite Del Pueblo", schedule: "8:00 - 14:00", day: "Jueves" },
  { code: "001681", name: "Cotocollao Alto", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "El Condado", schedule: "8:00 - 14:00", day: "Miercoles" },
  { code: "001684", name: "Mena Del Hierro", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "El Condado", schedule: "8:00 - 14:00", day: "Martes" },
  { code: "001685", name: "Nono", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Nono", schedule: "8:00 - 14:00", day: "Último Viernes De Cada Mes" },
  { code: "001757", name: "Atahualpa", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Atahualpa (Habaspamba)", schedule: "8:00 - 14:00", day: "Sabado Cada 15 Dias" },
  { code: "001760", name: "Perucho", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Perucho", schedule: "8:00 - 14:00", day: "Segundo Viernes De Cada Mes" },
  { code: "001761", name: "Puellaro", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Puellaro", schedule: "8:00 - 14:00", day: "Sabado Cada 15 Dias" },
  { code: "001762", name: "San Jose De Minas", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "San Jose De Minas", schedule: "8:00 - 14:00", day: "Jueves" },
  { code: "001758", name: "Chavezpamba", type: "PUESTO DE SALUD", district: "17D03", parish: "Chavezpamba", schedule: "8:00 - 14:00", day: "Último Viernes De Cada Mes" },
  { code: "001612", name: "Fray Bartolome De Las Casas", type: "CENTRO DE SALUD TIPO B", district: "17D03", parish: "Belisario Quevedo", schedule: "8:00 a 14:00", day: "Lunes A Viernes" },
  { code: "001615", name: "San Vicente De Las Casas", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Belisario Quevedo", schedule: "8:00 a 14:00", day: "Jueves" },
  { code: "001616", name: "Santa Clara De San Millan", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Belisario Quevedo", schedule: "8:00 a 14:00", day: "Lunes, Miercoles Y Viernes" },
  { code: "001622", name: "Playa Rica", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Iñaquito", schedule: "8:00 a 14:00", day: "Miercoles Y Viernes" },
  { code: "001672", name: "6 De Julio", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "San Isidro Del Inca", schedule: "8:00 - 14:00", day: "Lunes Y Viernes" },
  { code: "001673", name: "Cocotog", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Zambiza", schedule: "8:00 - 14:00", day: "Martes" },
  { code: "001676", name: "Nayon", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Nayon", schedule: "8:00 - 14:00", day: "Miercoles" },
  { code: "001677", name: "Segundo Diaz", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "San Isidro Del Inca", schedule: "8:00 - 14:00", day: "Martes" },
  { code: "001678", name: "Zambiza", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Zambiza", schedule: "8:00 - 14:00", day: "Jueves" },
  { code: "001679", name: "La Rumiñahui", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Kennedy", schedule: "8:00 - 14:00", day: "Lunes Y Miercoles" },
  { code: "001680", name: "Cochapamba Sur", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Cochapamba", schedule: "8:00 - 14:00", day: "Jueves" },
  { code: "001682", name: "La Pulida", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Cochapamba", schedule: "8:00 - 14:00", day: "Lunes" },
  { code: "001683", name: "Bellavista Santa Anita", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Cochapamba", schedule: "8:00 - 14:00", day: "Lunes" },
  { code: "002122", name: "Atucucho", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Cochapamba", schedule: "8:00 - 14:00", day: "Viernes" },
  { code: "002124", name: "Tanda", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Nayon", schedule: "8:00 - 14:00", day: "Jueves" },

  // DISTRITO Z09
  { code: "001606", name: "Centro Historico", type: "CENTRO DE SALUD TIPO C", district: "Z09", parish: "Centro Historico", schedule: "8:00 a 15:00", day: "Lunes A Sábado" },
  { code: "001609", name: "Toctiuco", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "San Juan", schedule: "8:00 a 14:00", day: "Martes Y Jueves" },
  { code: "001611", name: "Gangotena Posse (Casa Cuna)", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "Centro Historico", schedule: "8:00 a 14:00", day: "Miércoles" },
  { code: "001613", name: "San Juan Quito", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "San Juan", schedule: "8:00 a 14:00", day: "Viernes" },
  { code: "001614", name: "San Juan Independencia", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "San Juan", schedule: "8:00 a 14:00", day: "Jueves" },
  { code: "001618", name: "La Tola", type: "CENTRO DE SALUD TIPO B", district: "Z09", parish: "Centro Historico", schedule: "8:00 a 14:00", day: "Miércoles" },
  { code: "001620", name: "Jardin Del Valle", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "Puengasi", schedule: "8:00 a 14:00", day: "Miércoles" },
  { code: "001621", name: "La Vicentina", type: "CENTRO DE SALUD TIPO B", district: "Z09", parish: "Itchimbia", schedule: "8:00 a 14:00", day: "Martes Y Jueves" },
  { code: "001623", name: "San Jose De Monjas", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "Puengasi", schedule: "8:00 a 14:00", day: "Jueves" },
  { code: "001631", name: "Obrero Independiente", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "Puengasi", schedule: "8:00 a 14:00", day: "Martes" },
  { code: "001634", name: "Puengasi 1", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "Puengasi", schedule: "8:00 a 14:00", day: "Miércoles" },
  { code: "001635", name: "Puengasi 2", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "Puengasi", schedule: "8:00 a 14:00", day: "Jueves" },
  { code: "001647", name: "Centro La Libertad", type: "CENTRO DE SALUD TIPO B", district: "Z09", parish: "La Libertad", schedule: "8:00 a 14:00", day: "Jueves" },
  { code: "001648", name: "El Panecillo", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "Centro Historico", schedule: "8:00 a 14:00", day: "Viernes" },
  { code: "001649", name: "La Libertad", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "La Libertad", schedule: "8:00 a 14:00", day: "Lunes" },
  { code: "001650", name: "Nueva Aurora", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "La Libertad", schedule: "8:00 a 14:00", day: "Martes" },
  { code: "002123", name: "La Ermita", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "La Libertad", schedule: "8:00 a 14:00", day: "Martes" },

  // DISTRITO 17D06
  { code: "001624", name: "Chimbacalle", type: "CENTRO DE SALUD TIPO C", district: "17D06", parish: "Chimbacalle", schedule: "8:00 - 16:00", day: "Lunes A Viernes" },
  { code: "001625", name: "Ferroviaria Alta", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Ferroviaria", schedule: "8:00 - 16:00", day: "Miercoles" },
  { code: "001626", name: "Chiriyacu Alto", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Ferroviaria", schedule: "8:00 - 16:00", day: "Miercoles" },
  { code: "001627", name: "Chiriyacu Bajo", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Chimbacalle", schedule: "8:00 - 16:00", day: "Martes" },
  { code: "001628", name: "Ferroviaria Baja", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Ferroviaria", schedule: "8:00 - 16:00", day: "Jueves" },
  { code: "001629", name: "La Forestal", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Ferroviaria", schedule: "8:00 - 16:00", day: "Jueves" },
  { code: "001630", name: "Luluncoto", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Chimbacalle", schedule: "8:00 - 16:00", day: "Jueves" },
  { code: "001633", name: "Pio XII", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Chimbacalle", schedule: "8:00 - 16:00", day: "Jueves" },
  { code: "001637", name: "Union De Ciudadelas", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Ferroviaria", schedule: "8:00 - 16:00", day: "Martes" },
  { code: "001638", name: "La Magdalena", type: "CENTRO DE SALUD TIPO B", district: "17D06", parish: "La Magdalena", schedule: "8:00 - 16:00", day: "Lunes, Miercoles Y Viernes" },
  { code: "001639", name: "Atahualpa Sur", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Magdalena", schedule: "8:00 - 16:00", day: "Jueves" },
  { code: "001640", name: "Gatazo", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "San Bartolo", schedule: "8:00 - 16:00", day: "Miercoles" },
  { code: "001642", name: "Lloa", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Lloa", schedule: "8:00 - 16:00", day: "Ultimo Jueves Del Mes" },
  { code: "001643", name: "Promocion Familiar", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "San Bartolo", schedule: "8:00 - 16:00", day: "Miercoles" },
  { code: "001644", name: "Quito Sur", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "San Bartolo", schedule: "8:00 - 16:00", day: "Miercoles" },
  { code: "001645", name: "Tarqui", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Mena", schedule: "8:00 - 16:00", day: "Miercoles" },
  { code: "001646", name: "La Raya", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Mena", schedule: "8:00 - 16:00", day: "Miercoles" },
  { code: "001651", name: "El Carmen", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Solanda", schedule: "8:00 - 16:00", day: "Miercoles" },
  { code: "001652", name: "Aida Leon", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Argelia", schedule: "8:00 - 16:00", day: "Jueves" },
  { code: "001653", name: "La Argelia", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Argelia", schedule: "8:00 - 16:00", day: "Miercoles" },
  { code: "001654", name: "Hierba Buena 1", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Argelia", schedule: "8:00 - 16:00", day: "Jueves" },
  { code: "001655", name: "Hierba Buena 2", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Argelia", schedule: "8:00 - 16:00", day: "Jueves" },
  { code: "001656", name: "Lucha De Los Pobres", type: "CENTRO DE SALUD TIPO B", district: "17D06", parish: "La Argelia", schedule: "8:00 - 16:00", day: "Jueves" },
  { code: "001657", name: "Oriente Quiteno", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Argelia", schedule: "8:00 - 16:00", day: "Jueves" },
  { code: "001735", name: "Guamani", type: "CENTRO DE SALUD TIPO C", district: "17D06", parish: "Turubamba", schedule: "8:00 - 14:00", day: "Lunes A Sabado" },
  { code: "001736", name: "San Martin De Porres", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Quitumbe", schedule: "9:00 - 15:00", day: "Lunes" },
  { code: "001737", name: "Pueblo Unido", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Quitumbe", schedule: "9:00 - 15:00", day: "Jueves" },
  { code: "001738", name: "Asistencia Social", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Quitumbe", schedule: "9:00 - 15:00", day: "Miercoles" },
  { code: "001739", name: "El Blanqueado", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Quitumbe", schedule: "9:00 - 15:00", day: "Martes" },
  { code: "001740", name: "El Rocio", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Guamani", schedule: "9:00 - 15:00", day: "Martes" },
  { code: "001741", name: "La Victoria Central", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Guamani", schedule: "9:00 - 15:00", day: "Lunes" },
  { code: "001742", name: "Matilde Alvarez", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Guamani", schedule: "9:00 - 15:00", day: "Jueves" },
  { code: "001743", name: "Caupichu", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Turubamba", schedule: "9:00 - 15:00", day: "Miercoles" },
  { code: "001744", name: "Ciudadela Ibarra", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Ecuatoriana", schedule: "9:00 - 15:00", day: "Lunes, Miercoles Y Viernes" },
  { code: "001745", name: "Buenaventura", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Chillogallo", schedule: "9:00 - 15:00", day: "Miercoles" },
  { code: "001746", name: "Chillogallo", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Chillogallo", schedule: "9:00 - 15:00", day: "Miercoles" },
  { code: "001747", name: "El Transito", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Chillogallo", schedule: "9:00 - 15:00", day: "Martes" },
  { code: "001748", name: "La Ecuatoriana", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Ecuatoriana", schedule: "9:00 - 15:00", day: "Jueves" },
  { code: "001749", name: "La Inmaculada", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Guamani", schedule: "9:00 - 15:00", day: "Lunes" },
  { code: "001750", name: "La Isla Solanda", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Solanda", schedule: "9:00 - 15:00", day: "Miercoles" },
  { code: "001751", name: "Martha Bucaram", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Ecuatoriana", schedule: "9:00 - 15:00", day: "Miercoles" },
  { code: "001752", name: "San Luis", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Chillogallo", schedule: "9:00 - 15:00", day: "Miercoles" },
  { code: "001753", name: "Santa Barbara", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Mena", schedule: "9:00 - 15:00", day: "N/A" },
  { code: "001754", name: "Santa Cruz", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Ecuatoriana", schedule: "9:00 - 15:00", day: "Martes" },
  { code: "001755", name: "Turubamba", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Solanda", schedule: "8:00 - 16:00", day: "Miercoles" },

  // VALLES Y RURALES
  { code: "001769", name: "Conocoto", type: "CENTRO DE SALUD TIPO C", district: "17D06", parish: "Conocoto", schedule: "8:00 - 14:00", day: "Lunes A Viernes" },
  { code: "001770", name: "Alangasi", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Alangasi", schedule: "8:00 - 14:00", day: "Lunes" },
  { code: "001771", name: "Centro De Salud Amaguaña", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Amaguaña", schedule: "8:00 - 14:00", day: "Lunes" },
  { code: "001772", name: "El Tingo", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Alangasi", schedule: "8:00 - 14:00", day: "Martes" },
  { code: "001773", name: "Guangopolo", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Guangopolo", schedule: "8:00 - 14:00", day: "Viernes" },
  { code: "001774", name: "La Merced", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "La Merced", schedule: "8:00 - 14:00", day: "Miercoles" },
  { code: "001775", name: "Pintag", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Pintag", schedule: "8:00 - 14:00", day: "Jueves" },
  { code: "001776", name: "Tolontag", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Pintag", schedule: "8:00 - 14:00", day: "Martes" },
  { code: "001777", name: "Cuendina", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Amaguaña", schedule: "8:00 - 14:00", day: "Miercoles" },
  { code: "002840", name: "Centro De Salud Tipo A Yaruqui", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Yaruqui", schedule: "08:30-16:30", day: "Tercer Martes De Cada Mes" },
  { code: "002992", name: "Mangahuantag", type: "PUESTO DE SALUD", district: "17D06", parish: "Puembo", schedule: "8:30 - 16:30", day: "Jueves De Cada Semana" },
  { code: "001704", name: "Cumbaya", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Cumbaya", schedule: "9:00 - 15:00", day: "Martes" },
  { code: "001705", name: "Lumbisi", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Cumbaya", schedule: "8:00 - 14:00", day: "Miercoles" },
  { code: "001706", name: "Tumbaco", type: "CENTRO DE SALUD TIPO B", district: "17D06", parish: "Tumbaco", schedule: "8:00 - 16:00", day: "Lunes A Viernes" },
  { code: "001708", name: "El Quinche", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "El Quinche", schedule: "9:00 - 15:00", day: "Jueves" },
  { code: "001709", name: "Puembo", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Puembo", schedule: "9:00 - 15:00", day: "Miercoles" },
  { code: "001710", name: "Pifo", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Pifo", schedule: "9:00 - 15:00", day: "Viernes" },
  { code: "001711", name: "Tababela", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Tababela", schedule: "9:00 - 15:00", day: "Miercoles" },
  { code: "001712", name: "Checa", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Checa (Chilpa)", schedule: "8:00 - 14:00", day: "Jueves" },
  { code: "002840-2", name: "Yaruqui (Horario Lunes)", type: "CENTRO DE SALUD TIPO A", district: "17D06", parish: "Yaruqui", schedule: "9:00 - 15:00", day: "Lunes" },
  { code: "002992-2", name: "Mangahuantag (Horario Martes)", type: "PUESTO DE SALUD", district: "17D06", parish: "Puembo", schedule: "8:00 - 14:00", day: "Martes" }
];

const Modal = ({ center, onClose }) => {
  if (!center) return null;
  const destination = encodeURIComponent(`${center.name} ${center.parish} Quito Ecuador`);
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="relative h-32 bg-blue-600 flex items-center justify-center">
          <Building2 size={48} className="text-white opacity-20 absolute" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"><X size={20} /></button>
          <div className="text-center text-white p-6 relative">
            <h2 className="text-2xl font-bold leading-tight">{center.name}</h2>
            <p className="text-blue-100 text-sm opacity-90">{center.type}</p>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <Calendar className="text-blue-600 mb-2" size={20} />
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 leading-tight">Día Fiebre Amarilla</p>
              <p className="text-sm font-bold text-blue-700 leading-tight">{center.day}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <Clock className="text-slate-600 mb-2" size={20} />
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 leading-tight">Horario General</p>
              <p className="text-sm font-bold text-slate-700 leading-tight">{center.schedule}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <MapPin className="text-red-500 shrink-0 mt-1" size={24} />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Ubicación</p>
                <p className="text-sm font-medium text-slate-700">Parroquia {center.parish}, Distrito {center.district}. Quito, Pichincha.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-green-100">
              <Navigation2 size={20} fill="currentColor" /> Trazar Ruta (GPS)
            </a>
            <button onClick={onClose} className="w-full py-3 text-slate-400 hover:text-slate-600 font-medium text-sm transition-colors">Cerrar detalles</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParish, setSelectedParish] = useState('Todas');
  const [weekendOnly, setWeekendOnly] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);

  const parishes = useMemo(() => {
    const unique = [...new Set(rawData.map(item => item.parish))];
    return ['Todas', ...unique.sort()];
  }, []);

  const filteredData = useMemo(() => {
    return rawData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.code.includes(searchTerm);
      const matchesParish = selectedParish === 'Todas' || item.parish === selectedParish;
      const isWeekend = item.day.toLowerCase().includes('sabado') || item.day.toLowerCase().includes('sábado') || item.day.toLowerCase().includes('domingo');
      return matchesSearch && matchesParish && (!weekendOnly || isWeekend);
    });
  }, [searchTerm, selectedParish, weekendOnly]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <header className="bg-blue-600 text-white shadow-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-2xl text-blue-600 shadow-inner shrink-0"><Shield size={36} fill="currentColor" fillOpacity={0.1} /></div>
              <div>
                <h1 className="text-xl md:text-2xl font-black leading-tight tracking-tight max-w-2xl">Centros de Salud donde se pueden encontrar las vacunas del Esquema Regular</h1>
                <p className="text-blue-100 text-xs font-medium flex items-center gap-2 mt-2 opacity-80"><MapPin size={14} /> Red de Salud - Quito, Ecuador</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-blue-700/50 backdrop-blur-sm p-1.5 rounded-2xl px-5 text-sm font-bold border border-blue-400/30">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-glow"></span> {filteredData.length} Puntos activos
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-10 border border-slate-100 relative z-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase mb-3 ml-1 tracking-widest">Nombre o Código</label>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input type="text" placeholder="Ej: Calderón..." className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-sm font-medium" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase mb-3 ml-1 tracking-widest">Zona / Parroquia</label>
              <div className="relative group">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <select className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none appearance-none cursor-pointer text-sm font-medium" value={selectedParish} onChange={(e) => setSelectedParish(e.target.value)}>
                  {parishes.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <button onClick={() => setWeekendOnly(!weekendOnly)} className={`flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl border transition-all ${weekendOnly ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'}`}>
              <div className="flex items-center gap-3"><Calendar size={20} /><span className="text-sm font-bold">Atención Fin de Semana</span></div>
              {weekendOnly && <CheckCircle2 size={20} className="text-blue-200" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item, index) => (
            <div key={`${item.code}-${index}`} className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-50">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-tighter">MSP: {item.code}</span>
                  <div className={`flex items-center gap-2`}>
                    {(item.day.toLowerCase().includes('sabado') || item.day.toLowerCase().includes('sábado')) && (
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-amber-200">SÁBADO</span>
                    )}
                    <div className={`w-3 h-3 rounded-full ${item.type.toLowerCase().includes('tipo c') ? 'bg-purple-400' : item.type.toLowerCase().includes('tipo b') ? 'bg-blue-400' : 'bg-green-400'}`}></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight mb-1">{item.name}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{item.type.replace('CENTRO DE SALUD ', '')}</p>
              </div>
              <div className="p-6 space-y-5 flex-grow">
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="bg-slate-50 p-2.5 rounded-xl group-hover:bg-blue-50 transition-colors"><MapPin size={18} className="text-slate-400 group-hover:text-blue-500" /></div>
                  <div><p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Parroquia</p><p className="text-sm font-bold text-slate-700">{item.parish}</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600"><Calendar size={18} /></div>
                  <div><p className="text-[10px] uppercase font-bold text-blue-400 leading-none mb-1">Día Fiebre Amarilla</p><p className="text-sm font-black text-blue-700">{item.day}</p></div>
                </div>
              </div>
              <button onClick={() => setSelectedCenter(item)} className="w-full py-5 bg-slate-50 group-hover:bg-blue-600 text-slate-400 group-hover:text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">Ver Detalles y Mapa <ChevronRight size={16} /></button>
            </div>
          ))}
        </div>
      </main>

      <Modal center={selectedCenter} onClose={() => setSelectedCenter(null)} />

      <footer className="mt-20 py-12 px-4 border-t border-slate-200 text-center md:text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h4 className="font-bold text-slate-800 text-lg mb-2">Información de Salud Pública</h4>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">Esta herramienta facilita el acceso a la información oficial de vacunación en Quito. Datos actualizados con la base de datos completa del MSP (133 establecimientos).</p>
          </div>
          <div className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span> V3.5 BASE COMPLETA
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
