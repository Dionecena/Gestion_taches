<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    private const STATUSES = [
        'a_faire',
        'en_cours',
        'terminee',
    ];

    public function index(Request $request): Response
    {
        $tasks = Task::query()
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get(['id', 'title', 'description', 'status', 'created_at', 'updated_at']);

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'statuses' => self::STATUSES,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Tasks/Create', [
            'statuses' => self::STATUSES,
        ]);
    }

    public function store(StoreTaskRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        Task::create($data);

        return redirect()->route('tasks.index');
    }

    public function edit(Request $request, Task $task): Response
    {
        abort_unless($task->user_id === $request->user()->id, 403);

        return Inertia::render('Tasks/Edit', [
            'task' => $task->only(['id', 'title', 'description', 'status']),
            'statuses' => self::STATUSES,
        ]);
    }

    public function update(UpdateTaskRequest $request, Task $task): RedirectResponse
    {
        abort_unless($task->user_id === $request->user()->id, 403);

        $task->update($request->validated());

        return redirect()->route('tasks.index');
    }

    public function destroy(Request $request, Task $task): RedirectResponse
    {
        abort_unless($task->user_id === $request->user()->id, 403);

        $task->delete();

        return redirect()->route('tasks.index');
    }

    public function updateStatus(Request $request, Task $task): RedirectResponse
    {
        abort_unless($task->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'status' => ['required', 'in:' . implode(',', self::STATUSES)],
        ]);

        $task->update([
            'status' => $validated['status'],
        ]);

        return redirect()->route('tasks.index');
    }
}
