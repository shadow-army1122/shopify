import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ auth, parents }) {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        parent_id: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.categories.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Category</h2>}
        >
            <Head title="Add New Category" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <form onSubmit={submit} className="max-w-xl">

                                {/* Name */}
                                <div className="mb-6">
                                    <InputLabel htmlFor="name" value="Category Name" className="font-bold text-gray-700" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="block mt-1 w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        autoFocus
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                {/* Parent Category */}
                                <div className="mb-6">
                                    <InputLabel htmlFor="parent_id" value="Parent Category (Optional)" className="font-bold text-gray-700" />
                                    <select
                                        id="parent_id"
                                        name="parent_id"
                                        value={data.parent_id}
                                        onChange={(e) => setData('parent_id', e.target.value)}
                                        className="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option value="">None (Main Category)</option>
                                        {parents && parents.map((parent) => (
                                            <option key={parent.id} value={parent.id}>
                                                {parent.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.parent_id} className="mt-2" />
                                </div>

                                {/* Description */}
                                <div className="mb-8">
                                    <InputLabel htmlFor="description" value="Description" className="font-bold text-gray-700" />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="4"
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <PrimaryButton className="bg-blue-600 hover:bg-blue-700" disabled={processing}>
                                        Create Category
                                    </PrimaryButton>

                                    <Link
                                        href={route('admin.categories.index')}
                                        className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-gray-800 transition-colors"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
