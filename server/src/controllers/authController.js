const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

// Регистрация нового пользователя
exports.register = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { username, email, password, role } = req.body;

    // Проверка, существует ли уже пользователь с таким именем
    const existingUserByUsername = await db.User.findOne({
      where: { username },
    });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Проверка, существует ли уже пользователь с таким email
    const existingUserByEmail = await db.User.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Хэширование пароля
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Получение roleId из таблицы ролей
    const roleData = await db.Role.findOne(
      { where: { name: role } },
      { transaction }
    );
    if (!roleData) {
      // Если роль не найдена, прервать транзакцию и вернуть ошибку
      await transaction.rollback();
      return res.status(400).json({ message: "Invalid role" });
    }

    const roleId = roleData.id;
    console.log("roleId:", roleId);

    // Создание нового пользователя
    const newUser = await db.User.create(
      {
        username,
        email,
        password: hashedPassword,
        role_id: roleId, // Изменено на role_id
      },
      { transaction, validate: false }
    );

    // Выполнение валидации вручную
    const validationErrors = await newUser.validate();
    if (
      validationErrors &&
      validationErrors.errors &&
      validationErrors.errors.length > 0
    ) {
      // Если валидация не прошла, откатить транзакцию
      console.log("Validation errors:", validationErrors.errors);
      await transaction.rollback();
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors.errors,
      });
    }

    await transaction.commit();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Авторизация пользователя
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Поиск пользователя по имени
    const user = await db.User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Генерация JWT-токена
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "9h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
