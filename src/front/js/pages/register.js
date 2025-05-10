import React, { useState, useContext} from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


export const Register = () => {
  const { store, actions } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add signup logic here
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords are not matching",
        customClass: {
          title: "swal-custom-title",
          confirmButton: "swal-custom-confirm-button",
        },
      });
      return;
    }

    const userCreated = await actions.register(formData.name, formData.email, formData.password, formData.gender);

    if (!userCreated) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Cannot create user!",
        footer: '<a href="#">Double check the inputs please...</a>',
        customClass: {
          title: "swal-custom-title",
          confirmButton: "swal-custom-confirm-button",
        },
      });
    } else {
      Swal.fire({
        title: "User created!",
        text: "Welcome to ONMi!",
        icon: "success",
        customClass: {
          title: "swal-custom-title",
          confirmButton: "swal-custom-confirm-button",
        },
      });
      navigate("/profile");
    }
  };

  console.log('Signup data:', formData);

  return (
    <div className="mx-auto my-5">
      <div className="container">
        {/* Left Side - Description */}
        <div className="">
          <h1 className="">Become a member</h1>
          <p className="">
            Onmino helps you organize your ideas, tasks, and projects simply and efficiently. Start today!
          </p>
        </div>
        {/* Right Side - Signup Form */}
        <div className="w-1/2 p-8 bg-white">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#D0D7DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#D0D7DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]"
                required
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#D0D7DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn mx-2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#D0D7DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]"
                required
              />
            </div>
            <div className="mb-4">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#D0D7DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]"
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="NON_BINARY">Non-binary</option>
                <option value="OTHER">Other</option>
                <option value="PREFER_NOT_TO_SAY">Prefer_not_to_say</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}