  // Step 1: Define the input data containing URLs, titles, and contents of the articles
const input_data = [
    {
      "url": "https://www.kaggle.com/datasets/yasserh/titanic-dataset",
      "title": "Global web iconTitanic Dataset | Kaggle",
      "content": "The sinking of the Titanic is one of the most infamous shipwrecks in history. On April 15, 1912, during her maiden voyage, the widely considered “unsinkable” RMS Titanic sank after colliding with an iceberg.. Best practice 1: The sinking of the Titanic is one of the most infamous shipwrecks in history... Best practice 2: On April 15, 1912, during her maiden voyage, the widely considered “unsinkable” RMS Titanic sank after colliding with an iceberg.. Best practice 1: The sinking of the Titanic is one of the most infamous shipwrecks in history..."
    },
    {
      "url": "https://www.kaggle.com/datasets/yasserh/titanic-dataset",
      "title": "Article 2: ChatGPT Prompt Writing Tips",
      "content": "The sinking of the Titanic is one of the most infamous shipwrecks in history. On April 15, 1912, during her maiden voyage, the widely considered “unsinkable” RMS Titanic sank after colliding with an iceberg... Best practice 2: The sinking of the Titanic is one of the most infamous shipwrecks in history... Best practice 3:  On April 15, 1912, during her maiden voyage, the widely considered “unsinkable” RMS Titanic sank after colliding with an iceberg..."
    },
    // Add more articles as needed
  ];
  
  // Step 2: Extract the best practices from each article
  const bestPractices = [];
  for (let i = 0; i < input_data.length; i++) {
    const article = input_data[i];
    const matches = article.content.match(/Best practice \d+: .*?(?=Best practice \d+:|$)/g);
    if (matches) {
      const practices = matches.map((match) => match.replace(/^Best practice \d+: /, ''));
      bestPractices.push(practices);
    }
  }
  
  // Step 3: Combine and count the best practices from all articles
  const combinedBestPractices = {};
  for (let i = 0; i < bestPractices.length; i++) {
    const practices = bestPractices[i];
    for (let j = 0; j < practices.length; j++) {
      const practice = practices[j];
      if (combinedBestPractices[practice]) {
        combinedBestPractices[practice].count++;
        combinedBestPractices[practice].articles.push(i + 1);
      } else {
        combinedBestPractices[practice] = {
          count: 1,
          articles: [i + 1]
        };
      }
    }
  }
  
  // Step 4: Sort the combined best practices based on the number of articles discussing them
  const sortedBestPractices = Object.entries(combinedBestPractices).sort((a, b) => b[1].count - a[1].count);
  
  // Step 5: Generate the final one-list combining best practices and their article indices
  const oneList = sortedBestPractices.map((entry) => {
    const practice = entry[0];
    const count = entry[1].count;
    const articles = entry[1].articles.join(', ');
    return `${practice} (mentioned in article(s): ${articles})`;
  });
  
  // Step 6: Output the one-list
  console.log(oneList);