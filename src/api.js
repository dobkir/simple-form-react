export const api = (fetchedData, toggleIsFetching) => {
  toggleIsFetching(true);
  fetch('https://api.jsonbin.io/v3/b', {
    method: 'POST',
    body: JSON.stringify({ fetchedData }),
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-Master-Key': '$2b$10$65lTDH3r4YCHqsLIzTJGZ.fIzJmJPTL24xO2Ol3sH9.saBA4cwWLW'
    })
  })
    .then(response => {
      // Let's check the response code
      if (!response.ok) {
        // If the server returned a response code out of range [200, 299]
        return Promise.reject(new Error(
          'Response failed: ' + response.status + ' (' + response.statusText + ')'
        ));
      }
      // Next, we will only use JSON from the response body
      return response.json();
    })
    // Let's check what form data was submitted to the server (remove it in the work version)
    .then(data => {
      /*   alert(
          "The server received the following data from you: \n" +
          Object.entries(data.record.fetchedData).map(([key, value]) => {
            return `${key}: ${value}, \n`;
          }).join('')
        ); */
      toggleIsFetching(false);
    })
    .catch(error => alert(`Oops, any problem here: ${error.name}. ${error.message}`));
};
