

export const downloadCSV = (items: any[]) => {
    const headers = ["Name", "URL"];  
    const rows = items.map(item => [item.name, item.url]); 
    
 
    const csvContent = [
      headers.join(","),  
      ...rows.map(row => row.join(",")),  // Data rows
    ].join("\n");
  
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    
   
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "pokemon_list.csv");
      link.click();
    }
  };
  