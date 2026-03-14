<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $etudiant = User::query()->firstOrCreate(
            ['email' => 'etudiant.ramadan@example.com'],
            [
                'name' => 'Étudiant Sénégalais',
                'password' => Hash::make('password'),
            ]
        );

        $tasks = [
            ['title' => 'Réviser le cours (chapitre du jour)', 'description' => '30-45 min après le dhohr.', 'status' => 'a_faire'],
            ['title' => 'TD / exercices de la semaine', 'description' => 'Finir au moins 5 exercices.', 'status' => 'a_faire'],
            ['title' => 'Préparer le devoir / mini-projet', 'description' => 'Avancer un peu chaque jour.', 'status' => 'en_cours'],
            ['title' => 'Cours en ligne / vidéo (20-30 min)', 'description' => 'Regarder une vidéo liée au module.', 'status' => 'a_faire'],
            ['title' => 'Rédiger les notes de cours', 'description' => 'Mettre au propre dans le cahier.', 'status' => 'a_faire'],
            ['title' => 'Envoyer un message au groupe (organisation révisions)', 'description' => 'Fixer une séance courte avant iftar.', 'status' => 'a_faire'],
            ['title' => 'Préparer les affaires pour demain', 'description' => 'Sac, PC, chargeur, documents.', 'status' => 'a_faire'],
            ['title' => 'Planifier la journée Ramadan', 'description' => 'Études + repos + prières.', 'status' => 'terminee'],
            ['title' => 'Lecture (20 min)', 'description' => 'Lecture personnelle avant maghrib.', 'status' => 'en_cours'],
            ['title' => 'Réviser avant le cours du matin', 'description' => '20 min après fajr.', 'status' => 'a_faire'],
            ['title' => 'Iftar: aider à préparer la table', 'description' => 'Participer à la préparation.', 'status' => 'a_faire'],
            ['title' => 'Taraweeh / prière du soir', 'description' => 'Prévoir le temps et le trajet.', 'status' => 'a_faire'],
        ];

        foreach ($tasks as $t) {
            Task::query()->firstOrCreate(
                [
                    'user_id' => $etudiant->id,
                    'title' => $t['title'],
                ],
                [
                    'description' => $t['description'],
                    'status' => $t['status'],
                ]
            );
        }
    }
}
