<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Models\Task;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $userId = auth()->id();

    $counts = Task::query()
        ->where('user_id', $userId)
        ->selectRaw('status, COUNT(*) as aggregate')
        ->groupBy('status')
        ->pluck('aggregate', 'status');

    $stats = [
        'total' => (int) Task::query()->where('user_id', $userId)->count(),
        'a_faire' => (int) ($counts['a_faire'] ?? 0),
        'en_cours' => (int) ($counts['en_cours'] ?? 0),
        'terminee' => (int) ($counts['terminee'] ?? 0),
    ];

    $recentTasks = Task::query()
        ->where('user_id', $userId)
        ->latest()
        ->limit(5)
        ->get(['id', 'title', 'status', 'updated_at']);

    return Inertia::render('Dashboard', [
        'stats' => $stats,
        'recentTasks' => $recentTasks,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::patch('/tasks/{task}/status', [TaskController::class, 'updateStatus'])->name('tasks.status');
    Route::resource('tasks', TaskController::class)->except(['show']);
});

require __DIR__.'/auth.php';
