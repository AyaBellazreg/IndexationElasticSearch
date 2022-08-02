//importing elasticsearch
const { Client } = require('@elastic/elasticsearch');

//json data (Document example)
const titles = [
  {
    id: 1,
    title: 'Traditional Marketing Vs Digital Marketing',
    author: 'eCommerce FAQs',
    date: new Date(),
  },
  {
    id: 2,
    title: 'Global Digital Marketing Courses Market 2019 Business Strategies ',
    author: 'Coursera',
    date: new Date(),
  },
  {
    id: 3,
    title: 'Big Data vs Data Warehouse',
    author: 'Igor',
    date: new Date(),
  },
  {
    id: 4,
    title: 'Traditional Marketing Vs Digital Marketing',
    author: 'eCommerce FAQs',
    date: new Date(),
  },
  {
    id: 5,
    title: 'Cloudera Data Platform gives big data users multi-cloud path',
    author: 'Erpinnews',
    date: new Date(),
  },
  {
    id: 6,
    title: 'IoT Event Blog Affinity IoT',
    author: 'infoMegan Davis',
    date: new Date(),
  },
  {
    id: 7,
    title: 'Cloud to cloud backup Solutions Archives',
    author: 'Michael Schneider',
    date: new Date(),
  },
  {
    id: 8,
    title: 'Car hire with car insurance',
    author: 'Gary Hunter',
    date: new Date(),
  },
  {
    id: 9,
    title: 'Fashion Jobs and Fashion Career Advice',
    author: 'Randy C. Marque',
    date: new Date(),
  },
  {
    id: 10,
    title: 'Fashion Designer Zac Posen is Shutting Down his Fashion Label',
    author: 'MARCY OSTER, JTA',
    date: new Date(),
  },
];
//connection
const client = new Client({
  cloud: {
    id: 'indexation:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDZhZGQwZmVlMzdkYzRkZjE4ZDRiM2VkNTRhNjM0MDkyJDIwYWJlMWMyNTU1MjQyOGJhMDFmYzEzOWFmZmJmMjYy',
  },
  auth: {
    username: 'elastic',
    password: '52zLwyl4Erxy4dGTNUbae9Dr',
  },
});

//add documents to the cluster
const pushAllDocs = async () => {
  try {
    const promises = [];
    //looping through Titles
    titles.forEach((title) =>
    //creating an index called titles and adding it to the promises array
      promises.push(
        client.create({ index: 'titles', id: title.id, body: title })
      )
    );
    //gets the response once all promises are resolved
    const response = await Promise.all(promises);
    console.log(response);
  } catch (err) { //if there's an error, for example it could be that you've already created that index before
    console.log('Create request error!');
  }
};

//gets documents from cluster
const getAllDocs = async () => {
  try {
    const promises = [];
    //getting index with "titles" 
    titles.forEach((title) =>
      promises.push(client.get({ index: 'titles', id: title.id }))
    );
    const response = await Promise.all(promises);
    //to fetch the data
    console.log(response.map((r) => r._source));
  } catch (err) {
    console.log('Get request error!');
  }
};

//deleting documents
//same steps, but this time we are deleting the documents
const deleteAllDocs = async () => {
  try {
    const promises = [];
    titles.forEach((title) =>
      promises.push(client.delete({ index: 'titles', id: title.id }))
    );
    const response = await Promise.all(promises);
    console.log(response);
  } catch (err) {
    console.log('Delete request error!');
  }
};

//searching for a term
const searchTerm = async (term) => {
  try {
    const result = await client.search({
      index: 'titles',
      query: {
        //the match ->title value is the word we want to search for in our documents
        match: {
          title: term,
        },
      },
    });
    console.log(result.hits.hits);
  } catch (err) {
    console.log('Search request error!');
  }
};


//pushAllDocs();
//getAllDocs();
//searchTerm('digital');
deleteAllDocs();


