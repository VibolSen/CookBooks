import { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name, email, password, role }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Network response was not ok");
      }

      const profile = await response.json();
      document.cookie = `user=${JSON.stringify(profile)}; path=/;`;

      router.push("/"); // Redirect to home page upon successful registration
    } catch (error) {
      setError((error as Error).message || "An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ...existing form fields... */}
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Register;
