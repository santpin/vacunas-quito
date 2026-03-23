import React, { useState, useMemo } from 'react';
import { Search, MapPin, Clock, Calendar, Shield, Hospital, Filter, ChevronRight, Info, X, ExternalLink, Navigation, CheckCircle2 } from 'lucide-react';

const rawData = [
  // 17D03 - Noroccidente y Norte
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
  { code: "1760", name: "Perucho", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Perucho", schedule: "8:00 - 14:00", day: "Segundo Viernes De Cada Mes" },
  { code: "1761", name: "Puellaro", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "Puellaro", schedule: "8:00 - 14:00", day: "Sabado Cada 15 Dias" },
  { code: "1762", name: "San Jose De Minas", type: "CENTRO DE SALUD TIPO A", district: "17D03", parish: "San Jose De Minas", schedule: "8:00 - 14:00", day: "Jueves" },
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
  
  // Z09 - Centro
  { code: "001606", name: "Centro Historico", type: "CENTRO DE SALUD TIPO C", district: "Z09", parish: "Centro Historico", schedule: "8:00 - 15:00", day: "Lunes A Sábado" },
  { code: "001609", name: "Toctiuco", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "San Juan", schedule: "8:00 - 14:00", day: "Martes Y Jueves" },
  { code: "001611", name: "Gangotena Posse (Casa Cuna)", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "Centro Historico", schedule: "8:00 - 14:00", day: "Miércoles" },
  { code: "001613", name: "San Juan Quito", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "San Juan", schedule: "8:00 - 14:00", day: "Viernes" },
  { code: "001614", name: "San Juan Independencia", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "San Juan", schedule: "8:00 - 14:00", day: "Jueves" },
  { code: "001618", name: "La Tola", type: "CENTRO DE SALUD TIPO B", district: "Z09", parish: "Centro Historico", schedule: "8:00 - 14:00", day: "Miércoles" },
  { code: "001620", name: "Jardin Del Valle", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "Puengasi", schedule: "8:00 - 14:00", day: "Miércoles" },
  { code: "001621", name: "La Vicentina", type: "CENTRO DE SALUD TIPO B", district: "Z09", parish: "Itchimbia", schedule: "8:00 - 14:00", day: "Martes Y Jueves" },
  { code: "001623", name: "San Jose De Monjas", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "Puengasi", schedule: "8:00 - 14:00", day: "Jueves" },
  { code: "001631", name: "Obrero Independiente", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "Puengasi", schedule: "8:00 - 14:00", day: "Martes" },
  { code: "001634", name: "Puengasi 1", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "Puengasi", schedule: "8:00 - 14:00", day: "Miércoles" },
  { code: "001635", name: "Puengasi 2", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "Puengasi", schedule: "8:00 - 14:00", day: "Jueves" },
  { code: "001647", name: "Centro La Libertad", type: "CENTRO DE SALUD TIPO B", district: "Z09", parish: "La Libertad", schedule: "8:00 - 14:00", day: "Jueves" },
  { code: "001648", name: "El Panecillo", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "Centro Historico", schedule: "8:00 - 14:00", day: "Viernes" },
  { code: "001649", name: "La Libertad", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "La Libertad", schedule: "8:00 - 14:00", day: "Lunes" },
  { code: "001650", name: "Nueva Aurora", type: "CENTRO DE SALUD TIPO A", district: "Z09", parish: "La Libertad", schedule: "8:00 - 14:00", day: "Martes" },
  
  // 17D06 - Sur
  { code: "001624", name: "Chimbacalle", type: "CENTRO DE SALUD TIPO C", district: "17D06", parish: "Chimbacalle", schedule: "8:00 - 16:00", day: "Lunes A Viernes" },
  { code: "001638", name: "La Magdalena", type: "CENTRO DE SALUD TIPO B", district: "17D06", parish: "La Magdalena", schedule: "8:00 - 16:00", day: "Lunes, Miercoles Y Viernes" },
  { code: "001735", name: "Guamani", type: "CENTRO DE SALUD TIPO C", district: "17D06", parish: "Turubamba", schedule: "8:00 - 14:00", day: "Lunes A Sabado" },
  { code: "001769", name: "Conocoto", type: "CENTRO DE SALUD TIPO C", district: "17D06", parish: "Conocoto", schedule: "8:00 - 14:00", day: "Lunes A Viernes" },
  { code: "001706", name: "Tumbaco", type: "CENTRO DE SALUD TIPO B", district: "17D06", parish: "Tumbaco", schedule: "8:00 - 16:00", day: "Lunes A Viernes" }
];

const Modal = ({ center, onClose }) => {
  if (!center) return null;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=Centro+de+Salud+${encodeURIComponent(center.name)}+${encodeURIComponent(center.parish)}+Quito+Ecuador`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="relative h-32 bg-blue-600 flex items-center justify-center">
          <Hospital size={48} className="text-white opacity-20 absolute" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
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
            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
              <MapPin className="text-red-500 shrink-0 mt-1" size={24} />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Ubicación</p>
                <p className="text-sm font-medium text-slate-700">
                  Parroquia {center.parish}, Distrito {center.district}. Quito, Pichincha.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <a 
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-200"
            >
              <Navigation size={20} />
              Ver en Google Maps
              <ExternalLink size={16} />
            </a>
            <button 
              onClick={onClose}
              className="w-full py-3 text-slate-400 hover:text-slate-600 font-medium text-sm transition-colors"
            >
              Cerrar detalles
            </button>
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
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.code.includes(searchTerm);
      const matchesParish = selectedParish === 'Todas' || item.parish === selectedParish;
      
      const isWeekend = item.day.toLowerCase().includes('sabado') || 
                        item.day.toLowerCase().includes('sábado') || 
                        item.day.toLowerCase().includes('domingo');
      
      const matchesWeekend = !weekendOnly || isWeekend;

      return matchesSearch && matchesParish && matchesWeekend;
    });
  }, [searchTerm, selectedParish, weekendOnly]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <header className="bg-blue-600 text-white shadow-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-2xl text-blue-600 shadow-inner shrink-0">
                <Shield size={36} fill="currentColor" fillOpacity={0.1} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black leading-tight tracking-tight max-w-2xl">
                   Centros de Salud donde se pueden encontrar las vacunas del Esquema Regular
                </h1>
                <p className="text-blue-100 text-xs font-medium flex items-center gap-2 mt-2 opacity-80">
                  <MapPin size={14} /> Red de Salud - Distrito Metropolitano de Quito
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-blue-700/50 backdrop-blur-sm p-1.5 rounded-2xl px-5 text-sm font-bold border border-blue-400/30 shrink-0">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-glow"></span>
              {filteredData.length} Puntos activos
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 -mt-6">
        {/* Controles de Búsqueda */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 mb-10 border border-slate-100 relative z-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase mb-3 ml-1 tracking-widest">Nombre o Código</label>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  type="text"
                  placeholder="Ej: Calderón, 17D03..."
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-400 outline-none transition-all text-sm font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase mb-3 ml-1 tracking-widest">Zona / Parroquia</label>
              <div className="relative group">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                <select 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-400 outline-none transition-all appearance-none cursor-pointer text-sm font-medium"
                  value={selectedParish}
                  onChange={(e) => setSelectedParish(e.target.value)}
                >
                  {parishes.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => setWeekendOnly(!weekendOnly)}
                className={`flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl border transition-all ${
                  weekendOnly 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar size={20} />
                  <span className="text-sm font-bold">Atención Fin de Semana</span>
                </div>
                {weekendOnly && <CheckCircle2 size={20} className="text-blue-200" />}
              </button>
            </div>
          </div>
        </div>

        {/* Grilla de Centros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div 
                key={`${item.code}-${item.name}`} 
                className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="p-6 border-b border-slate-50">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-tighter">
                      MSP: {item.code}
                    </span>
                    <div className={`flex items-center gap-2`}>
                      {(item.day.toLowerCase().includes('sabado') || item.day.toLowerCase().includes('sábado')) && (
                        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-amber-200">
                          SÁBADO
                        </span>
                      )}
                      <div className={`w-3 h-3 rounded-full ${
                        item.type.includes('TIPO C') ? 'bg-purple-400' : 
                        item.type.includes('TIPO B') ? 'bg-blue-400' : 'bg-green-400'
                      }`}></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {item.type.replace('CENTRO DE SALUD ', '')}
                  </p>
                </div>

                <div className="p-6 space-y-5 flex-grow">
                  <div className="flex items-center gap-4 text-slate-600">
                    <div className="bg-slate-50 p-2.5 rounded-xl group-hover:bg-blue-50 transition-colors">
                      <MapPin size={18} className="text-slate-400 group-hover:text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Parroquia</p>
                      <p className="text-sm font-bold text-slate-700">{item.parish}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-blue-400 leading-none mb-1">Día Fiebre Amarilla</p>
                      <p className="text-sm font-black text-blue-700">{item.day}</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedCenter(item)}
                  className="w-full py-5 bg-slate-50 group-hover:bg-blue-600 text-slate-400 group-hover:text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                >
                  Ver Detalles y Mapa <ChevronRight size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
              <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Hospital size={48} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Sin coincidencias</h3>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedParish('Todas'); setWeekendOnly(false);}}
                className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:scale-105 active:scale-95 transition-all"
              >
                Restablecer Filtros
              </button>
            </div>
          )}
        </div>
      </main>

      <Modal center={selectedCenter} onClose={() => setSelectedCenter(null)} />

      <footer className="mt-20 py-12 px-4 border-t border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-slate-800 text-lg mb-2">Información de Salud Pública</h4>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Esta herramienta facilita el acceso a la información oficial de vacunación en Quito. Los datos corresponden al Esquema Regular de Vacunación del MSP. El día indicado se refiere específicamente a la vacuna contra la Fiebre Amarilla.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-300 rounded-full"></span> V2.7 ESQUEMA REGULAR
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
