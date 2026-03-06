import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DangerButton from '@/Components/DangerButton';
import Magnet from '@/Components/Magnet';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import ShinyText from '@/Components/ShinyText';
import { Head, Link, router, useForm } from '@inertiajs/react';

const STATUS_LABELS = {
    a_faire: 'À faire',
    en_cours: 'En cours',
    terminee: 'Terminée',
};

function StatusBadge({ status }) {
    const map = {
        a_faire: {
            label: 'À faire',
            className: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
        },
        en_cours: {
            label: 'En cours',
            className: 'bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100',
        },
        terminee: {
            label: 'Terminée',
            className: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100',
        },
    };

    const item = map[status] ?? {
        label: status,
        className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
    };

    return (
        <span
            className={
                'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ' +
                item.className
            }
        >
            {item.label}
        </span>
    );
}

function StatusSelect({ taskId, currentStatus, statuses }) {
    const { data, setData, processing } = useForm({
        status: currentStatus,
    });

    const submit = (value) => {
        setData('status', value);

        router.patch(
            route('tasks.status', taskId),
            { status: value },
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <select
            value={data.status}
            onChange={(e) => submit(e.target.value)}
            disabled={processing}
            className="rounded-md border-gray-300 bg-white text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        >
            {statuses.map((s) => (
                <option key={s} value={s}>
                    {STATUS_LABELS[s] ?? s}
                </option>
            ))}
        </select>
    );
}

export default function Index({ tasks, statuses }) {
    const onDelete = (taskId) => {
        if (!confirm('Supprimer cette tâche ?')) return;

        router.delete(route('tasks.destroy', taskId), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        <ShinyText>Tâches</ShinyText>
                    </h2>

                    <Link href={route('tasks.create')}>
                        <Magnet>
                            <PrimaryButton>Nouvelle tâche</PrimaryButton>
                        </Magnet>
                    </Link>
                </div>
            }
        >
            <Head title="Tâches" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6">
                            {tasks.length === 0 ? (
                                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                                    <div className="max-w-md text-gray-600 dark:text-gray-300">
                                        Aucune tâche pour le moment.
                                    </div>
                                    <Link href={route('tasks.create')}>
                                        <PrimaryButton>Créer ma première tâche</PrimaryButton>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
                                        >
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="truncate text-base font-semibold text-gray-900 dark:text-gray-100">
                                                            {task.title}
                                                        </h3>
                                                        <StatusBadge status={task.status} />
                                                    </div>

                                                    {task.description ? (
                                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                                            {task.description}
                                                        </p>
                                                    ) : null}
                                                </div>

                                                <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                                                    <div className="flex items-center gap-2">
                                                        <StatusSelect
                                                            taskId={task.id}
                                                            currentStatus={task.status}
                                                            statuses={statuses}
                                                        />

                                                        <Link href={route('tasks.edit', task.id)}>
                                                            <SecondaryButton className="whitespace-nowrap">
                                                                Modifier
                                                            </SecondaryButton>
                                                        </Link>

                                                        <DangerButton
                                                            className="whitespace-nowrap"
                                                            onClick={() => onDelete(task.id)}
                                                        >
                                                            Supprimer
                                                        </DangerButton>
                                                    </div>

                                                    <div className="text-xs text-gray-400 dark:text-gray-500">
                                                        #{task.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
