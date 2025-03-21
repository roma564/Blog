// tests/user_model.test.js
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../models/User.js';  // Імпортуємо модель

let mongoServer;

// Перед кожним тестом створюємо нову базу даних в пам'яті
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();  // Використовуємо create() для створення сервера
  const uri = mongoServer.getUri();  // Отримуємо URI для підключення до бази даних
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });  // Підключаємося до бази
});

// Після всіх тестів зупиняємо сервер та очищаємо базу
afterAll(async () => {
  await mongoose.connection.dropDatabase();  // Видаляємо тестову базу даних
  await mongoose.connection.close();  // Закриваємо з'єднання з MongoDB
  await mongoServer.stop();  // Зупиняємо MongoMemoryServer
});

describe('User Model Test', () => {
  // Тест для успішного створення та збереження користувача
  it('should create and save a user successfully', async () => {
    const userData = {
      fullName: 'Test User',
      email: 'test@example.com',
      passwordHash: 'hashedpassword123',
      avatarUrl: 'http://example.com/avatar.png',
    };

    const validUser = new User(userData);
    const savedUser = await validUser.save();

    // Перевіряємо, чи збережено користувача
    expect(savedUser._id).toBeDefined();
    expect(savedUser.fullName).toBe(userData.fullName);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.passwordHash).toBe(userData.passwordHash);
    expect(savedUser.avatarUrl).toBe(userData.avatarUrl);
  });

  // Тест на відсутність email (має викидати помилку)
  it('should fail when email is not provided', async () => {
    const userData = {
      fullName: 'No Email User',
      passwordHash: 'hashedpassword123',
    };

    const userWithoutEmail = new User(userData);
    
    let err;
    try {
      await userWithoutEmail.save();  // Спробуємо зберегти користувача без email
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeDefined();  // Перевіряємо, що помилка з'явилась
    expect(err.errors.email).toBeDefined();  // Перевіряємо, що помилка пов'язана з відсутністю email
  });

  // Тест на дублікати email
  it('should not allow duplicate emails', async () => {
    const userData = {
      fullName: 'User 1',
      email: 'duplicate@example.com',
      passwordHash: 'hashedpassword123',
    };

    const user1 = new User(userData);
    await user1.save();  // Зберігаємо першого користувача

    const user2 = new User(userData);  // Створюємо другого з таким самим email
    
    let err;
    try {
      await user2.save();  // Спробуємо зберегти другого користувача
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();  // Перевіряємо, що з'явилась помилка
    expect(err.code).toBe(11000);  // Код помилки для дубльованого унікального ключа
  });
});
