const faker = require('faker');
faker.locale = 'ru';
const { User, Admin, Toy, Clothing, Feed, Accessory } = require('./models');

async function createUsers() {
  for(let i = 0; i < 100; i++) {    
    let user = {
      fio: faker.name.findName(),
      country: faker.address.country(),
      birthDate: faker.date.past(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      phoneNumber: faker.phone.phoneNumber(),
    };
    await User.create(user);  
  }
}

async function createAdmins() {
  for(let i = 0; i < 100; i++) {
    let admin = {
      fio: faker.name.findName(),
      country: faker.address.country(),
      birthDate: faker.date.past(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      phoneNumber: faker.phone.phoneNumber(),
    };
    await Admin.create(admin);
  }
}

async function createToys() {
  for(let i = 0; i < 100; i++) {    
    let toy = {
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      createdAt: new Date(),
      price: parseFloat((Math.random() * 100).toFixed(2)),
      inStock: Math.random() < 0.5 ? true : false,
      releaseDate: faker.date.past(),
      weight: parseFloat((Math.random() * 10).toFixed(2)),
      discountPercentage: Math.floor(Math.random() * 50),
      availability: faker.random.arrayElement(['Есть в наличии', 'Нет в наличии', 'Сделать предзаказ'])
    };
    await Toy.create(toy);  
  }
}

async function createClothings() {
  for(let i = 0; i < 100; i++) {    
    let сlothing = {
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      createdAt: new Date(),
      price: parseFloat((Math.random() * 100).toFixed(2)),
      inStock: Math.random() < 0.5 ? true : false,
      releaseDate: faker.date.past(),
      weight: parseFloat((Math.random() * 10).toFixed(2)),
      discountPercentage: Math.floor(Math.random() * 50),
      availability: faker.random.arrayElement(['Есть в наличии', 'Нет в наличии', 'Сделать предзаказ'])
    };
    await Clothing.create(сlothing);  
  }
}

async function createFeeds() {
  for(let i = 0; i < 100; i++) {    
    let feed = {
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      createdAt: new Date(),
      price: parseFloat((Math.random() * 100).toFixed(2)),
      inStock: Math.random() < 0.5 ? true : false,
      releaseDate: faker.date.past(),
      weight: parseFloat((Math.random() * 10).toFixed(2)),
      discountPercentage: Math.floor(Math.random() * 50),
      availability: faker.random.arrayElement(['Есть в наличии', 'Нет в наличии', 'Сделать предзаказ'])
    };
    await Feed.create(feed);  
  }
}

async function createAccessories() {
  for(let i = 0; i < 100; i++) {    
    let accessory = {
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      createdAt: new Date(),
      price: parseFloat((Math.random() * 100).toFixed(2)),
      inStock: Math.random() < 0.5 ? true : false,
      releaseDate: faker.date.past(),
      weight: parseFloat((Math.random() * 10).toFixed(2)),
      discountPercentage: Math.floor(Math.random() * 50),
      availability: faker.random.arrayElement(['Есть в наличии', 'Нет в наличии', 'Сделать предзаказ'])
    };
    await Accessory.create(accessory);  
  }
}

module.exports = { createUsers, createAdmins, createToys, createClothings, createFeeds, createAccessories };