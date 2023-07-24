 


// Function to translate a given text from Chinese to English using a translation API
function translateText(text) {
  const apiKey = 'YOUR_API_KEY'; // Replace with your own API key
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const data = {
    q: text,
    target: 'en'
  };

  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    const translatedText = data.data.translations[0].translatedText;
    console.log(translatedText);
  })
  .catch(error => console.error(error));
}

// Example usage
translateText('联动翻译成英语怎么写');
 
const tsObj: { [key: string]: string } = {
  name: 'John',
  age: '30',
  city: 'New York'
};

 
// Define an object with type annotations in multiple ways
type Person = {
  name: string;
  age: number;
  city: string;
};

interface IPerson {
  name: string;
  age: number;
  city: string;
}

class PersonClass {
  name: string;
  age: number;
  city: string;

  constructor(name: string, age: number, city: string) {
    this.name = name;
    this.age = age;
    this.city = city;
  }
}

const tsObj: Person = {
  name: 'John',
  age: 30,
  city: 'New York'
};

const tsObj2: IPerson = {
  name: 'John',
  age: 30,
  city: 'New York'
};

const tsObj3 = new PersonClass('John', 30, 'New York');







