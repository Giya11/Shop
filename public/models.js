const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://blankajx_animal:Q1qqqqqq@blankajx.beget.tech:3306/blankajx_animal');

// Модель Пользователя
const User = sequelize.define('User', {  
  fio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {  
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
    {
      unique: true,
      fields: ['username']
    },
    {
      unique: true,
      fields: ['phoneNumber']
    }
  ]
});


// Модель Администратора
const Admin = sequelize.define('Admin', {  
  fio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {  
});

//Модель игрушки
const Toy = sequelize.define('Toy', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.TIME, 
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  releaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  discountPercentage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  availability: {
    type: DataTypes.ENUM('Есть в наличии', 'Нет в наличии', 'Сделать предзаказ'),
    allowNull: false
  }
}, {
  indexes: [] // Опция для предотвращения автоматического добавления индексов
});


//Модель Одежды
const Clothing = sequelize.define('Clothing', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.TIME, 
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  releaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  discountPercentage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  availability: {
    type: DataTypes.ENUM('Есть в наличии', 'Нет в наличии', 'Сделать предзаказ'),
    allowNull: false
  }
}, {
  indexes: [] // Опция для предотвращения автоматического добавления индексов
});

//Модель Корма
const Feed = sequelize.define('Feed', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.TIME, 
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  releaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  discountPercentage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  availability: {
    type: DataTypes.ENUM('Есть в наличии', 'Нет в наличии', 'Сделать предзаказ'),
    allowNull: false
  }
}, {
  indexes: [] // Опция для предотвращения автоматического добавления индексов
});

//Модель Аксессуара
const Accessory = sequelize.define('Accessory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.TIME, 
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  releaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  discountPercentage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  availability: {
    type: DataTypes.ENUM('Есть в наличии', 'Нет в наличии', 'Сделать предзаказ'),
    allowNull: false
  }
}, {
  indexes: [] // Опция для предотвращения автоматического добавления индексов
});


// Создадим модель для промежуточной таблицы UserToy
const UserToy = sequelize.define('UserToy', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  toyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Определим связи многие ко многим между User и Toy с явным указанием полей userId и toyId
User.belongsToMany(Toy, { through: UserToy, foreignKey: 'userId' });
Toy.belongsToMany(User, { through: UserToy, foreignKey: 'toyId' });

// Создадим модель для промежуточной таблицы UserClothing
const UserClothing = sequelize.define('UserClothing', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clothingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Определим связи многие ко многим между User и Clothing через UserClothing
User.belongsToMany(Clothing, { through: UserClothing, foreignKey: 'userId' });
Clothing.belongsToMany(User, { through: UserClothing, foreignKey: 'clothingId' });

// Создадим модель для промежуточной таблицы UserFeed
const UserFeed = sequelize.define('UserFeed', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  feedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Определим связи многие ко многим между User и Feed через UserFeed
User.belongsToMany(Feed, { through: UserFeed, foreignKey: 'userId' });
Feed.belongsToMany(User, { through: UserFeed, foreignKey: 'feedId' });

// Создадим модель для промежуточной таблицы UserToy
const UserAccessory = sequelize.define('UserAccessory', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  accessoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Определим связи многие ко многим между User и Accessory через UserAccessory
User.belongsToMany(Accessory, { through: UserAccessory, foreignKey: 'userId' });
Accessory.belongsToMany(User, { through: UserAccessory, foreignKey: 'accessoryId' });

UserToy.sync({ alter: false });
UserClothing.sync({ alter: false });
UserFeed.sync({ alter: false });
UserAccessory.sync({ alter: false });

User.sync({ alter: false });
Admin.sync({ alter: false });

Toy.sync({ alter: false });
Clothing.sync({ alter: false });
Feed.sync({ alter: false });
Accessory.sync({ alter: false });

module.exports = { sequelize, User, Admin, Toy, Clothing, Feed, Accessory, UserToy, UserClothing, UserFeed, UserAccessory };
