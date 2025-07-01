"use client";

import { useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Tabs, Tab } from "@heroui/react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { User, Mail, Check, X, Info } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ErrorMessage from "@/components/Errormessage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {
  getFriends,
  getPendingRequests,
  acceptFriendRequest,
  removeFriend,
  selectFriendList,
  selectPendingRequests,
  selectFriendLoading,
} from "@/store/slices/friendSlice";




export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [activeTab, setActiveTab] = useState("friends");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch<AppDispatch>();
const friends = useSelector(selectFriendList);
const requests = useSelector(selectPendingRequests);
const loading = useSelector(selectFriendLoading);

// Fetch on mount
useEffect(() => {
  dispatch(getFriends());
  dispatch(getPendingRequests());
}, [dispatch]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setEditMode(false);
      // TODO: dispatch update action
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1b1e] p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          <span className="text-[#5865F2]">Zync</span> Profile
        </h1>

        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
          aria-label="Profile Tabs"
          color="primary"
        >
          <Tab key="friends" title="Friends">
            <Card className="bg-[#2F3136]/40 border border-[#40444B]/30">
              <CardBody>
                <h2 className="text-2xl font-semibold mb-4">Friend List</h2>
                <ul className="space-y-4">
                    {loading ? ( <p>Loading...</p>) : friends.length === 0 ? 
                    (
                    <p>No friends yet.</p>
                    ) : (
                        friends.map((f) => (
                        <li key={f.id} className="flex items-center justify-between">
                        <span>@{f.userId === user?.id ? f.friendId : f.userId}</span>
                        <Button
                        size="sm"
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => dispatch(removeFriend(f.friendId === user?.id ? f.userId : f.friendId))}
                        >
                        Remove
                        </Button>
                    </li>
                    ))
                    )}
                    </ul>

              </CardBody>
            </Card>
          </Tab>

          <Tab key="requests" title="Friend Requests">
            <Card className="bg-[#2F3136]/40 border border-[#40444B]/30">
              <CardBody>
                <h2 className="text-2xl font-semibold mb-4">Pending Requests</h2>
                <ul className="space-y-4">
                  {/* Replace with dynamic list */}
                  <li className="flex items-center justify-between">
                    <span>@jane_smith</span>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-red-500 hover:bg-red-600">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="info" title="Personal Info">
            <Card className="bg-[#2F3136]/40 border border-[#40444B]/30">
              <CardBody>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold">Personal Information</h2>
                  <Button
                    size="sm"
                    className="bg-[#5865F2] hover:bg-[#4752C4]"
                    onClick={() => setEditMode((prev) => !prev)}
                  >
                    {editMode ? "Cancel" : "Edit"}
                  </Button>
                </div>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="username" className="text-white font-medium">
                      Username
                    </label>
                    <div className="relative">
                      <Input
                        id="username"
                        type="text"
                        value={formData.username}
                        disabled={!editMode}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        className="pl-10 text-white border-[#40444B] focus:ring-[#5865F2] focus:border-[#5865F2]"
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      {errors.username && <ErrorMessage message={errors.username} />}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-white font-medium">
                      Email
                    </label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        disabled={!editMode}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 text-white border-[#40444B] focus:ring-[#5865F2] focus:border-[#5865F2]"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      {errors.email && <ErrorMessage message={errors.email} />}
                    </div>
                  </div>

                  {editMode && (
                    <Button
                      type="button"
                      onClick={handleSave}
                      className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                    >
                      Save Changes
                    </Button>
                  )}
                </form>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
