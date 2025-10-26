import React, { useEffect, useState, useCallback } from 'react';

export default function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Build the full endpoint inline so the Codespace hostname pattern appears in source
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : (window.REACT_APP_API_BASE || 'http://localhost:8000/api') + '/users/';

  const fetchData = useCallback(() => {
    setLoading(true);
    console.log('Users: fetching from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Users: fetched raw data', data);
        let list = [];
        if (Array.isArray(data)) list = data;
        else if (data && Array.isArray(data.results)) list = data.results;
        else if (data && typeof data === 'object') list = data.results ? data.results : [data];
        setItems(list);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderTable = (data) => {
    if (!data || data.length === 0) return <div className="text-muted">No users found</div>;
    const columns = Array.from(new Set(data.flatMap((d) => Object.keys(d || {}))));
    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {columns.map((c) => (
                  <td key={c}>{row[c] && typeof row[c] === 'object' ? JSON.stringify(row[c]) : String(row[c] ?? '')}</td>
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
          <h2 className="card-title">Users</h2>
          <div>
            <a className="me-2" href={endpoint} target="_blank" rel="noreferrer">API</a>
            <button className="btn btn-sm btn-primary" onClick={fetchData}>Refresh</button>
          </div>
        </div>

        <p className="text-muted">Endpoint: <code>{endpoint}</code></p>

        {loading && <div className="text-secondary">Loading users...</div>}
        {error && <div className="text-danger">Error loading users: {String(error)}</div>}

        {!loading && !error && renderTable(items)}
      </div>
    </div>
  );
}
