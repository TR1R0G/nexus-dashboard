"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "admin";
};

type SEUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  costRate: number;
  billRate: number;
  assignedClients: string[];
  type: "se";
};

type User = AdminUser | SEUser;

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      costRate: 75,
      billRate: 150,
      assignedClients: ["Client A", "Client B"],
      type: "se",
    },
    {
      id: "2",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      type: "admin",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<"admin" | "se">("admin");
  const [activeTab, setActiveTab] = useState("admin");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    costRate: "",
    billRate: "",
    assignedClients: [] as string[],
  });

  const [newClient, setNewClient] = useState("");

  const handleAddUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      type: userType,
      ...(userType === "se" && {
        costRate: Number.parseFloat(formData.costRate),
        billRate: Number.parseFloat(formData.billRate),
        assignedClients: formData.assignedClients,
      }),
    } as User;

    setUsers([...users, newUser]);
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditUser = () => {
    if (!selectedUser) return;

    const updatedUser: User = {
      ...selectedUser,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      ...(selectedUser.type === "se" && {
        costRate: Number.parseFloat(formData.costRate),
        billRate: Number.parseFloat(formData.billRate),
        assignedClients: formData.assignedClients,
      }),
    } as User;

    setUsers(users.map((u) => (u.id === selectedUser.id ? updatedUser : u)));
    resetForm();
    setIsEditDialogOpen(false);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      costRate: "",
      billRate: "",
      assignedClients: [],
    });
    setNewClient("");
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      costRate: user.type === "se" ? user.costRate.toString() : "",
      billRate: user.type === "se" ? user.billRate.toString() : "",
      assignedClients: user.type === "se" ? user.assignedClients : [],
    });
    setUserType(user.type);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const addClient = () => {
    if (newClient.trim()) {
      setFormData({
        ...formData,
        assignedClients: [...formData.assignedClients, newClient.trim()],
      });
      setNewClient("");
    }
  };

  const removeClient = (index: number) => {
    setFormData({
      ...formData,
      assignedClients: formData.assignedClients.filter((_, i) => i !== index),
    });
  };

  const adminUsers = users.filter((u) => u.type === "admin");
  const seUsers = users.filter((u) => u.type === "se");

  return (
    <Card className="bg-white">
      <CardContent>
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6">
            <div className="">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Manage Users</h2>
                <Button
                  onClick={() => {
                    resetForm();
                    setUserType(activeTab === "admin" ? "admin" : "se");
                    setIsAddDialogOpen(true);
                  }}
                  className="bg-[#141417] hover:bg-[#3b3b3b]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New User
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <ToggleGroup
                  type="single"
                  className="mb-6"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <ToggleGroupItem
                    value="admin"
                    className="rounded-2xl p-5 text-md"
                  >
                    Admin Users
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="se"
                    className="rounded-2xl p-5 text-md"
                  >
                    SE Users
                  </ToggleGroupItem>
                </ToggleGroup>

                <TabsContent value="admin">
                  <div className="bg-[#ffffff] rounded-lg border border-[#e5e7eb]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#e5e7eb]">
                          <th className="text-left p-4 font-medium">Name</th>
                          <th className="text-left p-4 font-medium">Email</th>
                          <th className="text-left p-4 font-medium">Phone</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminUsers.length === 0 ? (
                          <tr>
                            <td
                              colSpan={4}
                              className="text-center p-8 text-gray-500"
                            >
                              No admin users found
                            </td>
                          </tr>
                        ) : (
                          adminUsers.map((user) => (
                            <tr
                              key={user.id}
                              className="border-b border-[#e5e7eb] last:border-0"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                    <AvatarFallback>
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{user.name}</span>
                                </div>
                              </td>
                              <td className="p-4">{user.email}</td>
                              <td className="p-4">{user.phone}</td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => openEditDialog(user)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => openDeleteDialog(user)}
                                    className="text-[#ce4343] hover:text-[#ce4343] hover:bg-[#ce4343]/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="se">
                  <div className="bg-[#ffffff] rounded-lg border border-[#e5e7eb]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#e5e7eb]">
                          <th className="text-left p-4 font-medium">Name</th>
                          <th className="text-left p-4 font-medium">Email</th>
                          <th className="text-left p-4 font-medium">Phone</th>
                          <th className="text-left p-4 font-medium">
                            Cost Rate
                          </th>
                          <th className="text-left p-4 font-medium">
                            Bill Rate
                          </th>
                          <th className="text-left p-4 font-medium">
                            Assigned Clients
                          </th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {seUsers.length === 0 ? (
                          <tr>
                            <td
                              colSpan={7}
                              className="text-center p-8 text-gray-500"
                            >
                              No SE users found
                            </td>
                          </tr>
                        ) : (
                          seUsers.map((user) => (
                            <tr
                              key={user.id}
                              className="border-b border-[#e5e7eb] last:border-0"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                    <AvatarFallback>
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{user.name}</span>
                                </div>
                              </td>
                              <td className="p-4">{user.email}</td>
                              <td className="p-4">{user.phone}</td>
                              <td className="p-4">${user.costRate}/hr</td>
                              <td className="p-4">${user.billRate}/hr</td>
                              <td className="p-4">
                                <div className="flex flex-wrap gap-1">
                                  {user.assignedClients.map((client, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-[#e5e7eb] rounded text-sm"
                                    >
                                      {client}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => openEditDialog(user)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => openDeleteDialog(user)}
                                    className="text-[#ce4343] hover:text-[#ce4343] hover:bg-[#ce4343]/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Add/Edit User Dialog */}
        <Dialog
          open={isAddDialogOpen || isEditDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsAddDialogOpen(false);
              setIsEditDialogOpen(false);
              resetForm();
            }
          }}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {isEditDialogOpen ? "Edit User" : "Add New User"}
              </DialogTitle>
              <DialogDescription>
                {isEditDialogOpen
                  ? "Update the user information below."
                  : `Add a new ${
                      userType === "admin" ? "Admin" : "SE"
                    } user to the system.`}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {!isEditDialogOpen && (
                <div className="grid gap-2">
                  <Label htmlFor="userType">User Type</Label>
                  <Select
                    value={userType}
                    onValueChange={(value: "admin" | "se") =>
                      setUserType(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="se">SE (Sales Engineer)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+1 234 567 8900"
                />
              </div>
              {userType === "se" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="costRate">Hourly Rate: Cost</Label>
                    <Input
                      id="costRate"
                      type="number"
                      value={formData.costRate}
                      onChange={(e) =>
                        setFormData({ ...formData, costRate: e.target.value })
                      }
                      placeholder="75"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="billRate">Hourly Rate: Billable</Label>
                    <Input
                      id="billRate"
                      type="number"
                      value={formData.billRate}
                      onChange={(e) =>
                        setFormData({ ...formData, billRate: e.target.value })
                      }
                      placeholder="150"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Assigned Clients</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newClient}
                        onChange={(e) => setNewClient(e.target.value)}
                        placeholder="Client name"
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addClient())
                        }
                      />
                      <Button
                        type="button"
                        onClick={addClient}
                        variant="outline"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.assignedClients.map((client, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-2 py-1 bg-[#e5e7eb] rounded"
                        >
                          <span className="text-sm">{client}</span>
                          <button
                            type="button"
                            onClick={() => removeClient(index)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  setIsEditDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={isEditDialogOpen ? handleEditUser : handleAddUser}
                className="bg-[#141417] hover:bg-[#3b3b3b]"
              >
                {isEditDialogOpen ? "Save Changes" : "Add User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                user
                {selectedUser && ` "${selectedUser.name}"`} from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteUser}
                className="bg-[#ce4343] hover:bg-[#ce4343]/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
