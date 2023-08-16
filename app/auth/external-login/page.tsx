'use client'

import { useSearchParams } from 'next/navigation'

export default function ExternalLoginPage() {
  const searchParams = useSearchParams();
  const redirect_uri = searchParams.get('redirect_uri')

  return (
    <form action="/api/auth/external-login" method="post">
      <div>
        <label>
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          defaultValue="demo"
          required
        />
        <br />
        <br />
        <label>
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          defaultValue="demo"
          required
        />
        <br />
        <br />
        <input type="hidden" name="redirect_uri" value={redirect_uri || ''} />
        <button type="submit">Login</button>
      </div>
    </form>
  );
}
