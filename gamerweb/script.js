const apiKey = "1402ce97152c74ee7d3faf08c14c4b3e";  
const newsContainer = document.getElementById("news-container");

async function fetchGamingNews() {
  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=gaming&lang=en&token=${apiKey}&max=10`
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No gaming news found.</p>";
      return;
    }

    newsContainer.innerHTML = "";

    data.articles.forEach(article => {
      const newsItem = document.createElement("div");
      newsItem.classList.add("news-article");

      newsItem.innerHTML = `
        <h3><a href="${article.url}" target="_blank" rel="noopener noreferrer">${article.title}</a></h3>
        <p>${article.description || "No description available."}</p>
        <small>Source: ${article.source.name} | ${new Date(article.publishedAt).toLocaleString()}</small>
      `;

      newsContainer.appendChild(newsItem);
    });

  } catch (error) {
    newsContainer.innerHTML = "<p>Error fetching news. Please try again later.</p>";
    console.error("Fetch error:", error);
  }
}

fetchGamingNews();
setInterval(fetchGamingNews, 600000); // Refresh every 10 minutes
