import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ auth, categories }) {

    const { delete: destroy } = useForm();

    const handleDelete = (id, isParent = false) => {
        const message = isParent
            ? 'Delete this category? All sub-categories will also be deleted.'
            : 'Delete this category?';

        if (confirm(message)) {
            destroy(route('admin.categories.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Category Management</h2>
                    <Link
                        href={route('admin.categories.create')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors shadow-sm"
                    >
                        Add New Category
                    </Link>
                </div>
            }
        >
            <Head title="Category Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {categories && categories.length > 0 ? categories.map((category) => (
                                            <React.Fragment key={category.id}>
                                                {/* Parent Category */}
                                                <tr className="bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{category.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-mono text-sm">{category.slug}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">Main Category</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <Link
                                                            href={route('admin.categories.edit', category.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 mr-4 font-semibold"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(category.id, true)}
                                                            className="text-red-600 hover:text-red-900 font-semibold"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>

                                                {/* Child Categories */}
                                                {category.children && category.children.map((child) => (
                                                    <tr key={child.id} className="hover:bg-gray-50/50">
                                                        <td className="px-6 py-4 whitespace-nowrap pl-10 text-gray-800 flex items-center">
                                                            <span className="text-gray-400 mr-2">↳</span> {child.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-mono text-sm">{child.slug}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{category.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <Link
                                                                href={route('admin.categories.edit', child.id)}
                                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(child.id, false)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        )) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                                    No categories found. Start by adding one.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
