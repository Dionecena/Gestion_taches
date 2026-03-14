import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import ShinyText from '@/Components/ShinyText';
import { Head, Link } from '@inertiajs/react';

const STATUS_LABELS = {
    a_faire: 'À faire',
    en_cours: 'En cours',
    terminee: 'Terminée',
};

function StatCard({ title, value, className = '' }) {
    return (
        <div
            className={
                'rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 ' +
                className
            }
        >
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {title}
            </div>
            <div className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                {value}
            </div>
        </div>
    );
}

export default function Dashboard({ stats, recentTasks }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    <ShinyText>Dashboard</ShinyText>
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            Un aperçu rapide de tes tâches.
                        </div>

                        <div className="flex items-center gap-3">
                            <Link href={route('tasks.create')}>
                                <PrimaryButton>Nouvelle tâche</PrimaryButton>
                            </Link>
                            <Link href={route('tasks.index')}>
                                <SecondaryButton>Voir toutes</SecondaryButton>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard title="Total" value={stats?.total ?? 0} />
                        <StatCard
                            title="À faire"
                            value={stats?.a_faire ?? 0}
                            className="bg-slate-50 dark:bg-slate-900"
                        />
                        <StatCard
                            title="En cours"
                            value={stats?.en_cours ?? 0}
                            className="bg-amber-50 dark:bg-amber-950"
                        />
                        <StatCard
                            title="Terminée"
                            value={stats?.terminee ?? 0}
                            className="bg-emerald-50 dark:bg-emerald-950"
                        />
                    </div>

                    <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                                    Dernières tâches
                                </h3>
                                <Link
                                    href={route('tasks.index')}
                                    className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                                >
                                    Aller aux tâches
                                </Link>
                            </div>

                            {recentTasks?.length ? (
                                <div className="mt-4 space-y-3">
                                    {recentTasks.map((t) => (
                                        <div
                                            key={t.id}
                                            className="flex flex-col justify-between gap-2 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-center dark:border-gray-700 dark:bg-gray-900"
                                        >
                                            <div className="min-w-0">
                                                <div className="truncate font-medium text-gray-900 dark:text-gray-100">
                                                    {t.title}
                                                </div>
                                                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                    Statut: {STATUS_LABELS[t.status] ?? t.status}
                                                </div>
                                            </div>

                                            <div className="flex shrink-0 items-center gap-2">
                                                <Link href={route('tasks.edit', t.id)}>
                                                    <SecondaryButton>Modifier</SecondaryButton>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-4 rounded-lg border border-dashed border-gray-300 p-6 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                                    Aucune tâche pour le moment. Crée ta première tâche pour remplir le dashboard.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
