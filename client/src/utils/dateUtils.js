export const fmtDate = (raw) => {
  if (!raw) return '—';
  try {
    const d = new Date(raw);
    if (isNaN(d)) return raw;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return raw; }
};

export const getDueStatus = (dateStr) => {
  if (!dateStr) return null;
  
  let due;
  // Properly parse "YYYY-MM-DD" to avoid UTC timezone shift bugs
  if (typeof dateStr === 'string' && dateStr.length === 10 && dateStr.indexOf('-') === 4) {
    const [y, m, d] = dateStr.split('-');
    // Set to 23:59:59 (end of the due date day)
    due = new Date(y, m - 1, d, 23, 59, 59);
  } else {
    due = new Date(dateStr);
  }
  
  if (isNaN(due)) return null;
  
  const now = new Date();
  const diffTime = due.getTime() - now.getTime();
  
  if (diffTime < 0) return 'Overdue';
  
  // 24 hours in milliseconds
  if (diffTime <= 24 * 60 * 60 * 1000) return 'Due Soon';
  
  return null;
};
