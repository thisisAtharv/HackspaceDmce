import React, { useState } from 'react';
import { Calendar as CalendarIcon, Star, Search } from 'lucide-react';

const Calendar = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // 1-12
  
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [yearInput, setYearInput] = useState(currentYear.toString());
  const [monthInput, setMonthInput] = useState(currentMonth.toString());

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const year = parseInt(yearInput);
    const month = parseInt(monthInput);
    
    if (!isNaN(year) && year >= 1000 && year <= 2299 && !isNaN(month) && month >= 1 && month <= 12) {
      setSelectedYear(year);
      setSelectedMonth(month);
    } else if (year > 2299) {
      alert('Year cannot exceed 2299');
    }
  };

  const handleGoToToday = () => {
    setSelectedYear(currentYear);
    setSelectedMonth(currentMonth);
    setYearInput(currentYear.toString());
    setMonthInput(currentMonth.toString());
  };

  const handleYearInputChange = (e) => {
    setYearInput(e.target.value);
  };

  const handleMonthInputChange = (e) => {
    setMonthInput(e.target.value);
  };

  return (
    <div className="dashboard-page" style={{ height: 'calc(100vh - 20px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      <div className="page-header" style={{ marginBottom: '16px', flexShrink: 0 }}>
        <h1 className="page-title">Astronomical Events Calendar</h1>
        <p className="page-subtitle">Track upcoming celestial events, eclipses, and meteor showers</p>
      </div>

      {/* Calendar Card */}
      <div className="card" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        padding: 0
      }}>
        <div className="card-header" style={{ 
          flexShrink: 0,
          padding: '20px',
          borderBottom: '1px solid var(--space-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div className="card-icon cyan"><CalendarIcon size={20} /></div>
          <span className="card-title">Event Timeline</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Star size={16} color="#f59e0b" fill="#f59e0b" />
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                Solar Eclipses • Lunar Eclipses • Meteor Showers
              </span>
            </div>
            
            {/* Month and Year Search Box */}
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {/* Month Selector */}
              <div style={{ position: 'relative' }}>
                <select
                  value={monthInput}
                  onChange={handleMonthInputChange}
                  style={{
                    padding: '8px 12px',
                    background: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    color: '#06b6d4',
                    fontSize: '13px',
                    fontWeight: '600',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: '0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#06b6d4'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)'}
                >
                  {months.map(month => (
                    <option key={month.value} value={month.value} style={{ background: '#0f172a', color: '#fff' }}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Input */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={yearInput}
                  onChange={handleYearInputChange}
                  placeholder="Year..."
                  style={{
                    padding: '8px 12px 8px 36px',
                    background: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '8px',
                    color: '#06b6d4',
                    fontSize: '13px',
                    fontWeight: '600',
                    outline: 'none',
                    width: '110px',
                    transition: '0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#06b6d4'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)'}
                />
                <Search 
                  size={16} 
                  color="#06b6d4" 
                  style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                  }} 
                />
              </div>
              
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  background: '#06b6d4',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#0f172a',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#0891b2'}
                onMouseOut={(e) => e.target.style.background = '#06b6d4'}
              >
                Go
              </button>
              
              <button
                type="button"
                onClick={handleGoToToday}
                style={{
                  padding: '8px 16px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid #10b981',
                  borderRadius: '8px',
                  color: '#10b981',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(16, 185, 129, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(16, 185, 129, 0.1)';
                }}
              >
                Today
              </button>
              
              <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '4px' }}>
                (Viewing: {months.find(m => m.value === selectedMonth)?.label} {selectedYear})
              </span>
            </form>
          </div>
        </div>

        {/* Iframe Container */}
        <div style={{ 
          flex: 1, 
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '20px',
          background: 'rgba(255,255,255,0.02)'
        }}>
          <iframe 
            key={`${selectedYear}-${selectedMonth}`} // Force reload when year or month changes
            allowTransparency="yes" 
            scrolling="no" 
            style={{ 
              border: 'none', 
              width: '100%', 
              maxWidth: '860px',
              height: '759px', 
              overflow: 'hidden',
              borderRadius: '8px'
            }} 
            src={`https://in-the-sky.org/widgets/newscal.php?skin=1&locale=0&year=${selectedYear}&month=${selectedMonth}`}
            title="Astronomical Events Calendar"
          />
        </div>
      </div>

      {/* Info Banner */}
      <div style={{ 
        marginTop: '16px',
        padding: '12px 16px',
        background: 'rgba(6, 182, 212, 0.1)',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexShrink: 0
      }}>
        <Star size={16} color="#06b6d4" />
        <span style={{ fontSize: '13px', color: '#94a3b8' }}>
          Calendar updates automatically with upcoming astronomical events from in-the-sky.org • Select month and year (1000-2299) to view specific events
        </span>
      </div>
    </div>
  );
};

export default Calendar;
