import LoginContainer from "../../container/login-container";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main>
      <Suspense fallback={<div className="login-loading">Loading...</div>}>
        <LoginContainer />
      </Suspense>
    </main>
  );
}