import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

const STATUS_LABELS = {
    a_faire: 'À faire',
    en_cours: 'En cours',
    terminee: 'Terminée',
};

export default function Create({ statuses }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        status: 'a_faire',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Nouvelle tâche
                </h2>
            }
        >
            <Head title="Nouvelle tâche" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={submit} className="space-y-6 p-6">
                            <div>
                                <InputLabel htmlFor="title" value="Titre" />
                                <TextInput
                                    id="title"
                                    className="mt-1 block w-full"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                    isFocused
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description (optionnel)" />
                                <textarea
                                    id="description"
                                    className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="status" value="Statut" />
                                <select
                                    id="status"
                                    className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    {statuses.map((s) => (
                                        <option key={s} value={s}>
                                            {STATUS_LABELS[s] ?? s}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end gap-3">
                                <Link
                                    href={route('tasks.index')}
                                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                >
                                    Annuler
                                </Link>
                                <PrimaryButton disabled={processing}>Créer</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
