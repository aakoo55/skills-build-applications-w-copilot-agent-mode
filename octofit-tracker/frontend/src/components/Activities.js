import React, { useEffect, useState, useCallback } from 'react';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const base = window.REACT_APP_API_BASE || 'http://localhost:8000/api';
  const endpoint = `${base}/activities/`;

  const fetchData = useCallback(() => {
    setLoading(true);
    console.log('Activities: fetching from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Activities: fetched raw data', data);
        let list = [];
        if (Array.isArray(data)) list = data;
        else if (data && Array.isArray(data.results)) list = data.results;
        else if (data && typeof data === 'object') list = data.results ? data.results : [data];
        setItems(list);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderTable = (data) => {
    if (!data || data.length === 0) return <div className="text-muted">No activities found</div>;
    const columns = Array.from(new Set(data.flatMap((d) => Object.keys(d || {}))));
    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {columns.map((c) => (
                  <td key={c} style={{ whiteSpace: 'pre-wrap' }}>{
                    row[c] && typeof row[c] === 'object' ? JSON.stringify(row[c]) : String(row[c] ?? '')
                  }</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="card-title">Activities</h2>
          <div>
            <a className="me-2" href={endpoint} target="_blank" rel="noreferrer">API</a>
            <button className="btn btn-sm btn-primary" onClick={fetchData}>Refresh</button>
          </div>
        </div>

        <p className="text-muted">Endpoint: <code>{endpoint}</code></p>

        {loading && <div className="text-secondary">Loading activities...</div>}
        {error && <div className="text-danger">Error loading activities: {String(error)}</div>}

        {!loading && !error && renderTable(items)}
      </div>
    </div>
  );
}
