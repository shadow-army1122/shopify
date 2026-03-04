import React, { useState, useEffect, Fragment } from 'react';
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption, ComboboxButton, Transition } from '@headlessui/react';
import axios from 'axios';

export default function CategoryCombobox({ value, onChange }) {
    const [query, setQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);

    // Initial fetch to resolve the currently selected ID to a name
    useEffect(() => {
        if (value && !selectedCategory) {
            axios.get(`/api/categories/search?q=`)
                .then(res => {
                    const match = res.data.find(c => c.id === parseInt(value, 10));
                    if (match) setSelectedCategory(match);
                });
        }
    }, [value]);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/categories/search?q=${query}`);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchCategories();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [query]);

    // Handle selection and propagate the ID to the parent form's state
    const handleSelect = (category) => {
        setSelectedCategory(category);
        onChange(category ? category.id : '');
    };

    return (
        <div className="relative isolate z-50">
            <Combobox value={selectedCategory} onChange={handleSelect} nullable>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left border border-gray-300 focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500 sm:text-sm shadow-sm transition-all duration-200">
                        <ComboboxInput
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            displayValue={(category) => category?.name || ''}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Type to search categories..."
                            autoComplete="off"
                        />
                        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <span className="material-icons text-gray-400">arrow_drop_down</span>
                            )}
                        </ComboboxButton>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <ComboboxOptions className="absolute isolate z-[100] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {categories.length === 0 && query !== '' && !loading ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    No categories found.
                                </div>
                            ) : (
                                categories.map((category) => (
                                    <ComboboxOption
                                        key={category.id}
                                        className="group cursor-pointer select-none py-2 pl-10 pr-4 data-[focus]:bg-indigo-600 data-[focus]:text-white text-gray-900"
                                        value={category}
                                    >
                                        <span className="block truncate group-data-[selected]:font-medium group-data-[focus]:font-medium font-normal">
                                            {category.name}
                                        </span>
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 group-data-[selected]:opacity-100 group-data-[focus]:text-white opacity-0">
                                            <span className="material-icons text-sm">check</span>
                                        </span>
                                    </ComboboxOption>
                                ))
                            )}
                        </ComboboxOptions>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}
