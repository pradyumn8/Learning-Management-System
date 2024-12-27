import { Button } from '@/components/ui/button';
import React from 'react'

function StudentHomePage() {

  function handleLogout() {
    // resetCredentials()
    sessionStorage.removeItem("accessToken");
    window.location.href = "/auth";
}
  return (
    <div>Home Page
    <Button onClick={handleLogout}>Logout</Button>

    </div>
  )
}

export default StudentHomePage