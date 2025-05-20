import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const AuthForm = ({
  handleSubmit,
  data,
  fields,
  handleOnChange,
  formType,
  passwordError,
}) => {
  const { loading } = useSelector((state) => state.auth);
  const [showPasswordMap, setShowPasswordMap] = useState<
    Record<string, boolean>
  >({});

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswordMap((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {fields.map(({ name, isPassword, type, placeholder, required }) => (
          <div key={name} className={`flex flex-col relative`}>
            <label className="text-sm pointer-events-none" htmlFor={name}>
              {name}
            </label>
            <input
              type={
                isPassword
                  ? showPasswordMap[name]
                    ? "text"
                    : "password"
                  : type
              }
              name={name.toLowerCase()}
              placeholder={placeholder}
              required={required}
              value={data[name.toLowerCase() as keyof typeof data]}
              onChange={handleOnChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary"
            />
            {isPassword && (
              <span
                onClick={() => togglePasswordVisibility(name)}
                className="absolute right-4 top-8 cursor-pointer"
              >
                {showPasswordMap[name] ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </span>
            )}
          </div>
        ))}
        {passwordError && (
          <p className="text-red-500 text-sm gap-0 -my-2">{passwordError}</p>
        )}

        <button className="bg-secondary p-2 rounded-lg font-semibold text-white cursor-pointer">
          {loading ? "loading..." : formType}
        </button>
      </form>
    );
  };

export default AuthForm;
