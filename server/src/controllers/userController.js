const db = require("../models");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.id, {
      include: {
        model: db.UserInfo,
        attributes: [
          "first_name",
          "last_name",
          "middle_name",
          "city",
          "address",
        ],
      },
    });

    const userInfo = user.UserInfo ? user.UserInfo.toJSON() : {};

    const userData = {
      ...userInfo,
      username: user.username,
      email: user.email,
    };

    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, middleName, city, address } = req.body;

    const [updatedCount, updatedUserInfo] = await db.UserInfo.upsert(
      {
        user_id: req.user.id,
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        city,
        address,
      },
      { returning: true }
    );

    res.json({ message: "User profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
