export   const getStatusChip = (status) => {
    switch (status) {
      case 'Active':
        return { color: 'success', label: 'Active' }; 
      case 'Pending':
        return { color: 'warning', label: 'Pending' };
      case 'Open':
        return { color: 'error', label: 'Open' };
      case 'Resolved':
        return { color: 'info', label: 'Resolved' }; 
      default:
        return { color: 'default', label: status }; 
    }
  };