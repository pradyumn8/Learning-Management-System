import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { GraduationCap } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AuthPage() {
  const [activeTab, setActiveTab] = useState('signin');

  function handleTabChange(value) {
    setActiveTab(value);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to={'/'} className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">StudyBridge</span>
        </Link>
      </header>

      {/* Tabs Section */}
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          {/* Tabs List */}
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="signin"
              className={`w-1/2 py-2 text-center ${
                activeTab === 'signin' ? 'font-bold border-b-2 border-primary' : ''
              }`}
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className={`w-1/2 py-2 text-center ${
                activeTab === 'signup' ? 'font-bold border-b-2 border-primary' : ''
              }`}
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Tabs Content */}
          <TabsContent value="signin">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Sign In</h2>
              {/* Sign In Form */}
              <form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter your password"
                  />
                </div>
                <button type="submit" className="w-full py-2 bg-primary text-white rounded">
                  Sign In
                </button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="signup">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Sign Up</h2>
              {/* Sign Up Form */}
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Create a password"
                  />
                </div>
                <button type="submit" className="w-full py-2 bg-primary text-white rounded">
                  Sign Up
                </button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
