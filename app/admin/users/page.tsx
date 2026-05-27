"use client";

import { useState, useEffect } from "react";
import { getUsers, deleteUser, updateUser } from "@/app/actions/userActions";
import { Edit, Trash2, Users, Search, AlertCircle } from "lucide-react";
import Image from "next/image";
import EditUserModal from "@/app/components/EditUserModal";
import DeleteUserModal from "@/app/components/DeleteUserModal";
import { AnimatePresence, motion } from "framer-motion";

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [error, setError] = useState<string | null>(null);

  // Modal States
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const result = await getUsers();
    if (result.success && result.data) {
      setUsers(result.data);
      setFilteredUsers(result.data);
    } else {
      setError(result.error || "Failed to load users.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((u) => {
        const matchesSearch = 
          (u.userName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
           u.email?.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesRole = 
          roleFilter === "all" || u.role.toLowerCase() === roleFilter.toLowerCase();
        return matchesSearch && matchesRole;
      })
    );
  }, [searchTerm, roleFilter, users]);

  const handleEditClick = (u: any) => {
    // Map the database user schema to the structure EditUserModal expects
    setEditingUser({
      user_id: u.id,
      user_name: u.userName,
      email: u.email,
      role: u.role,
      created_at: u.createdAt ? new Date(u.createdAt).toISOString() : "",
    });
  };

  const handleSaveUser = async (updated: any) => {
    setError(null);
    const result = await updateUser(updated.user_id, {
      userName: updated.user_name,
      email: updated.email,
      role: updated.role,
    });
    if (result.success) {
      fetchUsers();
    } else {
      setError(result.error || "Failed to update user.");
    }
  };

  const handleDeleteUser = async (id: string) => {
    setError(null);
    const result = await deleteUser(id);
    if (result.success) {
      setDeletingUserId(null);
      fetchUsers();
    } else {
      setError(result.error || "Failed to delete user.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-brand-primary rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Loading Users...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-900/10 text-brand-primary rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">User Management</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">View, update, and manage role permissions for user accounts.</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-sm font-bold">Dismiss</button>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            placeholder="Search users by name or email..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary dark:text-white transition duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary dark:text-white cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {filteredUsers.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 dark:bg-gray-700/30 text-xs font-bold text-gray-400 uppercase border-b border-gray-100 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-700/10 transition-colors">
                    {/* User profile */}
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-gray-150 dark:border-gray-700">
                        <Image
                          src={u.imageUrl || "/default-avatar.png"}
                          alt={u.userName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-gray-800 dark:text-gray-200">{u.userName}</span>
                    </td>
                    
                    {/* Email */}
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-medium">
                      {u.email}
                    </td>

                    {/* Role badge */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        u.role === "Admin" 
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      }`}>
                        {u.role}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => handleEditClick(u)}
                          className="p-1.5 text-gray-400 hover:text-brand-primary hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingUserId(u.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-400 dark:text-gray-500">No users found.</div>
          )}
        </div>
      </div>

      {/* Action Modals */}
      <AnimatePresence>
        {editingUser && (
          <EditUserModal
            user={editingUser}
            onClose={() => setEditingUser(null)}
            onSave={handleSaveUser}
          />
        )}
        
        {deletingUserId && (
          <DeleteUserModal
            userId={deletingUserId}
            onClose={() => setDeletingUserId(null)}
            onDelete={handleDeleteUser}
          />
        )}
      </AnimatePresence>
    </div>
  );
}