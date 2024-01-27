 
const inputdata = [
    {
      "url": "https://www.kaggle.com/datasets/yasserh/titanic-dataset",
      "title": "Global web iconTitanic Dataset | Kaggle",
      "content": "The sinking of the Titanic is one of the most infamous shipwrecks in history. On April 15, 1912, during her maiden voyage, the widely considered “unsinkable” RMS Titanic sank after colliding with an iceberg.Unfortunately, there weren’t enough lifeboats for everyone on board, resulting in the death of 1502 out of 2224 passengers and crew. Best practice 1: The sinking of the Titanic is one of the most infamous shipwrecks in history... Best practice 2: On April 15, 1912, during her maiden voyage, the widely considered “unsinkable” RMS Titanic sank after colliding with an iceberg.."
    },
    {
      "url": "https://www.kaggle.com/datasets/yasserh/titanic-dataset",
      "title": "Article 2: ChatGPT Prompt Writing Tips",
      "content": "The sinking of the Titanic is one of the most infamous shipwrecks in history. On April 15, 1912, during her maiden voyage, the widely considered “unsinkable” RMS Titanic sank after colliding with an iceberg.Unfortunately, there weren’t enough lifeboats for everyone on board, resulting in the death of 1502 out of 2224 passengers and crew. Best practice 2: On April 15, 1912, during her maiden voyage, the widely considered “unsinkable” RMS Titanic sank after colliding with an iceberg.... Best practice 3:  Unfortunately, there weren’t enough lifeboats for everyone on board, resulting in the death of 1502 out of 2224 passengers and crew."
    },
    
  ];
  

  const bestPractices=[];
  for(let i=0;i<inputdata.length;i++){
    const article = inputdata[i];
    const matches = article.content.match(/Best practice \d+: .*?(?=Best practice \d+:|$)/g);
    if(matches){
      const practices = matches.map((match) => match.replace(/^Best practice \d+: /, ''));
      bestPractices.push(practices);
    }
  }
  

  const combinedBestPractices = {};
  for(let i=0; i<bestPractices.length;i++){
    const practices = bestPractices[i];
    for(let j=0;j<practices.length;j++){
      const practice = practices[j];
      if(combinedBestPractices[practice]){
        combinedBestPractices[practice].count++;
        combinedBestPractices[practice].articles.push(i+1);
      }else{
        combinedBestPractices[practice]={
          count:1,
          articles:[i+1]
        };
      }
    }
  }
  
  
  const sortedBestPractices = Object.entries(combinedBestPractices).sort((a,b)=>b[1].count-a[1].count);
  

const oneList = sortedBestPractices.reduce((result, entry)=>{
    const practice=entry[0];
    const count=entry[1].count;
    const articles=entry[1].articles.join(', ');
  
    const existingEntry=result.find(item=>item.practice===practice);
    if (existingEntry){
      existingEntry.count += count;
      existingEntry.articles += `, ${articles}`;
    }else{
      result.push({
        practice,count,articles
      });
    }
     return result;
  },[]);
  
  
  console.log(JSON.stringify(oneList,null,2));
  
  
  
  