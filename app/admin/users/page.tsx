"use client";

import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "@/app/actions/userActions";

import {
  Edit,
  Trash2,
  Users,
} from "lucide-react";
import Image from "next/image";

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const fetchUsers = async () => {
    setLoading(true);
    const result = await getUsers();
    if (result.success && result.data) {
      setUsers(result.data);
      setFilteredUsers(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(u => 
        (u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
         u.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (roleFilter === "all" || u.role.toLowerCase() === roleFilter.toLowerCase())
      )
    );
  }, [searchTerm, roleFilter, users]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  if (loading) return <div className="p-20 text-center">Loading Users...</div>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold flex items-center gap-2 mb-8"><Users className="text-blue-500" /> User Management</h1>
      
      <div className="flex gap-4 mb-8">
        <input 
          placeholder="Search users..." 
          className="flex-1 p-2 border rounded-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="p-2 border rounded-xl">
           <option value="all">All Roles</option>
           <option value="admin">Admin</option>
           <option value="user">User</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Email</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(u => (
              <tr key={u.id} className="border-b">
                <td className="p-4 flex items-center gap-3">
                  <div className="relative w-10 h-10"><Image src={u.image || "/default-avatar.png"} alt={u.name} fill className="rounded-full object-cover" /></div>
                  <span className="font-bold">{u.name}</span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{u.email}</td>
                <td className="p-4 flex gap-4">
                  <button className="text-blue-500"><Edit className="w-5 h-5" /></button>
                  <button onClick={() => handleDelete(u.id)} className="text-red-500"><Trash2 className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}