import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import { MOCK_JOBS, CATEGORIES } from '../data/mock';

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    query: searchParams.get('q') || '',
    category: searchParams.get('category') || 'all',
    type: 'all',
    sort: 'new'
  });
  
  const [jobs, setJobs] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let result = [...MOCK_JOBS];
    if (filters.category !== 'all') {
      result = result.filter(j => j.category === filters.category);
    }
    if (filters.type !== 'all') {
      result = result.filter(j => j.type === filters.type);
    }
    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(j => 
        j.title.toLowerCase().includes(q) || 
        j.company.toLowerCase().includes(q)
      );
    }
    if (filters.sort === 'new') {
      result.sort((a, b) => b.id - a.id);
    } else if (filters.sort === 'salary_desc') {
      result.sort((a, b) => b.salary - a.salary);
    } else if (filters.sort === 'urgent') {
      result.sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
    }
    setJobs(result);
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'category') {
      setSearchParams({ category: value });
    }
  };

  return (
    <div className="jobs-page">
      <Navbar />

      <div className="jobs-topbar">
        <div className="container jobs-topbar__inner">
          <div className="search-wrap">
            <i className="ph ph-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder="Профессия или компания" 
              value={filters.query}
              onChange={e => updateFilter('query', e.target.value)}
            />
          </div>
          <button className="mobile-filter-btn" onClick={() => setIsFilterOpen(true)}>
            <i className="ph ph-faders"></i> Фильтры
          </button>
          <select 
            className="sort-select"
            value={filters.sort}
            onChange={e => updateFilter('sort', e.target.value)}
          >
            <option value="new">Сначала новые</option>
            <option value="urgent">Сначала срочные</option>
            <option value="salary_desc">По убыванию зарплаты</option>
          </select>
        </div>
      </div>

      <main className="container jobs-main">
        {/* FILTERS PANEL */}
        <aside className="filters-panel">
          <h3>
            Фильтры
            <button className="filter-clear" onClick={() => setFilters({ query: '', category: 'all', type: 'all', sort: 'new' })}>
              Сбросить
            </button>
          </h3>

          <div className="filter-section">
            <div className="filter-label">Категория</div>
            <div className="filter-chips">
              {CATEGORIES.map(c => (
                <button 
                  key={c.id}
                  className={`filter-chip ${filters.category === c.id ? 'active' : ''}`}
                  onClick={() => updateFilter('category', c.id)}
                >
                  <span dangerouslySetInnerHTML={{ __html: c.emoji }}></span> {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-label">Тип занятости</div>
            <div className="filter-chips">
              <button className={`filter-chip ${filters.type === 'all' ? 'active' : ''}`} onClick={() => updateFilter('type', 'all')}>Любая</button>
              <button className={`filter-chip ${filters.type === 'parttime' ? 'active' : ''}`} onClick={() => updateFilter('type', 'parttime')}>Неполный день</button>
              <button className={`filter-chip ${filters.type === 'oneday' ? 'active' : ''}`} onClick={() => updateFilter('type', 'oneday')}>Разовая</button>
              <button className={`filter-chip ${filters.type === 'weekend' ? 'active' : ''}`} onClick={() => updateFilter('type', 'weekend')}>Выходные</button>
              <button className={`filter-chip ${filters.type === 'evening' ? 'active' : ''}`} onClick={() => updateFilter('type', 'evening')}>Вечерняя</button>
            </div>
          </div>
        </aside>

        {/* JOBS LIST */}
        <div className="jobs-content">
          <div className="jobs-header">
            <div className="jobs-count">Найдено вакансий: <strong>{jobs.length}</strong></div>
          </div>

          <div className="jobs-grid">
            {jobs.length > 0 ? (
              jobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '20px' }}>
                <i className="ph ph-ghost" style={{ fontSize: '3rem', color: '#94a3b8' }}></i>
                <h3 style={{ marginTop: '1rem', color: '#1e293b' }}>Ничего не найдено</h3>
                <p style={{ color: '#64748b' }}>Попробуйте изменить фильтры поиска.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <div className={`filter-overlay ${isFilterOpen ? 'open' : ''}`} onClick={() => setIsFilterOpen(false)}></div>

      <Footer />
    </div>
  );
}
