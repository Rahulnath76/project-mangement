import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  data: Record<string, string>;
  fields: Array<{
    name: string;
    isPassword?: boolean;
    type: string;
    placeholder?: string;
    required?: boolean;
  }>;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formType: string;
  error: string;
}

const AuthForm = ({
  handleSubmit,
  data,
  fields,
  handleOnChange,
  formType,
  error,
}: Props) => {
  const { loading } = useSelector((state: RootState) => state.auth);
  const [showPasswordMap, setShowPasswordMap] = useState<
    Record<string, boolean>
  >({});

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswordMap((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <div className="">
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
              className="px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary text-sm shadow-sm"


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
        {error && <p className="text-red-500 text-sm gap-0 -my-2">{error}</p>}

        <button className="bg-secondary py-2 px-4 rounded-xl font-semibold text-white hover:bg-opacity-90 transition duration-300 cursor-pointer">

          {loading ? "loading..." : formType}
        </button>
      </form>

      <div className="text-primary mt-8 text-sm">
        {formType !== "Sign up" ? 
        <span>
          Don't have an account? <Link to={"/signup"} className="text-secondary font-semibold">Signup</Link>
        </span> : 
        <span>
          Already registerd! <Link to={"/signin"} className="text-secondary font-semibold">Signin</Link>
        </span>
}
      </div>
    </div>
  );
};

export default AuthForm;
