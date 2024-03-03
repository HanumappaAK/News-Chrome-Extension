// Define an asynchronous function named getNews
async function getNews() {
  try {
    // Fetch news data from the News API
    const data = await fetch(
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=143dce8d77094e9c8b1d61a6f55f5c15"
    );

    // Convert the fetched data into JSON format
    const jsonData = await data.json();

    // If the status of the response is not 'ok', return
    if (jsonData.status !== "ok") return;

    // Extract the top 10 articles from the fetched data
    const newsData = jsonData.articles.slice(0, 15);

    // If no news data is available, return an empty array
    if (!newsData) return [];

    // Map over the news data and extract relevant information
    let relevantData = newsData.map((n) => {
      return {
        title: n.title,
        description: n.description,
        url: n.url,
        linkText: "Read more",
        img: n.urlToImage,
      };
    });

    // Filter out news items with null descriptions
    relevantData = relevantData.filter((item) => item.description !== null && item.img !== null);

    // Log the relevant data to the console
    console.log(relevantData);

    // Create a list of news items with their titles, descriptions, and URLs
    const newsList = relevantData
      .map(
        (n) =>
          `<div style="display: flex; padding-bottom: 10px;"><img src="${n.img}" alt="${n.title}" style="width: 160px; height: auto; margin-right: 10px;"><div><h3>${n.title}</h3><p>${n.description}</p><a href="${n.url}" target="_blank">${n.linkText}</a></div></div>`
      )
      .join("");

    // Insert the news list into the HTML element with the id "news"
    document.getElementById("news").innerHTML = newsList;

    // Return the relevant data
    return relevantData;
  } catch (error) {
    // Catch any errors that occur during the execution of the function and log them to the console
    console.log(error);
  }
}

// Call the getNews function to fetch and display news data
getNews();
