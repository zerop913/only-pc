import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getUserProfile,
  updateUserProfile,
  verifyAdmin,
} from "../../utils/api";
import { ROUTES } from "../../utils/routes";
import ConfirmationModal from "../Notifications/ConfirmationModal";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    city: "",
    address: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [originalFormData, setOriginalFormData] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userProfile = await getUserProfile(token);
        setUserData(userProfile);
        setFormData({
          firstName: userProfile.first_name || "",
          lastName: userProfile.last_name || "",
          middleName: userProfile.middle_name || "",
          city: userProfile.city || "",
          address: userProfile.address || "",
        });
        setOriginalFormData({
          firstName: userProfile.first_name || "",
          lastName: userProfile.last_name || "",
          middleName: userProfile.middle_name || "",
          city: userProfile.city || "",
          address: userProfile.address || "",
        });

        const isUserAdmin = await verifyAdmin(token);
        setIsAdmin(isUserAdmin);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasChanges = Object.keys(formData).some(
      (key) => formData[key] !== originalFormData[key]
    );

    if (hasChanges) {
      setShowConfirmationModal(true);
    } else {
      try {
        const token = localStorage.getItem("token");
        await updateUserProfile(token, formData);
        setIsEditMode(false);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleConfirmUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await updateUserProfile(token, formData);
      setIsEditMode(false);
      setShowConfirmationModal(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelUpdate = () => {
    setShowConfirmationModal(false);
    setIsEditMode(false);
    setFormData(originalFormData);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-[#1F1E24] rounded-lg shadow-lg p-8 max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-3xl font-bold">Профиль</h2>
          <button
            onClick={handleLogout}
            className="bg-[#3C3A46] text-white font-bold py-2 px-4 rounded hover:bg-[#DD5B5B] transition-colors duration-300"
          >
            Выход
          </button>
        </div>

        {userData ? (
          <>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#3C3A46] rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                {userData.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white text-lg font-bold">
                  {userData.username}
                </p>
                <p className="text-[#7FC647]">{userData.email}</p>
              </div>
            </div>

            {isEditMode ? (
              <div className="max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-[#3C3A46] p-6 rounded-lg">
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label
                          htmlFor="firstName"
                          className="text-white block mb-2"
                        >
                          Имя
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-[#1F1E24] text-white"
                        />
                      </div>
                      <div className="w-1/2">
                        <label
                          htmlFor="lastName"
                          className="text-white block mb-2"
                        >
                          Фамилия
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-[#1F1E24] text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#3C3A46] p-6 rounded-lg">
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label
                          htmlFor="middleName"
                          className="text-white block mb-2"
                        >
                          Отчество
                        </label>
                        <input
                          type="text"
                          id="middleName"
                          name="middleName"
                          value={formData.middleName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-[#1F1E24] text-white"
                        />
                      </div>
                      <div className="w-1/2">
                        <label htmlFor="city" className="text-white block mb-2">
                          Город
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-[#1F1E24] text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#3C3A46] p-6 rounded-lg">
                    <label htmlFor="address" className="text-white block mb-2">
                      Адрес
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-[#1F1E24] text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-6">
                    <button
                      onClick={handleCancelUpdate}
                      className="bg-[#3C3A46] text-white font-bold py-2 px-4 rounded hover:bg-[#DD5B5B] transition-colors duration-300"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="bg-[#7FC647] text-white font-bold py-2 px-4 rounded hover:bg-[#6ca63a] transition-colors duration-300"
                    >
                      Сохранить
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-600 pb-2">
                  <p className="text-white">Имя:</p>
                  <p className="text-white">
                    {userData.first_name || "-"}
                  </p>{" "}
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-2">
                  <p className="text-white">Фамилия:</p>
                  <p className="text-white">{userData.last_name || "-"}</p>{" "}
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-2">
                  <p className="text-white">Отчество:</p>
                  <p className="text-white">
                    {userData.middle_name || "-"}
                  </p>{" "}
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-2">
                  <p className="text-white">Город:</p>
                  <p className="text-white">{userData.city || "-"}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-white">Адрес:</p>
                  <p className="text-white">{userData.address || "-"}</p>
                </div>

                <button
                  onClick={handleEditClick}
                  className="w-full py-2 rounded-lg bg-[#7FC647] text-white font-bold hover:bg-[#6ca63a] transition-colors duration-300"
                >
                  Редактировать
                </button>
              </div>
            )}

            <div className="mt-8">
              {isAdmin ? (
                <button className="w-full py-2 rounded-lg bg-[#3C3A46] text-white font-bold hover:bg-[#514f5e] transition-colors duration-300">
                  <Link to={ROUTES.ADMIN_DASHBOARD}>Панель администратора</Link>
                </button>
              ) : null}
            </div>
          </>
        ) : (
          <p className="text-white">Загрузка данных...</p>
        )}
      </div>
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onConfirm={handleConfirmUpdate}
        onCancel={handleCancelUpdate}
        message="Вы уверены, что хотите изменить данные профиля"
      />
    </div>
  );
};

export default Profile;
