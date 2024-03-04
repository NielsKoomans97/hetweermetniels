<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'post_title' => fake()->title(),
            'post_content' => fake()->text(),
            'post_banner' => fake()->filePath(),
            'post_assets' => fake()->filePath(),
        ];
    }
}
